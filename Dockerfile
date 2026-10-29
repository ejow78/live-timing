# Etapa 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json tsconfig.json ./
RUN npm ci

COPY src/ ./src/
RUN npm run build

# Etapa 2: Producción
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/web/logo.png ./dist/web/logo.png
RUN mkdir -p /app/data

EXPOSE 3000

CMD ["node", "dist/index.js"]
