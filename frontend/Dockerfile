FROM node:18-alpine AS builder
WORKDIR /app

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ ./

RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
RUN npm i -g serve
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
