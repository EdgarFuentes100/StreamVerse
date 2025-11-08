const Data = require('../models/plan.model');

async function listaContendio(req, res, next) {
    try {
        const datos = await Data.getPlanPerfil(req.params.id);
        res.json({
            ok: true,
            message: "datos cargados",
            datos
        });
    } catch (err) {
        next(err);
    }
}

module.exports = { listaContendio };
