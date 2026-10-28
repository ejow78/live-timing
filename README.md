### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar variables de entorno
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

### 3. Iniciar en modo desarrollo
```bash
npm run dev
```

### 4. Compilar e iniciar para producción
```bash
npm run build
npm start
```

---

##  Endpoints de la API

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
