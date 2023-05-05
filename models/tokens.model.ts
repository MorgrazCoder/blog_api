import mongoose from 'mongoose';
const { Schema, model } = mongoose;

export default model('Token',
    new Schema({
        user_id: { type: String, unique: true, required: true },
        refresh_token: { type: String, unique: true, required: true }
    })
)