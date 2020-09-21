# tic-tac-toe-app
Main application frontend repository for tic-tac-toe game

How does it work? 
Firstly you should define your own configuration, by using this template and adding an .env file with the following variables:

-------------------------------

##### PORT = some port 
##### API_URL  = api url (tic-tac-toe-service)

-------------------------------
By default, the configuration is the following: 

-------------------------------

##### PORT = 4000
##### API_URL = http://localhost:3000/api

-------------------------------
To run the app, simply do "npm install" (make sure you are using v12) and then run "npm run start". 
The functionality is based on: a REST API (tic-tac-toe-service), Vanilla Js and browser's localStorage.

How to use the app? Enjoy playing Tic Tac Toe with a friend :)



Docker containerization is also available. 
For this, simply run the docker-compose.yml, which uses the Dockerfile.
If you're using the default config as it is, the app should be available on the same host and port as it would be run with "npm run start".
For this, make sure the api is available (similar docker configuration on the tic-tac-toe-service).

--------------------------------

How to run the tests?

Simply run "npm run test", which will run all the tests available.
