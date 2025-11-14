const Data = require('../models/categoria.model');

// LISTAR
async function listaCategoria(req, res, next) {
    try {
        const datos = await Data.getCategoria();
        res.json({
            ok: true,
            message: "Datos cargados",
            datos
        });
    } catch (err) {
        next(err);
    }
}

// CREAR
async function crearCategoria(req, res, next) {

    try {
        const resultado = await Data.crearCategoriaModelo(req.body);

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
async function actualizarCategoria(req, res, next) {
    try {
        const { id } = req.params;
        const resultado = await Data.actualizarCategoriaModelo(id, req.body);
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
async function eliminarCategoria(req, res, next) {
    try {
        const id = req.params.id;
        const resultado = await Data.eliminarCategoriaModelo(id);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ ok: false, mensaje: "No encontrado", datos: null });
        }

        return res.json({ ok: true, mensaje: "Eliminado correctamente", datos: null });
        
    } catch (err) {
        next(err);
    }
}

module.exports = {
    listaCategoria,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
};
