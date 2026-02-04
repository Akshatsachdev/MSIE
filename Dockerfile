FROM python:3.11-slim

# Set working directory inside container
WORKDIR /app

# Install system dependencies (safe minimal set)
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy dependency list
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy entire project
COPY . .

# Required for logging + FastAPI stability
ENV PYTHONUNBUFFERED=1

# Cloud Run / Docker standard
EXPOSE 8080

# Start FastAPI
CMD ["uvicorn", "msie.app.main:app", "--host", "0.0.0.0", "--port", "8080"]