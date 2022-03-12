# randomusers-generator

Setting up the Backend development environment
install python dependencies with

pipenv install

run the backend server
1. export the app FLASK_APP=src.app
2. export the env FLASK_ENV=development

> flask run


Server can be accessed on:

> http://localhost:5000


Setting up the Frontend development environment
This app was buit with usage of the https://randomuser.me/api API

Components are divided between containers and presentational. States are managed in the store (reducers, actions, epics).

install node dependencies with

> npm install

run the client server 

> npm run dev

Server can be accessed on:

> http://localhost:8090
