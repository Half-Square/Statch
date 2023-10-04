FROM node:18
WORKDIR /usr/statch
COPY ./dist/ .
RUN npm i --omit=dev
RUN npx prisma migrate deploy
RUN npx prisma generate
EXPOSE 8420
EXPOSE 8421
CMD ["node", "main.js"]
VOLUME ["/prisma/databases"]
