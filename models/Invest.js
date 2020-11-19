const mongoose = require('mongoose');

const InvestSchema = new mongoose.Schema({

    amount: {
        type: String,
        required: true

    },
    method: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    plan: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },



});

const Invest = mongoose.model('Invest', InvestSchema);

module.exports = Invest;
