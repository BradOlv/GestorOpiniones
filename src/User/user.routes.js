import { Router } from 'express'
import { register, login, updateProfile } from './user.controller.js'

const api = Router()

// Registro y Login 
api.post('/register', register)
api.post('/login', login)

api.put('/update/:id', updateProfile)

export default api