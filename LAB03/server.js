//importing Connect
const connect = require('connect');
const url = require('url');
//connect app
const app = connect();

//defining the calculate function
function calculate(req,res) {
    //creating the parsing functionality
    const parsedRequest = url.parse(req.url, true);
    const queryOperations = parsedRequest.query;
    const method = queryOperations.method;
    const x = parseFloat(queryOperations.x);
    const y = parseFloat(queryOperations.y);

    //adding the validation condition
    if (!method || isNaN(x) || isNaN(y)){
        res.end('Please enter valid values for X and Y');
        return;
    }
    let resultValue;
    let operatorSymbol;

    //selecting the correct operator, used the lower case conversion for user experience.
    switch (method.toLocaleLowerCase()){
        //addition logic
        case 'add':
            resultValue = x + y;
            operatorSymbol = '+';
            break;
        //subtract logic
        case 'subtract':
            resultValue = x - y;
            operatorSymbol = '-'
            break;
        //multiplication logic
        case 'multiply':
            resultValue = x * y;
            operatorSymbol = '*'
            break;
        //division logic
        case 'divide':
            resultValue = x / y;
            //in case of dividing by 0 which is not possible
            if (y === 0){
                res.end('ERROR - Cannot divide by 0 - Undefined')
                return;
            }
            operatorSymbol = '/'
            break;
            default:
                res.end('ERROR - You can only use + add , - subtract , * multiply , / divide ')
                return;
    }
    //displaying the result of the operation (any of them)
    res.end(`${x} ${operatorSymbol} ${y} = ${resultValue}`);
}
app.use('/' , calculate);

app.listen(3000, () => {
    console.log("running server at http://localhost:3000/lab3/?method=add&x=16&y=4");
});
