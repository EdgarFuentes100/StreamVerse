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

async function listaPopular(req, res, next) {
    try {
        const datos = await Data.getPopular(); // función en el modelo que obtiene las mesas por salón
        res.json({
            ok: true,
            message: "datos cargado",
            datos   // siempre usar "datos" como convención
        });
    } catch (err) {
        next(err);
    }
}

async function listaNuevo(req, res, next) {
    try {
        const datos = await Data.getNuevo(); // función en el modelo que obtiene las mesas por salón
        res.json({
            ok: true,
            message: "datos cargado",
            datos   // siempre usar "datos" como convención
        });
    } catch (err) {
        next(err);
    }
}

async function listaGrupo(req, res, next) {
    try {
        const datos = await Data.getGrupo(); // función en el modelo que obtiene las mesas por salón
        res.json({
            ok: true,
            message: "datos cargado",
            datos   // siempre usar "datos" como convención
        });
    } catch (err) {
        next(err);
    }
}

async function contenidoInfo(req, res, next) {
    try {
        const datos = await Data.getContenidoInfo(req.params.idContenido); // función en el modelo que obtiene las mesas por salón
        res.json({
            ok: true,
            message: "datos cargado",
            datos   // siempre usar "datos" como convención
        });
    } catch (err) {
        next(err);
    }
}

async function contenidoCategoria(req, res, next) {
    try {
        const datos = await Data.getContenidoCategoria(req.params.idCategoria); // función en el modelo que obtiene las mesas por salón
        res.json({
            ok: true,
            message: "datos cargado",
            datos   // siempre usar "datos" como convención
        });
    } catch (err) {
        next(err);
    }
}

// CREAR
async function crearContenido(req, res, next) {

    try {
        const resultado = await Data.crearContenidoModelo(req.body);

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
async function actualizarContenido(req, res, next) {
    try {
        const { id } = req.params;
        const resultado = await Data.actualizarContenidoModelo(id, req.body);
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
async function eliminarContenido(req, res, next) {
    try {
        const id = req.params.id;
        const resultado = await Data.eliminarContenidoModelo(id);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ ok: false, mensaje: "No encontrado", datos: null });
        }

        return res.json({ ok: true, mensaje: "Eliminado correctamente", datos: null });
        
    } catch (err) {
        next(err);
    }
}
module.exports = {
    listaContenido,
    listaPopular,
    listaNuevo,
    listaGrupo,
    contenidoInfo,
    contenidoCategoria,
    crearContenido,
    actualizarContenido,
    eliminarContenido
};
