# Upload PDF Node

Proyecto de prueba con frontend en React + Vite y backend en Node + Express para subir un PDF, procesarlo y guardar datos del candidato.

## Estructura

- `frontend/`: interfaz en React
- `backend/`: API en Express
- `docker-compose.yml`: levanta ambos servicios en local

## Requisitos

- Node `22.x`
- `pnpm`
- Docker y Docker Compose

## Configuracion

### Backend

El backend necesita un archivo `backend/.env`.

Puedes crearlo a partir de `backend/.env.example`:

```bash
cp backend/.env.example backend/.env
```

Variables necesarias:

```env
PORT=3001
GEMINI_API_KEY=your-gemini-api-key
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ROLE_KEY=your-supabase-role-key
```

### Frontend

El frontend usa `import.meta.env.VITE_API_URL`.

En desarrollo local Vite carga automaticamente `frontend/.env.development`:

```env
VITE_API_URL=http://localhost:3001/api/v1/file
```

Tambien tienes `frontend/.env.example` como referencia por si alguien clona el repo y quiere crear su propia configuracion local.

## Ejecutar con Docker

Desde la carpeta `upload-pdf-node`:

```bash
docker compose up --build
```

Servicios disponibles:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3001`

## Ejecutar sin Docker

### 1. Backend

```bash
cd backend
pnpm install
pnpm dev
```

### 2. Frontend

En otra terminal:

```bash
cd frontend
pnpm install
pnpm dev
```

## Como funciona

1. El usuario selecciona un PDF desde el frontend.
2. El frontend envia el archivo al endpoint de la API.
3. El backend extrae el texto del PDF.
4. El backend usa Gemini para obtener `name` y `email`.
5. El backend guarda esos datos en Supabase.

## Notas

- El backend tiene CORS habilitado, por eso el frontend puede llamar directamente a `localhost:3001`.
- Este setup esta pensado para local y pruebas.
