// As described in: https://www.npmjs.com/package/prompt - Getting the Basic Prompt to work

var prompt = require('prompt');
//starting the process
prompt.start();
//using prompt to get the users input and store it as userSelection as instructed
//i have made the input from the user convert to upper case just in case.
prompt.get([userSelection], function (err, result) {
    let userSelection = result.userSelection.toUpperCase();
    //create a random value between 0.0->1.0 using the random function.
    //assigning computerSelect a placeholder for future value.
    let numberValue = Math.random();
    let computerSelection = "";

    //setting the paper,scissors and rock values
    if(numberValue >= 0.00 && numberValue <= 0.34){
        computerSelection = "PAPER";
    } else if (numberValue >= 0.35 && numberValue <= 0.67){
        computerSelection = "SCISSORS";
    } else if (numberValue >= 0.68 && numberValue <= 1.00){
        computerSelection = "ROCK";
    }
});

