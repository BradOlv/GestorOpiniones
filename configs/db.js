'use strict';

import mongoose from 'mongoose';

export const dbConnection = async () => {
    try {
        // Monitoreo de estados (Igual a como lo tenías en el otro proyecto)
        mongoose.connection.on('error', () => {
            console.log('MongoDB | No se pudo conectar con mongoDB');
        });

        mongoose.connection.on('connecting', () => {
            console.log('MongoDB | Intentando conectar con mongoDB');
        });

        mongoose.connection.on('connected', () => {
            console.log('MongoDB | Conectado con mongoDB');
        });

        mongoose.connection.on('open', () => {
            console.log('MongoDB | Conectado a la base de datos de Gestor de Opiniones');
        });

        // Conexión principal
        // Usa process.env.URI_MONGO para que coincida con tu .env
        await mongoose.connect(process.env.URI_MONGO, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 10,
        });

    } catch (error) {
        console.error(`Error al conectar con la base de datos: ${error}`);
        process.exit(1);
    }
};

// Cierre Controlado (Esto es lo que te da puntos extra de profesionalismo)
const gracefulShutdown = async (signal) => {
    console.log(`MongoDB | Recibida señal ${signal}, cerrando conexión...`);
    try {
        await mongoose.connection.close();
        console.log('MongoDB | Conexión cerrada exitosamente');
        process.exit(0);
    } catch (error) {
        console.error('MongoDB | Error durante el cierre:', error.message);
        process.exit(1);
    }
};

// Manejadores de señales (Para que cuando presiones Ctrl+C se cierre bien)
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));