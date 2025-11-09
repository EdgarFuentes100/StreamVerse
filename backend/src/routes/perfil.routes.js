const express = require('express');
const router = express.Router();

const { listaPerfil, firmarPerfil } = require('../controllers/perfil.controller');

// Obtener todos los perfiles de un usuario
router.get('/listaPerfil/:id', listaPerfil);

// Firmar un perfil específico (por params)
router.get('/firmarPerfil/:id', firmarPerfil);

module.exports = router;
