# BotBand

GA-generated music.

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
1. Open project with VS Code.
1. Select `Terminal > Run Build Task` from menu, then select `tsc: watch`.
1. Run `node build/index.local.js` from root directory.

**NOTE**\
Code changes will not come into effect unless the server is restarted.\
If you make code changes, terminate the server and rerun `node build/index.local.js`.

## Run Frontend

Run `npm start` from `client` directory.
