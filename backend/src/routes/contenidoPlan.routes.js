const express = require('express');
const router = express.Router();

const { listaContenidoTodo, listaContenidoSolo, crearContenidoPlan, eliminarContenidoPlan, configurarAutomatico } = require('../controllers/contenidoPlan.controller');
router.get('/listadoTodo/:idPlan', listaContenidoTodo);
router.get('/listaSolo/:idPlan', listaContenidoSolo);

router.post('/asignar', crearContenidoPlan);           // ← CAMBIÉ 'crear' por 'asignar'
router.delete('/quitar/:idContenido/:idPlan', eliminarContenidoPlan); // ← CAMBIÉ 'eliminar/:id' po
router.post('/configurar-automatico/:idPlan', configurarAutomatico); // ← NUEVA RUTA

module.exports = router;