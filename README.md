# BotBand

GA-generated music.

# Project Structure

`package.json, package-lock.json` files in root level are for **server** dependencies.
Server source code is contained in `server`.
Client source code is contained in `client/src`.

**NOTE**:
When installing **server dependencies**, run `npm install <package>` from **root directory**.
When installing **client dependencies**, run `npm install <package>` from **client directory**.

# Set Up

1. Clone project.
2. Run `npm install` in root directory.
3. Run `npm install` in client directory.

## Run Backend

1. Open project with VS Code.
2. Select `Terminal > Run Build Task` from menu, then select `tsc: watch`.

## Run Frontend

1. Run `npm start` from `client` directory.
