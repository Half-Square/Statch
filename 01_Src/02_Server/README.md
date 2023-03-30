
# Statch-Server

Statch server API.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

* Node 16.17.1: [https://nodejs.org/en/download/releases/](https://nodejs.org/en/download/releases/)
* Mysql 8.0.27: [https://www.mysql.com/downloads/](https://www.mysql.com/downloads/)
* Prisma CLI 4.9.0 [https://www.prisma.io/](https://www.prisma.io/)
* NestJS CLI 9.1.9 [https://nestjs.com/](https://nestjs.com/) 

### Installing

Install dependancies

```
npm install
```

You must create an .env file with the following keys

```
PORT=5000                                               # Server port
DATABASE_URL="mysql://root:root@localhost:3306/statch"  # Database url and credential
SALT="69a7f1ab427d98f1efb3e660dc5bc8c"                  # Token secret
DISABLE_GUARDS=1                                        # Enable/disable guards (0: false, 1: true)
SESSION_TIME=8h                                         # Time before session timeout
```

In new workspace you must migrate database

```
npx prisma migrate dev
```

Start app in dev mode

```
npm run start:dev
```

You can verify your code with eslint

```
npm run lint
```

## Deployment

npm run build-full

### Documentations

Launch TypeDoc
```
npm run doc
```

You can access documentation in /dist/docs folder.

## Built With

* [NestJS](https://nestjs.com/) - Server framework