const express = require('express');
const router = express.Router();

const { consultarPago, crearPago } = require('../controllers/pagos.controller');
router.get('/pagos/:id', consultarPago);
router.post('/crear', crearPago);           // Crear una nueva

module.exports = router;