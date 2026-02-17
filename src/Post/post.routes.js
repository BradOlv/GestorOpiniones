import { Router } from 'express'
import { savePost, updatePost, deletePost, getPosts, getPostById } from './post.controller.js'

const api = Router()

// Rutas para publicaciones
api.post('/save', savePost)
api.put('/update/:id', updatePost)
api.delete('/delete/:id', deletePost)
api.get('/all', getPosts)
api.get('/:id', getPostById)

export default api