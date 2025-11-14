const express = require('express');
const router = express.Router();

const { listaTemporada, listaTemporadas, crearTemporada, actualizarTemporada, eliminarTemporada } = require('../controllers/temporada.controller');
router.get('/listadoTemporada/:id', listaTemporada);
router.get('/listadoTemporada', listaTemporadas);

router.post('/crear', crearTemporada);           // Crear una nueva
router.put('/editar/:id', actualizarTemporada);  // Editar por ID
router.delete('/eliminar/:id', eliminarTemporada); // Eliminar por ID

module.exports = router;
