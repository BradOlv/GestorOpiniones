'use strict';

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { config } from 'dotenv';
import { corsOptions } from './cors-configuration.js'; 
import { dbConnection } from './db.js';
import { helmetConfiguration } from './helmet-configuration.js';
import { requestLimit } from '../src/middlewares/request-limit.js';
import { errorHandler } from '../src/middlewares/handle-errors.js';

// Importaciones de Rutas (Gestor de Opiniones)
import userRoutes from '../src/User/user.routes.js';
import postRoutes from '../src/Post/post.routes.js';
import commentRoutes from '../src/Comment/comment.routes.js';

const BASE_URL = '/gestorOpiniones/v1';

const middleware = (app) => {
    app.use(helmet(helmetConfiguration));
    app.use(cors(corsOptions));
    app.use(express.urlencoded({ extended: false, limit: '10mb' }));
    app.use(express.json({ limit: '10mb' }));
    app.use(requestLimit);
    app.use(morgan('dev'));
}

const routes = (app) => {
    app.use(`${BASE_URL}/users`, userRoutes);
    app.use(`${BASE_URL}/posts`, postRoutes);
    app.use(`${BASE_URL}/comments`, commentRoutes);
}

const initServer = async () => {
    const app = express();
    config(); // Importante para leer el .env
    const PORT = process.env.PORT || 3001;

    try {
        await dbConnection();
        middleware(app);
        routes(app);

        // El manejador de errores siempre debe ir al final
        app.use(errorHandler);

        app.listen(PORT, () => {
            console.log(`Servidor de Opiniones corriendo en el puerto ${PORT}`);
            console.log(`Base URL: http://localhost:${PORT}${BASE_URL}`);
        });

    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
    }
}

export { initServer };