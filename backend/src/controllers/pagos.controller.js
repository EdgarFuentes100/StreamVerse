const Data = require('../models/pagos.model');

async function consultarPago(req, res, next) {
    try {
        const datos = await Data.getPago(req.params.id);
        res.json({
            ok: true,
            message: "Exito",
            datos
        });
    } catch (err) {
        next(err);
    }
}

module.exports = { consultarPago };
