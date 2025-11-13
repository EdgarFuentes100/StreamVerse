const express = require('express');
const router = express.Router();

const { listarRol } = require('../controllers/rol.controller');
router.get('/listadoRol/', listarRol);

module.exports = router;
