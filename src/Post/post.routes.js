import { Router } from 'express'
import { savePost, updatePost, deletePost } from './post.controller.js'

const api = Router()

// Rutas para publicaciones
api.post('/save', savePost)
api.put('/update/:id', updatePost)
api.delete('/delete/:id', deletePost)

export default api