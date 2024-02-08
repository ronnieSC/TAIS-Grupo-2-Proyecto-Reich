FROM python:3

ENV PYTHONUNBUFFERED=1

WORKDIR /back

COPY requirements.txt .

RUN python -m pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000
