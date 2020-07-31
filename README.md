# es6-node-script
A dead simple template for ES6 Node Scripts. Allows you to use a package manager of your choice.

### Entry Point
src/index.js

### Usage
- After cloning run either `yarn install` || `npm install`
- `npm run build`: Uses babel to compile files in the /src directory and outputs the results into /dist directory
- `npm start`: Runs the build command and then runs `node dist/index.js` starting the script.
