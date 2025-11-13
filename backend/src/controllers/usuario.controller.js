const Data = require('../models/usuario.model');

async function listarUsuario(req, res, next) {
    try {
        const datos = await Data.getUsuario(req.params.id);
        res.json({
            ok: true,
            message: "Perfiles cargados correctamente",
            datos
        });
    } catch (err) {
        next(err);
    }
}
module.exports = { listarUsuario };
