FROM alpine:node


WORKDIR /logger
COPY src/package*.json /logger
RUN npm install
COPY src/index.js /logger

CMD ["npm", "run", "prod"]