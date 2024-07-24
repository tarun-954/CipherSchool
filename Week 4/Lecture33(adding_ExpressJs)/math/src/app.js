const express = require('express');
const app = express();

app.get('/',(req,res)=>{
    res.send("This is some response using express JS");
});

app.get('/add',(req,res)=>{
    let {a:firstNumber,b:secondNumber} =req.query;
    let sum=parseInt(firstNumber)+parseInt(secondNumber);
    res.send({sum})
});

app.listen(4000,()=>{
    console.log("App listening on 4000 PORT");
});