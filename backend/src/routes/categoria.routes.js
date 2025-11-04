const express = require('express');
const router = express.Router();

const {listaCategoria} = require('../controllers/categoria.controller');
router.get('/listado', listaCategoria);

module.exports = router;