# =============================================================================
# catmash.davidmaarek.fr — Angular 17 SPA served by nginx
# Multi-stage build: Node compiles, then we ship just nginx + static files.
# =============================================================================

# -----------------------------------------------------------------------------
# Stage 1 — Build the Angular app
# -----------------------------------------------------------------------------
FROM node:20.11.1-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build-prod

# -----------------------------------------------------------------------------
# Stage 2 — Serve with nginx (~12 MB final image)
# -----------------------------------------------------------------------------
FROM nginx:1.27-alpine AS runtime

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/catmash/browser /usr/share/nginx/html

EXPOSE 80
