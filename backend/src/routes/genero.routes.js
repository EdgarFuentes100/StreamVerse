const express = require('express');
const router = express.Router();

const { listaGenero } = require('../controllers/genero.controller');
router.get('/listado', listaGenero);

module.exports = router;