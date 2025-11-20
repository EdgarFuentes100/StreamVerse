const express = require('express');
const router = express.Router();

const { listaContendio, verificarPermisoVideo, listadoPlanes, crearPlan, actualizarPlan, eliminarPlan } = require('../controllers/plan.controller');
const verifyToken = require('../Middleware/verifyToken');
router.get('/listaContenido/', verifyToken, listaContendio);
router.get('/verificarPermisoVideo/:idCuenta/:idContenido', verificarPermisoVideo);
router.get('/listadoPlan/', listadoPlanes);

router.post('/crear', crearPlan);           // Crear una nueva
router.put('/editar/:id', actualizarPlan);  // Editar por ID
router.delete('/eliminar/:id', eliminarPlan); // Eliminar por ID

module.exports = router;
