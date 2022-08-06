FROM node

WORKDIR /usr/src/app

RUN npm install -g typescript

RUN npm install -g nodemon

COPY ./package*.json ./

RUN npm install

COPY . .

RUN chown -R node:node /usr/src/app

#Build to project
RUN npm run build



## this is stage two , where the app actually runs
FROM node

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --only=production

COPY --from=0 /usr/src/app/dist .
COPY --from=0 /usr/src/app/ecosystem.config.js .

RUN npm install pm2 -g

EXPOSE 3000

#RUn echo $(ls)
RUn echo $(ls src/Server.js -ano)
#RUn echo $(cat /usr/src/app/src/Server.js)

CMD ["pm2-runtime", "start", "ecosystem.config.js"]