// Servidor web para servir el frontend en puerto 3000
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Servir archivos estáticos desde la raíz del proyecto
app.use(express.static(__dirname));

// Rutas para HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/src/app.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/app.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🌐 Servidor Frontend corriendo en http://localhost:${PORT}`);
    console.log(`📱 Abre http://localhost:${PORT} en tu navegador`);
});
