import { Router } from 'express'
import { addComment, updateComment, deleteComment } from './comment.controller.js'

const api = Router()

api.post('/add', addComment)
api.put('/update/:id', updateComment)
api.delete('/delete/:id', deleteComment)

export default api