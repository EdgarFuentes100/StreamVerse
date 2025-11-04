const Data = require('../models/genero.model');

async function listaGenero(req, res, next) {
    try {
        const datos = await Data.getGenero(); // función en el modelo que obtiene las mesas por salón
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
    listaGenero
};
