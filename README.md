# MoonKat
## Intro
It is the web extension which aim to provide the anti-fraud solution for the Web3 application
## Prerequisites
### Install those at local
* MySQL
* nodejs
* yarn, npm

After the installation, setup the local MySQL database for the further use

## Usage
### .gitignore
```
*.log
**/node_modules
.DS_Store
cloud_sql_proxy
.vscode
node_modules/
server/app/config/db.config.js
server/app/config/config.json
web/dist/*
```
### Scripts
To Build the frontend file, cd to `web/` and type the beneath command
The `WORK_ENV` has two value
```
dev: 127.0.0.1:8080
work: 
```
Help developer to switch the runtime without editing

Right now just use yarn dev:chrome
```shell=
cd /web/
yarn {WORK_ENV}:{browserType}
yarn {WORK_ENV}:{browserType}
```
---
To Start the server, cd to `server/` and type the beneath command
```shell=
cd /server/app
npx sequelize-cli db:migrate
cd /server/
node server.js
```
### Local Web Service
To Test the web service 
please add the db.config.js in the local code file
```We are working on putting PWD...etc to SECRET```
config.json
```javascript=
{
  "development": {
    "username": {localUser},
    "password": {localName},
    "database": {localDbName},
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": {localUser},
    "password": {localName},
    "database": {localDbName},
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": {localUser},
    "password": {localName},
    "database": {localDbName},
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```
### Unzip customize Google Extension 
0. After build the static web frontend file in `web/`.
1. Start Google Chrome Browser( or other Chromium based browser like MSFT Edge）
2.  Click 管理擴充功能
3.  ![](https://i.imgur.com/yuPCxG0.png)
4.  Click 載入解壓縮
5.  ![](https://i.imgur.com/aK2pSu1.png)
6.  Choose ~/Moonkat/web/dist/chrome
7.  ![](https://i.imgur.com/V3lqA5S.png)
### Test the Extension
[Demo Video](https://youtu.be/-MiHJxp7aV8)
