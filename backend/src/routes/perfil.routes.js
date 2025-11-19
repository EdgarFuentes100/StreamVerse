const express = require('express');
const router = express.Router();

const { listaPerfil, firmarPerfil, crearPerfil } = require('../controllers/perfil.controller');

// Obtener todos los perfiles de un usuario
router.get('/listaPerfil/:id', listaPerfil);

// Firmar un perfil específico (por params)
router.get('/firmarPerfil/:id', firmarPerfil);
router.post('/crear', crearPerfil);           // Crear una nueva

module.exports = router;
