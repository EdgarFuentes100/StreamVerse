const express = require('express');
const router = express.Router();

const { listaTemporada } = require('../controllers/temporada.controller');
router.get('/listadoTemporada/:id', listaTemporada);

module.exports = router;
