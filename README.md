# 🌿 Flowe - Smart Garden Management

**Flowe** è un prototipo innovativo per una startup dedicata alla manutenzione intelligente di giardini e orti. Grazie all'integrazione di sensori, cloud computing e intelligenza artificiale, Flowe permette di monitorare in tempo reale lo stato del terreno e ricevere consigli personalizzati per la cura delle proprie piante.

## 🚀 Come avviare il prototipo

Il progetto è interamente dockerizzato per garantire una configurazione rapida e senza conflitti di dipendenze.

### 1. Prerequisiti
* **Docker** e **Docker Compose** installati sul sistema.

### 2. Configurazione Ambiente
Prima di lanciare l'applicazione, è necessario creare un file chiamato `.env` nella root del progetto (allo stesso livello del file `docker-compose.yml`) e inserire le seguenti variabili:

```env
GEMINI_API_KEY=tuo_codice_api_qui
MACHINE_ID=CONVERTER-M001
DESTINATION_SERVICE_URL=http://server-be:8080/storico-misure/register
```

### 3. Esecuzione
Una volta configurato il file `.env`, apri il terminale nella cartella del progetto e lancia:

```bash
docker compose up
```

### 4. Accesso al Portale
Trattandosi di un prototipo funzionale, **non è implementato un sistema di autenticazione**. È possibile accedere direttamente alla dashboard principale tramite il browser all'indirizzo:

> **`http://localhost/home`**

---

## 🛠 Stack Tecnologico

Il sistema è basato su un'architettura a microservizi che comunica in modo fluido per gestire l'intero ciclo del dato:

* **Java + Spring Boot**: Il cuore del sistema. Funge da server centrale per l'elaborazione, la logica di business e la gestione dei flussi di dati.
* **Postgres**: Database relazionale affidabile utilizzato per il salvataggio persistente dei dati storici e delle configurazioni.
* **Python + FastAPI**: Utilizzato per tre componenti critiche:
    * *Edge Server*: Gestisce l'invio dei dati dal Raspberry al server centrale.
    * *AI Connector*: Interfaccia verso l'intelligenza artificiale (Google Gemini) per analizzare la situazione del terreno.
    * *Simulator*: Simulazione dell'invio dati dai sensori per testare il prototipo senza hardware fisico.
* **Angular**: Frontend moderno e reattivo. Fornisce all'utente una dashboard intuitiva per monitorare il proprio terreno.

---

## 📋 Note sul Prototipo
* **Accesso Libero**: Per facilitare i test, tutte le rotte frontend e le API sono accessibili senza login.
* **Simulazione**: La pipeline dei dati è completa; il simulatore Python genera dati verosimili che attraversano l'intero stack fino alla visualizzazione su Angular.