# =========================================
# Eudaimonia Frontend — Production Build
# =========================================

FROM node:22-alpine AS base
WORKDIR /app
RUN corepack enable

# ---- Dependencies ----
FROM base AS deps
COPY package*.json ./
RUN npm ci --frozen-lockfile

# ---- Builder ----
FROM deps AS builder
COPY . .
RUN npm run build

# ---- Production ----
FROM base AS production
RUN addgroup -S eudaimonia && adduser -S eudaimonia -G eudaimonia

WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Copy built files from builder
COPY --from=builder --chown=eudaimonia:eudaimonia /app/dist ./dist
COPY --from=builder --chown=eudaimonia:eudaimonia /app/public ./public
COPY --from=builder --chown=eudaimonia:eudaimonia /app/package.json .

# Switch to non-root user
USER eudaimonia

# Expose port (Vite default)
EXPOSE 5173

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:5173 || exit 1

# Use dumb-init for proper PID 1 signal handling
ENTRYPOINT ["dumb-init", "--"]
CMD ["npm", "run", "preview"]
