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
check url in package.json
change .env data


#### Install nodejs:
`cd opt`

`mkdir nodejs`

`curl https://nodejs.org/dist/v12.22.12/node-v12.22.12-linux-x64.tar.gz | sudo tar xvzf - -C /opt/nodejs`

`sudo ln -s /opt/nodejs/bin/node /usr/bin/node`

`sudo ln -s /opt/nodejs/bin/npm /usr/bin/npm`

`sudo apt install nodejs`

`sudo npm install`

`sudo apt install npm`

#### Install pm2:

`sudo npm install -g pm2`

`pm2 --version`

#### Deploy website

Clone the website's repo in a new folder in the opt/ directory.

`sudo npm install -g serve`

`sudo npm install`

`sudo npm run build`

Now we can run the following command to deploy the app

`pm2 serve <path> <port> --spa`

In our case, we can run the following command

`pm2 serve build 8082 --spa` 



## MySQL

`mysql -u root -p'password' -P 3306 -h ip_address`

to edit MySQL from the workbench follow these steps:

1. install the workbench

`sudo snap install mysql-workbench-community`

2. run the following command to enable password management

`sudo snap connect mysql-workbench-community:password-manager-service :password-manager-service`

3. Launch the workbench
   
`mysql-workbench-community`