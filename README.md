# Chess

**This is a chess web app game built on express js framework_**

To run this web applcation with success you have to create a mysql database instance.
```javascript
{
    host: 'localhost',
    user: 'chess',
    password: 'chess',
    database : 'chess_db' 
}
```

## Setup

First on all install every module :
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
$ node models/migrations.js
```

## Start

To run the server in debug mode:
```shell
$ DEBUG=chess:* npm start
```

To run in production mode :
```shell
$ NODE_ENV=production npm start
```