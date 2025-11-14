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

async function listaTemporadas(req, res, next) {
    try {
        const datos = await Data.getListaTemporada();
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
async function crearTemporada(req, res, next) {

    try {
        const resultado = await Data.crearTemporadaModelo(req.body);

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
async function actualizarTemporada(req, res, next) {
    try {
        const { id } = req.params;
        const resultado = await Data.actualizarTemporadaModelo(id, req.body);
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
async function eliminarTemporada(req, res, next) {
    try {
        const id = req.params.id;
        const resultado = await Data.eliminarTemporadaModelo(id);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ ok: false, mensaje: "No encontrado", datos: null });
        }

        return res.json({ ok: true, mensaje: "Eliminado correctamente", datos: null });

    } catch (err) {
        next(err);
    }
}

module.exports = { listaTemporada, listaTemporadas, crearTemporada, actualizarTemporada, eliminarTemporada };
