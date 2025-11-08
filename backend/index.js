const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();
require('./src/config/passport');

const app = express();
const PORT = 4000;

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 24 * 60 * 60 * 1000 }
    })
);

app.use(passport.initialize());
app.use(passport.session());

// Rutas API
app.use('/api/v1/categoria', require('./src/routes/categoria.routes'));
app.use('/api/v1/genero', require('./src/routes/genero.routes'));
app.use('/api/v1/contenido', require('./src/routes/contenido.routes'));
app.use('/api/v1/temporada', require('./src/routes/temporada.routes'));
app.use('/api/v1/episodio', require('./src/routes/episodio.routes'));
app.use('/api/v1/perfil', require('./src/routes/perfil.routes'));
app.use('/api/v1/plan', require('./src/routes/plan.routes'));

// Rutas Auth
app.use('/api/v1/auth', require('./src/routes/auth.routes'));

app.listen(PORT, () => console.log(`✅ Servidor corriendo en http://localhost:${PORT}`));
