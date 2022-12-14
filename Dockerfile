FROM node:16-slim

WORKDIR /backend-api

COPY /config ./config
COPY /controllers ./controllers
COPY /models ./models
COPY /middleware ./middleware
COPY /routes ./routes
COPY package*.json ./
COPY /server.js ./
COPY /app.js ./

RUN npm install

RUN chmod +x /backend-api

EXPOSE 3002

ENTRYPOINT ["npm", "run", "watch"] 