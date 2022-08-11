## Back-end

### Project set up in development

Install npm erbium:
`nvm install v12.22.12` 


Use erbium:
`nvm use 12`

Install:
`npm install`

Run production: 
`npm run start-prod`

### Project set up in production

Before deploying to server, change the url in the following file:
`back/setting/setting.prod.js`
check url in `package.json`
change `.env` data




## MySQL

`mysql -u root -p'password' -P 3306 -h ip_address`

to edit MySQL from the workbench follow these steps:

1. install the workbench

`sudo snap install mysql-workbench-community`

2. run the following command to enable password management

`sudo snap connect mysql-workbench-community:password-manager-service :password-manager-service`

3. Launch the workbench
   
`mysql-workbench-community`