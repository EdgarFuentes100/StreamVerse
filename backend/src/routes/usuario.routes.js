const express = require('express');
const router = express.Router();

const { listarUsuario } = require('../controllers/usuario.controller');
router.get('/listadoUsuario/:id', listarUsuario);

module.exports = router;
