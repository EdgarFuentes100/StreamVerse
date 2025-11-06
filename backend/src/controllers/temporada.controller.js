const Data = require('../models/temporada.model');

async function listaTemporada(req, res, next) {
    try {
        const datos = await Data.getTemporadaId(req.params.id);
        res.json({
            ok: true,
            message: "datos cargados",
            datos
        });
    } catch (err) {
        next(err);
    }
}

module.exports = { listaTemporada };
