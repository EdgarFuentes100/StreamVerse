const express = require('express');
const router = express.Router();

const { listaTemporada, listaTemporadas } = require('../controllers/temporada.controller');
router.get('/listadoTemporada/:id', listaTemporada);
router.get('/listadoTemporada', listaTemporadas);

module.exports = router;
