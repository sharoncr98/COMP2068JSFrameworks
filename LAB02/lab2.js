// As described in: https://www.npmjs.com/package/prompt - Getting the Basic Prompt to work

var prompt = require('prompt');
//starting the process
prompt.start();
//using prompt to get the users input and store it as userSelection as instructed
//i have made the input from the user convert to upper case just in case.
prompt.get([userSelection], function (err, result) {
    let userSelection = result.userSelection.toUpperCase();
});

