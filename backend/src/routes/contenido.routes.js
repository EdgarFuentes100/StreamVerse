const express = require('express');
const router = express.Router();

const { listaContenido, listaPopular, listaNuevo, listaGrupo, contenidoInfo, contenidoCategoria, crearContenido, actualizarContenido, eliminarContenido, getRecomendaciones } = require('../controllers/contenido.controller');
router.get('/listado', listaContenido);
router.get('/listadoPopular', listaPopular);
router.get('/listadoNuevo', listaNuevo);
router.get('/listadoGrupo', listaGrupo);
router.get('/contenidoInfo/:idContenido', contenidoInfo);
router.get('/contenidoCategoria/:idCategoria', contenidoCategoria);
router.get('/recomendaciones/:idCuenta/:idContenido/:esAdmin', getRecomendaciones);

router.post('/crear', crearContenido);           // Crear una nueva
router.put('/editar/:id', actualizarContenido);  // Editar por ID
router.delete('/eliminar/:id', eliminarContenido); // Eliminar por ID

module.exports = router;