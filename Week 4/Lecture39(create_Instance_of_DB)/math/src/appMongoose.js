const mongoose = require('mongoose');

const DB_URL="mongodb://localhost:27017/DBConnection";

const dbConnection = ()=>{
    mongoose.connect(DB_URL,{})
    .then(()=>console.log("DB connection established!!"))
    .catch((error)=>{
        console.log("Issue in DB connection");
        console.log(error.message);
        process.exit(1);
    })
}

module.exports = dbConnection;

