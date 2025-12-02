# =====================================================
# PORTFOLIO BORIS HENNÉ - Dockerfile Multi-Stage
# =====================================================
# Compatible ARM64 (Raspberry Pi, certains NAS) et AMD64
# Optimisé pour production avec Nginx

# ===================
# Stage 1: Dependencies
# ===================
FROM node:20-alpine AS deps

WORKDIR /app

# Copier fichiers de dépendances
COPY package.json package-lock.json* ./

# Installer les dépendances
RUN npm ci

# ===================
# Stage 2: Builder
# ===================
FROM node:20-alpine AS builder

WORKDIR /app

# Copier les dépendances depuis le stage précédent
COPY --from=deps /app/node_modules ./node_modules

# Copier le code source
COPY . .

# Arguments de build (pour les variables d'environnement)
ARG VITE_GOOGLE_CLIENT_ID
ARG VITE_ADMIN_EMAIL=boris.henne@gmail.com
ARG VITE_APP_URL=https://boris-henne.fr

# Exporter comme variables d'environnement pour le build
ENV VITE_GOOGLE_CLIENT_ID=$VITE_GOOGLE_CLIENT_ID
ENV VITE_ADMIN_EMAIL=$VITE_ADMIN_EMAIL
ENV VITE_APP_URL=$VITE_APP_URL

# Build de production
RUN npm run build

# ===================
# Stage 3: Production avec Nginx
# ===================
FROM nginx:alpine AS production

# Labels pour identification
LABEL org.opencontainers.image.title="Portfolio Boris Henné"
LABEL org.opencontainers.image.description="Portfolio personnel - Consultant SAP ABAP/Fiori"
LABEL org.opencontainers.image.authors="Boris Henné <contact@boris-henne.fr>"
LABEL org.opencontainers.image.source="https://github.com/BorisHenne/portfolio"

# Installer curl pour healthcheck
RUN apk add --no-cache curl

# Supprimer la config nginx par défaut
RUN rm -rf /usr/share/nginx/html/*
RUN rm /etc/nginx/conf.d/default.conf

# Copier la config Nginx optimisée
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/default.conf /etc/nginx/conf.d/default.conf

# Copier les fichiers buildés depuis le builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Créer les dossiers pour les volumes
RUN mkdir -p /usr/share/nginx/html/cv \
             /usr/share/nginx/html/videos \
             /usr/share/nginx/html/logos \
             /usr/share/nginx/html/uploads \
             /var/log/nginx && \
    chown -R nginx:nginx /usr/share/nginx/html && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /var/cache/nginx

# Exposer le port 80
EXPOSE 80

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/health || exit 1

# Commande de démarrage
CMD ["nginx", "-g", "daemon off;"]
