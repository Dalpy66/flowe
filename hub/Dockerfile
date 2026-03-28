FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY traduttore.py .
# Avvia uvicorn puntando al file traduttore.py (traduttore:app)
CMD ["uvicorn", "traduttore:app", "--host", "0.0.0.0", "--port", "8000"]