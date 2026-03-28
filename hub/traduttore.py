import os
import json
import httpx
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

# 1. Caricamento variabili d'ambiente (.env)
load_dotenv()
MACHINE_ID = os.getenv("MACHINE_ID", "CONVERTER-M001")
DESTINATION_SERVICE_URL = os.getenv("DESTINATION_SERVICE_URL")

app = FastAPI()

# 2. Modello dati per l'input
class HexInput(BaseModel):
    # Diciamo che è una stringa (str) e poi usiamo Field per le regole (min_length)
    hex_payload: str = Field(min_length=34)

# 3. Funzione di parsing (converte Hex in Dizionario)
def parse_hex_modbus_data(hex_str: str):
    try:
        clean_hex = hex_str.replace(" ", "").replace("\n", "").strip()
        data_bytes = bytes.fromhex(clean_hex)

        if len(data_bytes) < 17:
            return None, "Dati insufficienti. L'input deve essere di almeno 17 byte."

        parsed_data = {
            "sensor_id": data_bytes[0],
            "temperatura": int.from_bytes(data_bytes[3:5], byteorder='big') / 10.0,
            "umidita": int.from_bytes(data_bytes[5:7], byteorder='big') / 10.0,
            "conducibilita": int.from_bytes(data_bytes[7:9], byteorder='big'),
            "ph": int.from_bytes(data_bytes[9:11], byteorder='big') / 100.0,
            "azoto": int.from_bytes(data_bytes[11:13], byteorder='big'),
            "fosforo": int.from_bytes(data_bytes[13:15], byteorder='big'),
            "potassio": int.from_bytes(data_bytes[15:17], byteorder='big')
        }
        return parsed_data, None
    except Exception as e:
        return None, f"Errore di parsing: {str(e)}"

# 4. Funzione di invio al microservizio (restituisce True o False)
async def forward_to_external_service(data_dict: dict) -> bool:
    # Se non c'è l'URL nel .env, fallisce subito e passa alla stampa a video
    if not DESTINATION_SERVICE_URL:
        return False
        
    async with httpx.AsyncClient() as client:
        try:
            # Impostiamo un timeout breve (es. 5 secondi) per non bloccare la nostra API
            response = await client.post(DESTINATION_SERVICE_URL, json=data_dict, timeout=5.0)
            response.raise_for_status() # Lancia errore se riceve 404, 500, ecc.
            return True
        except Exception as e:
            # Catturiamo qualsiasi errore (timeout, connessione rifiutata, ecc.)
            print(f"Impossibile raggiungere il microservizio: {e}")
            return False

# 5. Endpoint API
@app.post("/api/v1/sensori/hex-to-json")
async def process_hex_data(payload: HexInput):
    # Decodifica l'esadecimale
    parsed_data, error_msg = parse_hex_modbus_data(payload.hex_payload)
    if not parsed_data:
        raise HTTPException(status_code=400, detail=error_msg)
    
    # Aggiunge l'ID della macchina
    parsed_data["id_convertitore"] = MACHINE_ID
    
    # Tenta l'invio al microservizio
    invio_successo = await forward_to_external_service(parsed_data)
    
    if invio_successo:
        return {
            "status": "successo",
            "messaggio": "Dati elaborati e inviati correttamente al microservizio.",
            "inviato_a_microservizio": True
        }
    else:
        # FALLBACK: Stampa a video se l'invio fallisce o il servizio non c'è
        print("\n--- DATI RICEVUTI (Modalità Fallback) ---")
        print(json.dumps(parsed_data, indent=4))
        print("-----------------------------------------\n")
        
        return {
            "status": "successo_con_fallback",
            "messaggio": "Microservizio irraggiungibile. Dati stampati a terminale.",
            "inviato_a_microservizio": False
        }