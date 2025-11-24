const Data = require('../models/reportes.model');

// Total de contenido
async function listaContenidoTotal(req, res, next) {
    try {
        const datos = await Data.getTotalContenido();
        res.json({
            ok: true,
            message: "Datos de contenido cargados",
            datos
        });
    } catch (err) {
        next(err);
    }
}

// Total de usuarios
async function listaTotalUsuarios(req, res, next) {
    try {
        const datos = await Data.getTotalUsuario();
        res.json({
            ok: true,
            message: "Datos de usuarios cargados",
            datos
        });
    } catch (err) {
        next(err);
    }
}

// Ingreso total
async function listaIngresoTotal(req, res, next) {
    try {
        const datos = await Data.getIngresoTotal();
        res.json({
            ok: true,
            message: "Datos de ingresos totales cargados",
            datos
        });
    } catch (err) {
        next(err);
    }
}

// Ingreso mensual
async function listaIngresoMensual(req, res, next) {
    try {
        const datos = await Data.getIngresoMensual();
        res.json({
            ok: true,
            message: "Datos de ingresos mensuales cargados",
            datos
        });
    } catch (err) {
        next(err);
    }
}

// Ingreso por plan
async function listaIngresoPlan(req, res, next) {
    try {
        const datos = await Data.getIngresoPlan();
        res.json({
            ok: true,
            message: "Datos de ingresos por plan cargados",
            datos
        });
    } catch (err) {
        next(err);
    }
}

// Cambios de plan
async function listaCambioPlan(req, res, next) {
    try {
        const datos = await Data.getCambioPlan();
        res.json({
            ok: true,
            message: "Datos de cambios de plan cargados",
            datos
        });
    } catch (err) {
        next(err);
    }
}

// Plan actual de usuarios
async function listaPlanActual(req, res, next) {
    try {
        const datos = await Data.getPlanActual();
        res.json({
            ok: true,
            message: "Datos de planes actuales cargados",
            total: datos.length,
            datos
        });
    } catch (err) {
        next(err);
    }
}

module.exports = { 
    listaContenidoTotal, 
    listaTotalUsuarios, 
    listaIngresoTotal, 
    listaIngresoMensual, 
    listaIngresoPlan, 
    listaCambioPlan, 
    listaPlanActual 
};