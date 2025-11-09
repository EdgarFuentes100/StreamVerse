const jwt = require('jsonwebtoken');
const Data = require('../models/perfil.model');

async function listaPerfil(req, res, next) {
    try {
        const datos = await Data.getPerfil(req.params.id);
        res.json({
            ok: true,
            message: "Perfiles cargados correctamente",
            datos
        });
    } catch (err) {
        next(err);
    }
}

async function firmarPerfil(req, res, next) {
    try {
        const perfil = await Data.getPerfilActivo(req.params.id); // ✅ agregado await
        if (!perfil) {
            return res.status(404).json({ message: 'Perfil no encontrado' });
        }

        const payload = {
            idUsuario: perfil.idUsuario,
            idCuenta: perfil.idCuenta,
            idPerfil: perfil.idCuentaPerfil,
            nombrePerfil: perfil.nombre
        };

        const token = jwt.sign(payload, process.env.SESSION_SECRET, { expiresIn: '1d' });

        res.json({
            ok: true,
            message: 'Perfil firmado correctamente',
            datos: {
                idPerfil: perfil.idCuentaPerfil,
                token
            }
        });
    } catch (error) {
        next(error);
    }
}

module.exports = { listaPerfil, firmarPerfil };
