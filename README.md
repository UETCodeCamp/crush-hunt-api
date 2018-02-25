# Crush Hunt App API

## Features

- Local Authentication using Email and Password (Login and Register)


## Prerequisites
- [MongoDB](https://www.mongodb.org/downloads)
- [Node.js 6.0+](http://nodejs.org)


## Getting Started

```
# Clone this project to your local.
git clone https://github.com/UETCodeCamp/girl-hunt-api.git my-project

# Change directory
cd my-project

# Install package dependencies
npm install || yarn

# Start your app
node index.js

```
Note: I highly recommend installing [Nodemon](https://github.com/remy/nodemon). It watches for any changes in your node.js app and automatically restarts the server. Once installed, instead of node app.js use nodemon app.js. It will save you a lot of time in the long run, because you won't need to manually restart the server each time you make a small change in code.
To install, run:

`sudo npm install -g nodemon`

## Configuration
You can add file `{environment}.env` to change configuration (with `environment = NODE_ENV`).

Example: NODE_ENV=development => file name is: `development.env`
```
GH_SECRET_KEY=secret_key
GH_PORT_APP=1234
GH_MONGODB_URI=mongodb://localhost:27017/girl_hunt_app
```
