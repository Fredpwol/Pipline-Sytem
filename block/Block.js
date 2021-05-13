const mongoose = require("mongoose");

const Block = new mongoose.Schema({
    previousBlockHash: String,
    blockhash: String,
    density: {
        type: Number,
        required: true
    },
    temperature: {
        type: Number,
        required: true
    },
    pressure: {
        type: Number,
        required: true
    },
    density: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    }
})