# ---- Build stage: compila TypeScript do backend para JS ----
FROM node:20-slim AS builder
WORKDIR /app

# Instala dependências (inclui devDeps p/ ter o compilador TypeScript)
COPY package*.json ./
RUN npm ci

# Copia o código e compila apenas o backend (tsconfig.build.json exclui frontend)
COPY tsconfig.json tsconfig.build.json ./
COPY server.ts app.ts ./
COPY routes ./routes
COPY controllers ./controllers
COPY models ./models
COPY services ./services
COPY middlewares ./middlewares
RUN npm run build

# ---- Runtime stage: imagem enxuta só com deps de produção + dist ----
FROM node:20-slim AS runner
WORKDIR /app
ENV NODE_ENV=production

# Apenas dependências de produção
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Artefato compilado
COPY --from=builder /app/dist ./dist

# Render injeta a porta via env PORT; server.ts já lê process.env.PORT
EXPOSE 3001
CMD ["node", "dist/server.js"]
