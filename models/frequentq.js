const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var frequentSchema = new Schema({
    authorId: {
        type: String,
        default: "",
        required: false
        // Auth sonra true yap
    },
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true

    },

}, {
    timestamps: true
});

var Frequents = mongoose.model('Frequent', frequentSchema);
module.exports = Frequents;