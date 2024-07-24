const express = require('express');
const app = express();
const Task=require('./models/Task')

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


app.post('/add-task',async(req,res)=>{
    const task=new Task({title:"This is Title",description:"This is Description"});
    await task.save();
    return res.status(200).json({
        success:true,
        task:task,
        message:"Task is Saved"
    });
})



//start server
app.listen(4000,()=>{
    console.log("App listening on 4000 PORT");
});