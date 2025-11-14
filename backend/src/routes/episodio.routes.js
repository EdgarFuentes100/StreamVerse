const express = require('express');
const router = express.Router();

const { listaEspisodios, episodioActual, crearVideo, actualizarVideo, eliminarVideo } = require('../controllers/episodio.controller');
router.get('/listadoEpisodio/:idTemporada', listaEspisodios);
router.get('/episodioActual/:idEpisodio', episodioActual);

router.post('/crear', crearVideo);           // Crear una nueva
router.put('/editar/:id', actualizarVideo);  // Editar por ID
router.delete('/eliminar/:id', eliminarVideo); // Eliminar por ID
module.exports = router;
