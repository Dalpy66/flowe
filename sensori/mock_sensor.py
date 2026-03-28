import time
import random
import requests
import os

API_URL = os.getenv("HUB_API_URL", "http://127.0.0.1:8000/api/v1/sensori/hex-to-json")

def genera_payload_esadecimale(sensor_id="1"):
    """
    Genera una stringa esadecimale simulando la mappa dei registri Modbus.
    Crea valori casuali realistici per simulare le variazioni ambientali.
    """
    # 1. Generazione valori decimali casuali
    # Temperatura: da 20.0 a 30.0 °C (moltiplicato per 10 -> 200-300)
    temp = random.randint(200, 300)
    # Umidità: da 40.0 a 80.0 % (moltiplicato per 10 -> 400-800)
    umidita = random.randint(400, 800)
    # Conducibilità (EC): da 1500 a 2500 µS/cm
    ec = random.randint(1500, 2500)
    # pH: da 6.00 a 7.50 (moltiplicato per 100 -> 600-750)
    ph = random.randint(600, 750)
    # Azoto (N): 10 - 30 mg/kg
    n = random.randint(10, 30)
    # Fosforo (P): 5 - 20 mg/kg
    p = random.randint(5, 20)
    # Potassio (K): 15 - 40 mg/kg
    k = random.randint(15, 40)

    # 2. Formattazione in Esadecimale
    # {:02X} = formatta come Hex maiuscolo a 2 caratteri (1 byte)
    # {:04X} = formatta come Hex maiuscolo a 4 caratteri (2 byte)
    
    intestazione = f"{int(sensor_id):02X}030E" # Nodo + Funzione + Byte Count
    dati = f"{temp:04X}{umidita:04X}{ec:04X}{ph:04X}{n:04X}{p:04X}{k:04X}"
    
    hex_completo = intestazione + dati
    return hex_completo, temp/10, umidita/10 # Ritorno anche temp e hum reali per il print

def avvia_simulazione(intervallo_secondi=5):
    print(f"Avvio simulatore sensori. Invio dati ogni {intervallo_secondi} secondi...")
    print(f"URL di destinazione: {API_URL}")
    print("-" * 50)

    try:
        while True:
            # Scegliamo casualmente se simulare il sensore 1 o il sensore 2
            id_sensore = random.choice(["1", "2"])
            
            # Genera il dato finto
            hex_payload, temp_reale, hum_reale = genera_payload_esadecimale(sensor_id=id_sensore)
            
            dati_da_inviare = {"hex_payload": hex_payload}
            
            print(f"[Sensore {id_sensore}] Temp: {temp_reale}°C, Umidità: {hum_reale}%")
            print(f"Inviando HEX: {hex_payload}")
            
            # Invio la richiesta POST
            try:
                risposta = requests.post(API_URL, json=dati_da_inviare, timeout=3)
                
                if risposta.status_code == 200:
                    print(f"Successo! Risposta API: {risposta.json()['status']}")
                else:
                    print(f"Errore API (Status {risposta.status_code}): {risposta.text}")
            except requests.exceptions.ConnectionError:
                print("Errore di connessione: L'API FastAPI è spenta o irraggiungibile.")
            
            print("-" * 50)
            
            # Attende X secondi prima di inviare il prossimo dato
            time.sleep(intervallo_secondi)
            
    except KeyboardInterrupt:
        print("\nSimulazione interrotta dall'utente.")

if __name__ == "__main__":
    avvia_simulazione(intervallo_secondi=60)