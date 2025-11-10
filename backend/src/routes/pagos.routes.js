const express = require('express');
const router = express.Router();

const { consultarPago } = require('../controllers/pagos.controller');
router.get('/pagos/:id', consultarPago);

module.exports = router;