require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connUri = process.env.MONGO_LOCAL_CONN_URL;
let PORT = process.env.PORT || 4000;
const app = express();
const fs = require('fs');
const csv=require('csvtojson')
var cron = require("node-cron");
let filePath = "./Questions.csv";
const Question = require("./Model/QuestionsModel")

const corsOptions ={
    origin:'*', 
    credentials:true, 
    optionSuccessStatus:200,
}
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
    ImporttoDb();
})

const ImporttoDb = async() => {
    var jsonArr = await CSVtoJson(filePath)
    jsonArr.map(async js =>{
        let k=0;
        const qs = await Question.find();
        for(let i=0; i<qs.length; i++){
            if(qs[i].Questions.Question===js.Questions.Question){
                k++;
            }
        }
        if(k===0){
            const question = new Question(js);
            await question.save();
        }
    })
}

app.get("/", async (req, res) => {
    const jsonArray=await CSVtoJson(filePath);
    console.log(jsonArray);
})

app.get("/questions", async(req, res) => {
    const questions = await Question.find();

    res.status(200).json({
        success: "true",
        questions
    })
})



app.listen(PORT, () =>console.log("Port running"))