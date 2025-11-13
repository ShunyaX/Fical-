import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true
    },
    watchlist: [
        {
            mal_id: { type: Number, required: true },
            title: String,
            image: String,
            score: Number
        }
    ],

})
export const User = mongoose.models.User || mongoose.model('User', userSchema);