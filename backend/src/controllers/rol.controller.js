const Data = require('../models/rol.model');

async function listarRol(req, res, next) {
    try {
        const datos = await Data.getRol();
        res.json({
            ok: true,
            message: "Perfiles cargados correctamente",
            datos
        });
    } catch (err) {
        next(err);
    }
}
module.exports = { listarRol };
