import time
import random
import requests
import os

API_URL = os.getenv("HUB_API_URL", "http://127.0.0.1:8000/api/v1/sensori/hex-to-json")

# Dizionario per "ricordare" l'ultimo stato di ogni sensore
STATO_SENSORI = {}

def inizializza_sensore():
    """Genera i valori di partenza realistici per un nuovo sensore."""
    return {
        "temp": random.randint(200, 300),      # 20.0 - 30.0 °C
        "umidita": random.randint(400, 800),   # 40.0 - 80.0 %
        "ec": random.randint(1500, 2500),      # 1500 - 2500 µS/cm
        "ph": random.randint(600, 750),        # 6.00 - 7.50
        "n": random.randint(10, 30),           # 10 - 30 mg/kg
        "p": random.randint(5, 20),            # 5 - 20 mg/kg
        "k": random.randint(15, 40)            # 15 - 40 mg/kg
    }

def genera_payload_esadecimale(sensor_id="1"):
    """
    Genera una stringa esadecimale applicando una variazione graduale (random walk)
    ai valori precedenti del sensore, rendendo l'andamento coerente nel tempo.
    """
    # Se il sensore non è mai stato letto prima, lo inizializziamo
    if sensor_id not in STATO_SENSORI:
        STATO_SENSORI[sensor_id] = inizializza_sensore()
    
    # Recuperiamo i valori precedenti
    stato = STATO_SENSORI[sensor_id]

    # Applichiamo una piccola variazione casuale, ma costringiamo il valore a restare nei limiti (min/max)
    # Esempio: La temperatura varia di massimo +/- 0.5 °C (da -5 a +5 moltiplicato per 10)
    stato["temp"] = max(200, min(300, stato["temp"] + random.randint(-5, 5)))
    
    # L'umidità varia di massimo +/- 2.0 %
    stato["umidita"] = max(400, min(800, stato["umidita"] + random.randint(-20, 20)))
    
    # L'EC varia di +/- 50 µS/cm
    stato["ec"] = max(1500, min(2500, stato["ec"] + random.randint(-50, 50)))
    
    # Il pH varia lentissimamente, +/- 0.05
    stato["ph"] = max(600, min(750, stato["ph"] + random.randint(-5, 5)))
    
    # I nutrienti variano molto lentamente
    stato["n"] = max(10, min(30, stato["n"] + random.randint(-1, 1)))
    stato["p"] = max(5, min(20, stato["p"] + random.randint(-1, 1)))
    stato["k"] = max(15, min(40, stato["k"] + random.randint(-1, 1)))

    # Salviamo il nuovo stato aggiornato
    STATO_SENSORI[sensor_id] = stato

    # Formattazione in Esadecimale
    intestazione = f"{int(sensor_id):02X}030E"
    dati = f"{stato['temp']:04X}{stato['umidita']:04X}{stato['ec']:04X}{stato['ph']:04X}{stato['n']:04X}{stato['p']:04X}{stato['k']:04X}"
    
    hex_completo = intestazione + dati
    return hex_completo, stato["temp"]/10, stato["umidita"]/10

def avvia_simulazione(intervallo_secondi=5):
    print(f"Avvio simulatore sensori. Invio dati ogni {intervallo_secondi} secondi...")
    print(f"URL di destinazione: {API_URL}")
    print("-" * 50)

    try:
        while True:
            id_sensore = random.choice(["1", "2"])
            
            hex_payload, temp_reale, hum_reale = genera_payload_esadecimale(sensor_id=id_sensore)
            dati_da_inviare = {"hex_payload": hex_payload}
            
            print(f"[Sensore {id_sensore}] Temp: {temp_reale:.1f}°C, Umidità: {hum_reale:.1f}%")
            print(f"Inviando HEX: {hex_payload}")
            
            try:
                risposta = requests.post(API_URL, json=dati_da_inviare, timeout=3)
                if risposta.status_code == 200:
                    print(f"Successo! Risposta API: {risposta.json()['status']}")
                else:
                    print(f"Errore API (Status {risposta.status_code}): {risposta.text}")
            except requests.exceptions.ConnectionError:
                print("Errore di connessione: L'API FastAPI è spenta o irraggiungibile.")
            
            print("-" * 50)
            time.sleep(intervallo_secondi)
            
    except KeyboardInterrupt:
        print("\nSimulazione interrotta dall'utente.")

if __name__ == "__main__":
    # Avviamo ogni 60 secondi come avevi impostato
    avvia_simulazione(intervallo_secondi=60)