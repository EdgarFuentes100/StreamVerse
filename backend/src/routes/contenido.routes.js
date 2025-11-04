const express = require('express');
const router = express.Router();

const { listaContenido } = require('../controllers/contenido.controller');
router.get('/listado', listaContenido);

module.exports = router;