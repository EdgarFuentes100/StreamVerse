const Data = require('../models/contenido.model');

async function listaContenido(req, res, next) {
    try {
        const datos = await Data.getContenido(); // función en el modelo que obtiene las mesas por salón
        res.json({
            ok: true,
            message: "datos cargado",
            datos   // siempre usar "datos" como convención
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    listaContenido
};
