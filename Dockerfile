FROM node:18
WORKDIR /usr/src/app
COPY ./dist/ .
RUN npm i --omit=dev
RUN npx prisma migrate deploy
RUN npx prisma generate
EXPOSE 5000
EXPOSE 5001
CMD ["node", "main.js"]
VOLUME ["./prisma/databases"]
