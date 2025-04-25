FROM node:20-slim

WORKDIR /app

# Install dependencies yang diperlukan untuk membangun bcrypt
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Salin package.json dan package-lock.json terlebih dahulu untuk instalasi dependensi
COPY package*.json ./

# Install dependencies
RUN npm install

# Rebuild bcrypt (tergantung kebutuhan)
RUN npm rebuild bcrypt --build-from-source

# Salin semua file aplikasi
COPY . .

EXPOSE 5002

# Jalankan aplikasi (make sure script "dev" ada di package.json)
CMD ["npm", "run", "dev"]
