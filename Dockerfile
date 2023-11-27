FROM node:18
WORKDIR /root/statch
COPY ./dist/ .
EXPOSE 8420
EXPOSE 8421
ENTRYPOINT npm i --omit=dev && npx prisma migrate deploy && npx prisma generate && node main.js
