# BotBand

Music generated with genetic algorithms.

# Project Structure

`package.json, package-lock.json` files in root level are for **server** dependencies.\
Server source code is contained in `server`.\
Client source code is contained in `client/src`.

**NOTE**\
When installing **server dependencies**, run `npm install <package>` from **root directory**.\
When installing **client dependencies**, run `npm install <package>` from **client directory**.

# Set Up

1. Clone project.
1. Run `npm install` in root directory.
1. Run `npm install` in client directory.

## Run Backend

1. Install [Node](https://nodejs.org/en/).
1. Run `npm run build` and `npm start` from root directory.

**NOTE**\
Code changes will not come into effect unless the server is restarted.\
If you make code changes, terminate the server and rerun the above commands.

## Run Backend Tests

Run `npm run test` from root directory.

## Run Backend Experiments

Run `npm run experiment` from root directory.

## Run Frontend

Run `npm start` from `client` directory.
