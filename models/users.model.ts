import mongoose from 'mongoose';
const { Schema, model } = mongoose;

export default model('User',
    new Schema({
        email: { type: String, unique: true, required: true },
        password: { type: String, unique: false, required: true},
        name: { type: String, unique: true, required: true},
    })
)