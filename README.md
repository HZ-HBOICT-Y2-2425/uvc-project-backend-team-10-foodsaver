## Resolving issues with Knex not finding sqlite3 node modules while trying to run migrations or docker compose

1. Open a powershell terminal
2. Navigate to the `your repo/microservice-causing-the-issue/code` in the terminal
3. Run command: 
>>   Remove-Item -Force .\node_modules
>>   Remove-Item -Force .\package-lock.json

# Do these steps only if you have issues with migrations 
4. Run command: npm install
5. (If you need to run migrations, do it now, as this workaround will stop working when running docker compose up)
6. Once you are done with migrations or seeders, run this command again: 
>>   Remove-Item -Force .\node_modules
>>   Remove-Item -Force .\package-lock.json

# Do these steps to make your docker compose working again
7. Make sure to run docker compose up WITHOUT RUNNING NPM INSTALL!!!
8. Docker composer should be running.

# Backend example

In this backend example for a project, a folder is created for each micoservice. 

1. Install docker to your system
2. Run `docker compose up` and you are good to go

## Modules

We use ES6 module system to import and export modules.

## Variables.env

We save credentials to other services in a `variables.env` file. This file is included in this template. However, it is common use not to include it in a public repository. There are some default key value pairs included to demonstrate its working.

## Ports

You can change the ports of your server via `variables.env`

- Microservice: sample microservice running on port:3011
- Apigateway: sample API Gateway - running on port:3010

## Containers

Check the readme files of each container to understand the setup
