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

module.exports = {
    listaContenido,
    listaPopular,
    listaNuevo,
    listaGrupo,
    contenidoInfo
};
