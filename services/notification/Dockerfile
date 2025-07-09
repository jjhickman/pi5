FROM alpine:node


WORKDIR /notification
COPY src/package*.json /notification
RUN npm install
COPY src/index.js /notification

CMD ["npm", "run", "prod"]