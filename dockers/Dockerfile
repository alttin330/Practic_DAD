# Usar la imagen base de Node.js
FROM node:18

# Crear y definir el directorio de la aplicación
WORKDIR /app

# Copiar los archivos de la aplicación al contenedor
COPY package*.json ./
COPY server.js ./

# Instalar las dependencias
RUN npm install

# Exponer el puerto de la aplicación
EXPOSE 9000

COPY . .

# Comando para ejecutar la aplicación
CMD [ "node", "server.js" ]