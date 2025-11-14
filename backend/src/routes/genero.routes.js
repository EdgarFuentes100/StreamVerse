const express = require('express');
const router = express.Router();

const { listaGenero, crearGenero, actualizarGenero, eliminarGenero } = require('../controllers/genero.controller');
router.get('/listado', listaGenero);

router.post('/crear', crearGenero);           // Crear una nueva
router.put('/editar/:id', actualizarGenero);  // Editar por ID
router.delete('/eliminar/:id', eliminarGenero); // Eliminar por ID

module.exports = router;