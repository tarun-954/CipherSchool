const express = require('express');
const app = express();


//default root
app.get('/',(req,res)=>{
    res.send("This is some response using express JS");
});

app.get('/add',(req,res)=>{
    let {a:firstNumber,b:secondNumber} =req.query;
    let sum=parseInt(firstNumber)+parseInt(secondNumber);
    res.send({sum})
});


//DB connection
const dbConnection=require('./appMongoose');
dbConnection();

//start server
app.listen(4000,()=>{
    console.log("App listening on 4000 PORT");
});