# Build Stage
FROM node:20-alpine as builder

WORKDIR /app

# Salin dependensi dan konfigurasi terlebih dahulu
COPY package*.json ./
COPY vite.config.js ./
COPY . ./

# Install dependencies dan build project
RUN npm install
RUN npm run build

# Serve React (vite) build via Nginx
FROM nginx:alpine

# Salin hasil build dari builder ke folder nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 untuk Nginx
EXPOSE 80

# Jalankan Nginx di background
CMD ["nginx", "-g", "daemon off;"]
