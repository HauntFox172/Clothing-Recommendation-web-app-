# Используем образ Node.js для сборки
FROM node:14 AS build
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package.json .
COPY package-lock.json .
RUN npm install

# Копируем все файлы и собираем приложение
COPY . .
RUN npm run build

# Используем Nginx для сервировки статики
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf