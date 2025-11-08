const express = require('express');
const router = express.Router();

const { listaContendio } = require('../controllers/plan.controller');
router.get('/listaContenido/:id', listaContendio);

module.exports = router;
