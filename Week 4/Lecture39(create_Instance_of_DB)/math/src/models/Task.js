const mongoose = require('mongoose');

const TaskSchema=new mongoose.Schema({
    title:{
        type: 'string',
        required: true,
    },
    description:{
        type: 'string',
        required: true,
    },
    isCompleted:{
        type: Boolean,
        default: false,
    }
},{
    timestamps:true,
});


const TaskModel=mongoose.model("Task",TaskSchema);

module.exports=TaskModel;