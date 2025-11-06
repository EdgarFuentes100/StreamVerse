const express = require('express');
const router = express.Router();

const { listaEspisodios, episodioActual } = require('../controllers/episodio.controller');
router.get('/listadoEpisodio/:idTemporada', listaEspisodios);
router.get('/episodioActual/:idEpisodio', episodioActual);

module.exports = router;
