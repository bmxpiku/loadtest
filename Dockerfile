FROM node:14.13-alpine

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh
WORKDIR /server
COPY . /server
RUN npm i
EXPOSE 3000

CMD ["npm", "start"]
