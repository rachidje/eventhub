# Étape 1 : Build TypeScript
FROM node:20-alpine AS builder

WORKDIR /app

# Copier les fichiers de configuration et installer les dépendances
COPY package*.json ./
RUN npm install

# Copier le reste du projet et compiler
COPY . .
COPY prisma ./prisma
RUN npx prisma generate

RUN npm run build  # suppose que "build" = "tsc"

# Étape 2 : Image minimale pour l'exécution
FROM node:20-alpine

WORKDIR /app

# Installer uniquement les dépendances de production
COPY package*.json ./
RUN npm install --only=production

# ✅ Copier le client Prisma généré
COPY --from=builder /app/node_modules/.prisma /app/node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma /app/node_modules/@prisma

# Copier le build transpilé depuis l'étape précédente
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma 

# Exposer le port (à adapter si différent)
EXPOSE 5000

# Lancer le serveur
CMD ["sh", "-c", "echo '✅ backend ready to start'; node dist/api/main.js"]
