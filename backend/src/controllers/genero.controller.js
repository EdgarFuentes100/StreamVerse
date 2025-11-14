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

// CREAR
async function crearGenero(req, res, next) {

    try {
        const resultado = await Data.crearGeneroModelo(req.body);

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
async function actualizarGenero(req, res, next) {
    try {
        const { id } = req.params;
        const resultado = await Data.actualizarGeneroModelo(id, req.body);
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
async function eliminarGenero(req, res, next) {
    try {
        const id = req.params.id;
        const resultado = await Data.eliminarGeneroModelo(id);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ ok: false, mensaje: "No encontrado", datos: null });
        }

        return res.json({ ok: true, mensaje: "Eliminado correctamente", datos: null });
        
    } catch (err) {
        next(err);
    }
}

module.exports = {
    listaGenero,
    crearGenero,
    actualizarGenero,
    eliminarGenero
};
