const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    Category:{
        type:String,
        required: true
    },
    Questions: {
        Question: {
            type:String,
            required: true
        },
        OptionA: {
            type:String,
            required: true
        },
        OptionB: {
            type:String,
            required: true
        },
        OptionC: {
            type:String,
            required: true
        },
        OptionD: {
            type:String,
            required: true
        },
    }
})

module.exports = mongoose.model('Questions', QuestionSchema);