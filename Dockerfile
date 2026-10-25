FROM mirror.gcr.io/library/python:3.12-slim
WORKDIR /app
COPY app app
COPY web web
COPY openapi.json start.py ./
# Release archives may arrive with a restrictive umask; the unprivileged runtime must read its code.
RUN chmod -R a+rX,go-w /app
ENV PORT=8799 DATA_DIR=/data PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1
EXPOSE 8799
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s CMD ["python", "-c", "import urllib.request; urllib.request.urlopen('http://127.0.0.1:8799/healthz',timeout=2)"]
ENTRYPOINT ["python", "/app/start.py"]
