import * as mongoose from 'mongoose'

import {Restaurant} from '../restaurants/restaurants.model'
import {User} from '../users/users.model'

//representa o ObjectId em runtime
export interface Review extends mongoose.Document{
    date: Date,
    rating: number,
    comments: string,
    //Pode ser o objectId ou o modelo em outro momento
    restaurant: mongoose.Types.ObjectId | Restaurant,
    user: mongoose.Types.ObjectId | User
}

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
    restaurant:{
        //Referencia o id do restaurante, não é o objeto id em si
        type: mongoose.Schema.Types.ObjectId,
        //Qual modelo vai usar
        ref: 'Restaurant',
        required: true
    },
    user:{
        //Referencia o id de user
        type: mongoose.Schema.Types.ObjectId,
        //Qual modelo vai usar
        ref: 'User',
        required: true
    }

})

const Review = mongoose.model<Review>('Review', reviewSchema)