# Docker setup

Este proyecto usa dos contenedores:

- `backend`: API de Node/Express
- `frontend`: Vite en modo local

## Archivos

- `backend/Dockerfile`
- `frontend/Dockerfile`
- `docker-compose.yml`

## Variables de entorno del backend

1. Copia `backend/.env.example` a `backend/.env`
2. Completa los valores reales de Supabase y Gemini

## Levantar el proyecto

```bash
cd upload-pdf-node
docker compose up --build
```

## Desarrollo local sin Docker

El frontend usa `import.meta.env.VITE_API_URL`.
Para desarrollo local se carga automáticamente `frontend/.env.development`.
