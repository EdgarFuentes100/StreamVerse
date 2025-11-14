const express = require('express');
const router = express.Router();

const {listaCategoria,crearCategoria,actualizarCategoria,eliminarCategoria} = require('../controllers/categoria.controller');

router.get('/listado', listaCategoria);          // Obtener todas
router.post('/crear', crearCategoria);           // Crear una nueva
router.put('/editar/:id', actualizarCategoria);  // Editar por ID
router.delete('/eliminar/:id', eliminarCategoria); // Eliminar por ID

module.exports = router;
