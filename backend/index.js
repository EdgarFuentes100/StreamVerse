const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;

const categoria = require('./src/routes/categoria.routes');
const genero = require('./src/routes/genero.routes');
const contenido = require('./src/routes/contenido.routes');
const temporada = require('./src/routes/temporada.routes');
const episodio = require('./src/routes/episodio.routes');

// 🔹 Permitir solicitudes desde el frontend
app.use(cors({
    origin: 'http://localhost:5173', // o el puerto donde corre tu React
    credentials: true,
}));

app.use(express.json());
app.use('/api/v1/categoria', categoria);
app.use('/api/v1/genero', genero);
app.use('/api/v1/contenido', contenido);
app.use('/api/v1/temporada', temporada);
app.use('/api/v1/episodio', episodio);

app.listen(PORT, () => {
    console.log("Corriendo servidor en el puerto", PORT);
});
