const express = require('express');
const router = express.Router();

const { listaContendio, verificarPermisoVideo, listadoPlanes } = require('../controllers/plan.controller');
const verifyToken = require('../Middleware/verifyToken');
router.get('/listaContenido/', verifyToken, listaContendio);
router.get('/verificarPermisoVideo/:id', verificarPermisoVideo);
router.get('/listadoPlan/', listadoPlanes);

module.exports = router;
