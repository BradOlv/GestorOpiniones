import { Router } from 'express'
import { addComment, updateComment, deleteComment, getComments, getCommentsByPost } from './comment.controller.js'

const api = Router()

api.post('/add', addComment)
api.put('/update/:id', updateComment)
api.delete('/delete/:id', deleteComment)
api.get('/all', getComments)
api.get('/post/:postId', getCommentsByPost)

export default api