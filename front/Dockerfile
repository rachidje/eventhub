# Étape 1: build avec Vite
FROM node:20-alpine AS builder

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Étape 2: image nginx pour servir les fichiers
FROM nginx:stable-alpine

# Supprime la conf par défaut et copie la tienne
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copie les fichiers générés
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
