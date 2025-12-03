FROM node:18-alpine
WORKDIR /app

COPY backend/package*.json ./
RUN npm ci --only=production

COPY backend/ ./

ENV PORT=5000
EXPOSE 5000

CMD ["node", "index.js"]
