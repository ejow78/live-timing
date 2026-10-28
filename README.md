# 🏎️ LATAM Simracing Alliance — Live Timing & Telemetry API

Portal Web y API en tiempo real para servidores de **Assetto Corsa** gestionados con **Emperor Server / ACSM (Assetto Corsa Server Manager)**.

Diseñado con los colores, tipografía y estilo oficial de la comunidad [latamsimracing.com](https://latamsimracing.com/).

---

## ⚡ Características

* **📡 Streaming SSE en tiempo real:** EventSource continuo (`/api/live/stream`) con latencia mínima de actualización de posiciones y telemetría de cada auto.
* **🗺️ Minimapa interactivo con trazado real:** Renderizado dinámico de la pista, mapa oficial extraído del servidor y posiciones suaves en 60 FPS.
* **⏱️ Clasificación en vivo:** Tiempos por vuelta, deltas, compuestos de neumáticos, marchas y estado de pits en tiempo real.
* **🏁 Race Control & Banderas:** Detección de bandera verde, bandera amarilla con indicación de sector por incidentes y bandera a cuadros.
* **📊 API REST completa:** Endpoints para consultar información de sesión, hotlaps, resultados y entry list.

---

## 🚀 Requisitos y Puesta en Marcha

### 1. Clonar el repositorio
```bash
git clone https://github.com/TU-USUARIO/lsa-live-timing.git
cd lsa-live-timing
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crea tu archivo `.env` basándote en `.env.example`:
```ini
EMPEROR_IP_OR_DOMAIN=216.238.100.32
EMPEROR_HTTP_PORT=9649
AC_SERVER_PASSWORD=TuPassword
EMPEROR_WEB_URL=https://aclsa.emperorservers.com
WEB_PORT=3000
ADMIN_PASSWORD=TuPasswordAdmin
MOCK_MODE=false
```

### 4. Iniciar en modo desarrollo
```bash
npm run dev
```

### 5. Compilar e iniciar para producción
```bash
npm run build
npm start
```

---

## 🌐 Endpoints de la API

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| `GET` | `/` | Portal Web interactivo de Live Timing |
| `GET` | `/api/live` | Snapshot JSON del estado actual de la pista y pilotos |
| `GET` | `/api/live/stream` | Stream continuo SSE (Server-Sent Events) en tiempo real |
| `GET` | `/api/ac/overview` | Resumen completo: hotlaps, campeonatos, entrylist y último resultado |
| `GET` | `/api/ac/entrylist` | Lista de inscriptos y autos asignados |
| `GET` | `/api/ac/hotlaps` | Récords de vuelta en el circuito actual |
| `GET` | `/api/ac/hotlaps-by-car` | Récords de vuelta clasificados por modelo de auto |
| `GET` | `/api/ac/championships` | Lista y estado de los campeonatos configurados |
| `GET` | `/api/ac/latest-result` | Resultados de la última sesión disputada |
| `GET` | `/api/tables` | Tablas de posiciones personalizadas |

---

## 🛠️ Tecnologías
* **Node.js** con ES Modules
* **TypeScript**
* **Zod** (Validación de entorno)
* **Tailwind CSS CDN** + Google Fonts (**Chakra Petch**, **Saira**, **JetBrains Mono**)
* **Server-Sent Events (SSE)** + WebSocket
