const Data = require('../models/contenidoPlan.model');

async function listaContenidoTodo(req, res, next) {
    try {
        const datos = await Data.getContenidoConAsignacion(req.params.idPlan); // función en el modelo que obtiene las mesas por salón
        res.json({
            ok: true,
            message: "datos cargado",
            datos   // siempre usar "datos" como convención
        });
    } catch (err) {
        next(err);
    }
}

async function listaContenidoSolo(req, res, next) {
    try {
        const datos = await Data.getContenidoDelPlan(req.params.idPlan); // función en el modelo que obtiene las mesas por salón
        res.json({
            ok: true,
            message: "datos cargado",
            datos   // siempre usar "datos" como convención
        });
    } catch (err) {
        next(err);
    }
}

// CREAR - Debe recibir { idContenido, idPlan } del body
async function crearContenidoPlan(req, res, next) {
    try {
        const { idContenido, idPlan } = req.body; // ← Del body

        const resultado = await Data.asignarContenidoPlan(idContenido, idPlan);

        if (resultado.affectedRows === 0) {
            return res.status(400).json({ ok: false, mensaje: "No se pudo insertar", datos: null });
        }

        return res.json({
            ok: true,
            mensaje: "Insertado correctamente"
        });

    } catch (err) {
        next(err);
    }
}

// ELIMINAR - Debe recibir 2 parámetros de la URL
async function eliminarContenidoPlan(req, res, next) {
    try {
        const { idContenido, idPlan } = req.params; // ← De los parámetros

        const resultado = await Data.quitarContenidoPlan(idContenido, idPlan);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ ok: false, mensaje: "No encontrado", datos: null });
        }

        return res.json({ ok: true, mensaje: "Eliminado correctamente", datos: null });

    } catch (err) {
        next(err);
    }
}

async function configurarAutomatico(req, res, next) {
    try {
        const { idPlan } = req.params;

        const resultado = await Data.configurarContenidoAutomatico(idPlan);

        if (resultado.success) {
            res.json({
                ok: true,
                mensaje: resultado.mensaje,
                datos: { contenidosInsertados: resultado.contenidosInsertados }
            });
        } else {
            res.status(500).json({
                ok: false,
                mensaje: resultado.error
            });
        }

    } catch (err) {
        next(err);
    }
}

module.exports = {
    listaContenidoSolo,
    listaContenidoTodo,
    crearContenidoPlan,
    eliminarContenidoPlan,
    configurarAutomatico
};
