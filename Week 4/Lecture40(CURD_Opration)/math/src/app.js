const express = require('express');
const app = express();
const Task=require('./models/Task')

app.use(express.json());

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

//add task
app.post('/add-task',async(req,res)=>{
    const task=new Task({title:"This is Title",description:"This is Description"});
    await task.save();
    return res.status(200).json({
        success:true,
        task:task,
        message:"Task is Saved"
    });
})  

//get all tasks
app.get('/get-tasks',async(req,res)=>{
    const tasks=await Task.find();
    return res.status(200).json({
        success:true,
        task:tasks,
        message:"Task is get succefully"
    })
})

//update tasks
app.put('/update/:taskId',async(req,res)=>{
    const {taskId}=req.params;//get from api :taskId
    const updateResult=await Task.updateOne({_id:taskId},{$set:{...req.body},});
    if(!updateResult.matchedCount){
        return res.status(401).json({
            success:false,
            message:"taskId is not correct"
        })
    }
    return res.status(200).json({
        success:true,
        message:"Updated task"
    })
})
//Delete tasks
app.put('/update/:taskId',async(req,res)=>{
    const {taskId}=req.params;//get from api :taskId
    const deleteResult=await Task.deleteOne({_id:taskId});
    if(!deleteResult.matchedCount){
        return res.status(401).json({
            success:false,
            message:"taskId is not correct"
        })
    }
    return res.status(200).json({
        success:true,
        message:"delete task successfully"
    })
})


//start server
app.listen(4000,()=>{
    console.log("App listening on 4000 PORT");
});