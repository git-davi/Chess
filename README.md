# Chess

**This is a chess web app game built on react and express js framework_**

## **[To do : convert game route to restful api]**


## Setup

To run this web applcation with success you have to create a mysql/mariadb database instance.
```javascript
{
    host: 'localhost',
    user: 'chess',
    password: 'chess',
    database : 'chess_db' 
}
```

**_Note for Debian 10 you should use mariadb_**  
Just uncomment the connection dialect in db/connection.js

Then install every module :
```shell
$ cd Chess
$ npm install
```

Creat the db, the user and grant privileges:
```sql
CREATE DATABASE chess_db;
CREATE USER 'chess'@'localhost' IDENTIFIED BY 'chess';
GRANT ALL PRIVILEGES ON chess_db.* TO 'chess'@'localhost';
```

To dump the db to a file :
```shell
$ mysqldump -u chess -p chess_db > database/dump.sql
```

To import the db :
```shell
$ mysql -u chess -p chess_db < database/dump.sql
```

## Models migrations

If you want to modify a model then you should apply changes to db :
```shell
$ node controllers/utils/db/make_migrations.js
```

## Start

To run the server in debug mode:
```shell
$ DEBUG=chess:* npm start
```

To run with nodemon
```
$ npm run nodemon
```

To run in production mode :
```shell
$ NODE_ENV=production npm start
```

### to run with react in development 
```shell
npm run nodemon
cd chess-react 
npm start
```
Prompt will ask to use another port (choose Y)

## Api specification

In root folder you will find openapi.yaml specification file.  
Just upload it in [swagger editor](https://editor.swagger.io/)

## Resources

Some glyphs come from [https://www.toptal.com/designers/htmlarrows/symbols/](https://www.toptal.com/designers/htmlarrows/symbols/)