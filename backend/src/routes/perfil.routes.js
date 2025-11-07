const express = require('express');
const router = express.Router();

const { listaPerfil } = require('../controllers/perfil.controller');
router.get('/listaPerfil/:id', listaPerfil);

module.exports = router;
