## Description

Social network application, written with <a href="typescriptlang.org" target="blank">Typescript</a>. It is a complete CRUD server application, both users and posts.
It is built on the <a href="https://nestjs.com" target="blank">Nestjs</a> framework, taking full advantage of it. User authentication is built with Passport. The database is <a href="https://postgresql.org" target="blank">Postgresql</a> with <a href="https://typeorm.io" target="blank">TypeORM</a> as ORM and the use of <a href="https://www.rabbitmq.com/" target="blank">RabbitMQ</a> for email sending.
## Installation

```bash nestjapp
$ npm install
```

```bash mailerapp
$ npm install
```

```Run Docker-compose for DB & RabbitMQ
$ docker-compose up -d
```

## Running the app's

```bash
# development
$ npm run start mailerapp 

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Description

1. The application has its respective documentation in the nestjsapp project. When running the project by default it does it through port 5000, however it can be modified, by accessing the path /docs#/ (http://localhost:5000/docs#/) you will find the documentation. 

![image](https://github.com/TOYCRESJDGM/SocialNetwork/assets/69774985/d01e277a-ce24-4612-97ba-15ca9fb8f097)

2. As for the sending of e-mails, this is done at the time of successful registration through the mailerapp service, for which MailJet and RabbitMQ were used as brokers for communication between the services.

![image](https://github.com/TOYCRESJDGM/SocialNetwork/assets/69774985/5c4fcd54-5fea-4e8a-be3b-954bf27582f7)


