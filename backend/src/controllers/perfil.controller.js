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

// CREAR
async function crearPerfil(req, res, next) {

    try {
        const resultado = await Data.crearPerfilModelo(req.body);

        if (resultado.affectedRows === 0) {
            return res.status(400).json({ ok: false, mensaje: "No se pudo insertar", datos: null });
        }

        return res.json({
            ok: true,
            mensaje: "Insertado correctamente",
            //datos: { idRol: resultado.insertId, ...datos }
        });

    } catch (err) {
        next(err);
    }
}

module.exports = { listaPerfil, firmarPerfil, crearPerfil };
