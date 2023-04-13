# Requirements

[Metamask](https://metamask.io/) wallet extension.

# Setting up the project

1. clone the project using the github url.
2. cd into the client folder using the `cd client` command and run the `npm install` command.
3. cd into the project folder using the `cd ..` command.
4. Now, cd into the server folder using the `cd server` command and run the `npm install` command.

# Setting up the project

## Setting up Ganache for running an Ethereum blockchain locally

1. Install [Ganache](https://trufflesuite.com/ganache/)
2. Upon running Ganache click on the `Quick start` option that the window prompts you with.
3. The screen would look something like this. ![alt text](https://trufflesuite.com/img/ganache-window.png)
4. To add this ganache test wallet to your Metamask, follow the steps on this [link](https://www.geeksforgeeks.org/how-to-set-up-ganche-with-metamask/)

# Getting access token from the distance matrix API.

[Distance matrix API](https://distancematrix.ai/distance-matrix-api) has been used in this project to calculate the distance between two coordinates. Register on the website using your student email to get your **_access token_**.

## Setting the mongoDB connection string

Follow this [article on how to get the connection string](https://www.mongodb.com/docs/guides/atlas/connection-string/).
After obtaining the connection string, `cd into the server folder` and in the `index.js` file at `line 20` replace the connection string with the one you copied.

## Setting up environment variables

1. cd into the client directory and then open the .env file.
2. Declare a new env variable `VITE_DISTANCE_MATRIX_API_TOKEN = <your access token>`

# Running the project in development

1. Run the dev by cd-ing into the client folder and running the command `npm run dev`, by default the it will run on 'http://127.0.0.1:5173/'

2. Run the api by cd-ing into the server folder and running the command `nodemon index.js`
