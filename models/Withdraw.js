const mongoose = require('mongoose');

const WithdrawSchema = new mongoose.Schema({

    amount: {
        type: String,
        
    },
    email: {
        type: String,

    },
    method: {
        type: String,
        required: true
    },
    walletName: {
        type: String,

    },
    walletId: {
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

const Withdraw = mongoose.model('Withdraw', WithdrawSchema);

module.exports = Withdraw;
