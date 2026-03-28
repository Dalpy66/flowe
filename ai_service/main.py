import os
import json
from typing import Literal
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from google import genai
from google.genai import types
from dotenv import load_dotenv
import random

# Carica variabili d'ambiente
load_dotenv()

# Controllo chiave API e inizializzazione del nuovo Client
API_KEY = os.getenv("GEMINI_API_KEY")

if API_KEY:
    client = genai.Client(api_key=API_KEY)
    print("Chiave Gemini trovata. Modalità AI attiva (Modello: gemini-2.5-flash).")
else:
    client = None
    print("Nessuna chiave Gemini trovata. Avvio in Modalità MOCK.")

app = FastAPI(title="AgriTech Sensor Analysis Service")

# --- Modelli Dati in Ingresso ---

class SensorData(BaseModel):
    pianta: str
    temperatura: float
    umidita: float
    conducibilita: float
    ph: float
    azoto: float
    fosforo: float
    potassio: float

# --- Modelli Dati in Uscita (Output Strutturato per l'IA) ---

class PlantAnalysisResult(BaseModel):
    # Usando Literal obblighiamo l'IA a scegliere solo uno di questi valori
    stato_pianta: Literal["sano", "buono", "allerta", "critico"]
    report: str

# --- Logica AI / Mock ---

def generate_ai_report(data: SensorData) -> PlantAnalysisResult:
    # Modalità Mock (Senza Chiave)
    if not client:
        stato: Literal["sano", "buono", "allerta", "critico"] = random.choice(["sano", "buono"])
        
        if (data.ph < 6.4 or data.ph > 7.2) or (data.umidita < 50.0 or data.umidita > 75.0) or (data.temperatura > 27.0):
            stato = "allerta"
            
        if (data.ph < 6.1 or data.ph > 7.4) or data.umidita < 45.0 or data.temperatura > 29.0:
            stato = "critico"
            
        return PlantAnalysisResult(
            stato_pianta=stato,
            report=f"**[MOCK]** Dati ricevuti per {data.pianta}. Temperatura: {data.temperatura}°C. Consigli: Monitorare l'irrigazione."
        )

    # Logica reale con Gemini
    prompt = f"""
    Sei un esperto agronomo. Analizza i seguenti dati chimico-fisici rilevati per la specie: {data.pianta}.
    
    Dati sensore:
    - Temperatura: {data.temperatura} °C
    - Umidità: {data.umidita} %
    - Conducibilità: {data.conducibilita} µS/cm
    - pH: {data.ph}
    - Azoto (N): {data.azoto} mg/kg
    - Fosforo (P): {data.fosforo} mg/kg
    - Potassio (K): {data.potassio} mg/kg
    
    In base alle necessità ideali della {data.pianta}, fornisci:
    1. Un report di poche parole basato su uno dei 4 stati della pianta (sano, buono, allerta, critico), la lunghezza del messaggio deve essere commisurataalla gravità dello stato.
    2. Consigli e suggerimenti agronomici.
    3. Eventuali interventi correttivi da effettuare (es. fertilizzazione, irrigazione, correzione pH).
    
    Valuta inoltre lo stato generale della pianta scegliendo ESATTAMENTE tra uno dei seguenti stati: sano, buono, allerta, critico.
    """
    
    try:
        # Chiamata a Gemini costringendolo a rispondere nel formato JSON del nostro Pydantic Model
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=PlantAnalysisResult,
                temperature=0.2 # Temperatura bassa per risposte più analitiche e precise
            )
        )
        
        # Parse del JSON restituito dall'IA
        if response.text:
            result_dict = json.loads(response.text)
            return PlantAnalysisResult(**result_dict)
        else:
            raise Exception("Risposta vuota dall'API")
            
    except Exception as e:
        return PlantAnalysisResult(
            stato_pianta="critico",
            report=f"Errore durante l'analisi IA: {str(e)}"
        )

# --- Endpoints ---

@app.get("/")
def read_root():
    status = "AI Attiva (gemini-2.5-flash)" if client else "MOCK Attivo"
    return {"status": "online", "service": "AgriTech Sensor Analysis", "mode": status}

@app.post("/analyze")
async def analyze_sensor_data(request: SensorData):
    # Genera l'analisi (ritorna un oggetto PlantAnalysisResult)
    analysis = generate_ai_report(request)
    
    # Costruisce la risposta finale che FastAPI convertirà in JSON
    return {
        "stato_pianta": analysis.stato_pianta,
        "report": analysis.report
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)