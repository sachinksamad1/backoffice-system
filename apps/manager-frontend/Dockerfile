# Stage 1: Build the Angular application
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build frontend
# Stage 2: Serve the application with Nginx
FROM nginx:alpine
COPY --from=builder /app/dist/apps/frontend /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]