const Data = require('../models/categoria.model');

async function listaCategoria(req, res, next) {
    try {
        const datos = await Data.getCategoria(); // función en el modelo que obtiene las mesas por salón
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
    listaCategoria
};
