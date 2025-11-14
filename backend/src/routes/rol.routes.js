const express = require('express');
const router = express.Router();

const { listarRol, crearRol, actualizarRol, eliminarRol } = require('../controllers/rol.controller');
router.get('/listadoRol/', listarRol);

router.post('/crear', crearRol);           // Crear una nueva
router.put('/editar/:id', actualizarRol);  // Editar por ID
router.delete('/eliminar/:id', eliminarRol); // Eliminar por ID

module.exports = router;
