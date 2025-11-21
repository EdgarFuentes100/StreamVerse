const express = require('express');
const router = express.Router();

const { listaFavorito, agregarLista, eliminarLista } = require('../controllers/lista.controller');
router.get('/listado/:id', listaFavorito);

router.post('/crear', agregarLista);           // Crear una nueva
router.delete('/eliminar/:id', eliminarLista); // Eliminar por ID

module.exports = router;