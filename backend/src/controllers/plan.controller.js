const Data = require('../models/plan.model');

async function listaContendio(req, res, next) {
    try {
        const datos = await Data.getPlanPerfil(req.user.idPerfil);
        console.log(req.user.idPerfil);
        res.json({
            ok: true,
            message: "datos cargados",
            datos
        });
    } catch (err) {
        next(err);
    }
}

async function verificarPermisoVideo(req, res, next) {
    try {
        const datos = await Data.getPermisoVideo(req.params.idCuenta, req.params.idContenido);
        const existe = datos && datos.length > 0;
        // Si exite es que esta disponible para ver
        res.json({
            existe,
            message: existe ? "Contenido disponible" : "Contenido bloqueado"
        });
    } catch (err) {
        next(err);
    }
}

async function listadoPlanes(req, res, next) {
    try {
        const datos = await Data.getPlanes();
        res.json({
            ok: true,
            message: "datos cargados",
            datos
        });
    } catch (err) {
        next(err);
    }
}

// CREAR
async function crearPlan(req, res, next) {

    try {
        const resultado = await Data.crearPlanModelo(req.body);

        if (resultado.affectedRows === 0) {
            return res.status(400).json({ ok: false, mensaje: "No se pudo insertar", datos: null });
        }

        return res.json({
            ok: true,
            mensaje: "Insertado correctamente",
            //datos: { idRol: resultado.insertId, ...datos }
        });

    } catch (err) {
        next(err);
    }
}

// ACTUALIZAR
async function actualizarPlan(req, res, next) {
    try {
        const { id } = req.params;
        const resultado = await Data.actualizarPlanModelo(id, req.body);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ ok: false, mensaje: "Elemento no encontrado", datos: null });
        }

        if (resultado.changedRows === 0) {
            return res.json({ ok: true, mensaje: "No hubo cambios", datos: null });
        }

        return res.json({ ok: true, mensaje: "Actualizado correctamente", datos: null });

    } catch (err) {
        next(err);
    }
}

// ELIMINAR
async function eliminarPlan(req, res, next) {
    try {
        const id = req.params.id;
        const resultado = await Data.eliminarPlanModelo(id);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ ok: false, mensaje: "No encontrado", datos: null });
        }

        return res.json({ ok: true, mensaje: "Eliminado correctamente", datos: null });

    } catch (err) {
        next(err);
    }
}

module.exports = { listaContendio, verificarPermisoVideo, listadoPlanes, crearPlan, actualizarPlan, eliminarPlan };
