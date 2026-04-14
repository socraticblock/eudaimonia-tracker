# =========================================
# Eudaimonia — Multi-stage Build
# =========================================

# ---- Base ----
FROM node:22-alpine AS base
WORKDIR /app
RUN corepack enable

# ---- Dependencies ----
FROM base AS deps
COPY package*.json ./
RUN npm ci --frozen-lockfile

# ---- Builder ----
FROM deps AS builder
COPY tsconfig.json ./
COPY src/ src/
RUN npm run build

# ---- Production ----
FROM base AS production
RUN addgroup -S eudaimonia && adduser -S eudaimonia -G eudaimonia

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

WORKDIR /app

# Copy only needed files
COPY package*.json ./
COPY prisma/ prisma/

# Install production deps only
RUN npm ci --frozen-lockfile --omit=dev

# Copy built files from builder
COPY --from=builder --chown=eudaimonia:eudaimonia /app/dist ./dist

# Switch to non-root user
USER eudaimonia

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:3000/health || exit 1

# Use dumb-init for proper PID 1 signal handling
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/index.js"]
