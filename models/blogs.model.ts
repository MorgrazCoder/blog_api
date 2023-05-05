import mongoose from 'mongoose';
const { Schema, model } = mongoose;

export default model('Blog',
    new Schema({
        text: { type: String, unique: false, required: true },
        author_id: { type: String, unique: false, required: true},
        media: { type:[String], unique: false, required: false},
        created_at: {type:Number}
    })
)