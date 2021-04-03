const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Questions ==> answer,created,isAnswered,question,

var answerSchema = new Schema({
    answer: {
        type: String,
        default: '',
        required: true
    }

}, {
    timestamps: true
});

var questionSchema = new Schema({
    authorId: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    isAnswered: {
        type: Boolean,
        default: 'false',
        required: true

    },
    answer: [answerSchema]
}, {
    timestamps: true
});

var Questions = mongoose.model('Question', questionSchema);
module.exports = Questions;