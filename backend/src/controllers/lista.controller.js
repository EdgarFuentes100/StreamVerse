const Data = require('../models/lista.model');

async function listaFavorito(req, res, next) {
    try {
        const datos = await Data.getLista(req.params.id); // función en el modelo que obtiene las mesas por salón
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
async function agregarLista(req, res, next) {

    try {
        const resultado = await Data.agregarListaModelo(req.body);

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


// ELIMINAR
async function eliminarLista(req, res, next) {
    try {
        const id = req.params.id;
        const resultado = await Data.eliminarListaModelo(id);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ ok: false, mensaje: "No encontrado", datos: null });
        }

        return res.json({ ok: true, mensaje: "Eliminado correctamente", datos: null });

    } catch (err) {
        next(err);
    }
}

module.exports = {
    listaFavorito,
    agregarLista,
    eliminarLista
};
