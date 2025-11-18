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

// CREAR
async function crearPago(req, res, next) {

    try {
        const resultado = await Data.crearPagoModelo(req.body);

        if (resultado.affectedRows === 0) {
            return res.status(400).json({ ok: false, mensaje: "No se pudo insertar", datos: null });
        }

        return res.json({
            ok: true,
            mensaje: "Pago realizado con exito",
            //datos: { idRol: resultado.insertId, ...datos }
        });

    } catch (err) {
        next(err);
    }
}


module.exports = { consultarPago, crearPago };
