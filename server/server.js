require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connUri = process.env.MONGO_LOCAL_CONN_URL;
let PORT = process.env.PORT || 4000;
const app = express();
const fs = require('fs');
const csvFilePath=''
const csv=require('csvtojson')
var cron = require("node-cron");
let filePath = "./Questions.csv";
const Question = require("./Model/QuestionsModel")
let previousqstn;

mongoose.promise = global.Promise;
mongoose.connect(connUri, { useNewUrlParser: true , useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open', () => console.log('MongoDB connection established successfully!'));
connection.on('error', (err) => {
    console.log("MongoDB connection error." + err);
    process.exit();
});

const CSVtoJson = async (filePath) => {
const result = await csv(filePath).fromFile(filePath)
return result
}

cron.schedule("1 * * * * *",() => {
    console.log("run")
    ImporttoDb();
    // CSVtoJson(filePath)
})

const ImporttoDb = async() => {
    var jsonArr = await CSVtoJson(filePath)
    // var jsR = await Question.find({})
    jsonArr.map(async js =>{
        const qs = await Question.find();
        
        const question = new Question(js);
        console.log(question);
        await question.save();
    })
    previousqstn =jsonArr;
}

app.get("/", async (req, res) => {
    const jsonArray=await CSVtoJson(filePath);
    console.log(jsonArray);
})



app.listen(PORT, () =>console.log("Port running"))