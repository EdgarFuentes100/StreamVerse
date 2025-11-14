const Data = require('../models/episodio.model');

async function listaEspisodios(req, res, next) {
    try {
        const datos = await Data.getEpisodio(req.params.idTemporada);
        res.json({
            ok: true,
            message: "datos cargados",
            datos
        });
    } catch (err) {
        next(err);
    }
}

async function episodioActual(req, res, next) {
    try {
        const datos = await Data.getEpisodioActual(req.params.idEpisodio);
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
async function crearVideo(req, res, next) {

    try {
        const resultado = await Data.crearVideoModelo(req.body);

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
async function actualizarVideo(req, res, next) {
    try {
        const { id } = req.params;
        const resultado = await Data.actualizarVideoModelo(id, req.body);
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
async function eliminarVideo(req, res, next) {
    try {
        const id = req.params.id;
        const resultado = await Data.eliminarVideoModelo(id);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ ok: false, mensaje: "No encontrado", datos: null });
        }

        return res.json({ ok: true, mensaje: "Eliminado correctamente", datos: null });

    } catch (err) {
        next(err);
    }
}
module.exports = { listaEspisodios, episodioActual, crearVideo, actualizarVideo, eliminarVideo };
