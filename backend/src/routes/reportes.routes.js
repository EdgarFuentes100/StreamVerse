const express = require('express');
const router = express.Router();
const { 
    listaContenidoTotal, 
    listaTotalUsuarios, 
    listaIngresoTotal, 
    listaIngresoMensual, 
    listaIngresoPlan, 
    listaCambioPlan, 
    listaPlanActual 
} = require('../controllers/reportes.controller');

// Rutas de reportes
router.get('/total-contenido', listaContenidoTotal);
router.get('/total-usuarios', listaTotalUsuarios);
router.get('/ingreso-total', listaIngresoTotal);
router.get('/ingreso-mensual', listaIngresoMensual);
router.get('/ingreso-plan', listaIngresoPlan);
router.get('/cambio-plan', listaCambioPlan);
router.get('/plan-actual', listaPlanActual);

module.exports = router;