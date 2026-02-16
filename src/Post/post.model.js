import { Schema, model } from 'mongoose';

const postSchema = Schema({
    titulo: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    texto: {
        type: String,
        required: true
    },
    // Referencia al usuario que crea la publicación (dueño)
    autor: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

export default model('Post', postSchema);