const express = require('express');
const router = express.Router();

const { listarUsuario, crearUsuario, actualizarUsuario, eliminarUsuario } = require('../controllers/usuario.controller');
router.get('/listadoUsuario/:id', listarUsuario);

router.post('/crear', crearUsuario);           // Crear una nueva
router.put('/editar/:id', actualizarUsuario);  // Editar por ID
router.delete('/eliminar/:id', eliminarUsuario); // Eliminar por ID

module.exports = router;
