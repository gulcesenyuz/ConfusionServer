const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//price exists
require('mongoose-currency').loadType(mongoose);

var promoSchema = new Schema({
    name: {
        type: String,
        required: true;
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: ''
    },
    price: {
        type: Currency,
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

var Promotions = mongoose.model('Promotion', promoSchema);
module.exports = Promotions;
