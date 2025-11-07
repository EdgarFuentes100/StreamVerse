const Data = require('../models/perfil.model');

async function listaPerfil(req, res, next) {
    try {
        const datos = await Data.getPerfil(req.params.id);
        res.json({
            ok: true,
            message: "datos cargados",
            datos
        });
    } catch (err) {
        next(err);
    }
}

module.exports = { listaPerfil };
