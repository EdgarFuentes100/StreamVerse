const express = require('express');
const router = express.Router();

const { listaContenido, listaPopular, listaNuevo, listaGrupo, contenidoInfo } = require('../controllers/contenido.controller');
router.get('/listado', listaContenido);
router.get('/listadoPopular', listaPopular);
router.get('/listadoNuevo', listaNuevo);
router.get('/listadoGrupo', listaGrupo);
router.get('/contenidoInfo/:idContenido', contenidoInfo);

module.exports = router;