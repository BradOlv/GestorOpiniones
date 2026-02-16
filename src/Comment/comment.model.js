import { Schema, model } from 'mongoose';

const commentSchema = Schema({
    texto: {
        type: String,
        required: true
    },
    autor: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    }
}, { timestamps: true });

export default model('Comment', commentSchema);