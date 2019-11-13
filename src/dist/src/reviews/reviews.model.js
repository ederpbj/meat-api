"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    coments: {
        type: String,
        required: true,
        maxlength: 500
    },
    restaurant: {
        //Referencia o id do restaurante, não é o objeto id em si
        type: mongoose.Schema.Types.ObjectId,
        //Qual modelo vai usar
        ref: 'Restaurant',
        required: true
    },
    user: {
        //Referencia o id de user
        type: mongoose.Schema.Types.ObjectId,
        //Qual modelo vai usar
        ref: 'User',
        required: true
    }
});
const Review = mongoose.model('Review', reviewSchema);
