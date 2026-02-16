// index.js 
import { config } from "dotenv"
import { initServer } from './configs/app.js'
import { dbConnection } from './configs/db.js'

// Ejecutamos la conexión a la DB y luego el servidor
config()
dbConnection()
initServer()