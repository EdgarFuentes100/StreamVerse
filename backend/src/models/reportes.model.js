const { localDB } = require('../config/dbConfig');

async function getTotalContenido() {
    const [rows] = await localDB.query(
        `SELECT 
        COUNT(*) AS total_contenido
    FROM contenido;`);
    return rows;
}

async function getTotalUsuario() {
    const [rows] = await localDB.query(
        `SELECT 
        COUNT(*) AS total_usuarios
    FROM usuario;`);
    return rows;
}

async function getIngresoTotal() {
    const [rows] = await localDB.query(
        `SELECT 
        COUNT(*) AS total_pagos_completados,
        SUM(monto) AS ingreso_total,
        AVG(monto) AS promedio_por_pago
    FROM pagos
    WHERE estado = 'Completado';`);
    return rows;
}

async function getIngresoMensual() {
    const [rows] = await localDB.query(
        `SELECT 
            YEAR(fechaPago) AS año,
            MONTH(fechaPago) AS mes,
            DATE_FORMAT(fechaPago, '%Y-%m') AS año_mes,
            COUNT(*) AS total_pagos,
            SUM(monto) AS ingresos_mensuales
        FROM pagos
        WHERE estado = 'Completado'
        GROUP BY YEAR(fechaPago), MONTH(fechaPago), DATE_FORMAT(fechaPago, '%Y-%m')
    ORDER BY año, mes;`);
    return rows;
}

/*------------------------------------------------------------ */

async function getIngresoPlan() {
    const [rows] = await localDB.query(
        `SELECT 
            p.idPlan,
            p.nombre AS nombre_plan,
            p.precio,
            COUNT(DISTINCT pg.idCuenta) AS cantidad_usuarios,
            SUM(CASE WHEN pg.estado = 'Completado' THEN pg.monto ELSE 0 END) AS ganancias_totales,
            COUNT(CASE WHEN pg.estado = 'Completado' THEN 1 END) AS pagos_completados 
        FROM plan p
        LEFT JOIN pagos pg ON p.idPlan = pg.idPlan
        GROUP BY p.idPlan, p.nombre, p.precio
        ORDER BY ganancias_totales DESC;`);
    return rows;
}

async function getCambioPlan() {
    const [rows] = await localDB.query(
        `SELECT 
            u.idUsuario,
            u.nombre AS usuario,
            u.email,
            plan_anterior.nombre AS plan_anterior,
            plan_actual.nombre AS plan_actual,
            CASE 
                WHEN plan_anterior.precio < plan_actual.precio THEN 'SUBIO'
                WHEN plan_anterior.precio > plan_actual.precio THEN 'BAJO'
                ELSE 'MISMO PLAN'
            END AS tipo_cambio,
            p_anterior.fechaPago AS fecha_ultimo_pago_anterior,
            p_actual.fechaPago AS fecha_cambio,
            DATEDIFF(p_actual.fechaPago, p_anterior.fechaPago) AS dias_desde_ultimo_cambio
        FROM usuario u
        JOIN cuenta c ON u.idUsuario = c.idUsuario
        JOIN pagos p_actual ON c.idCuenta = p_actual.idCuenta
        JOIN plan plan_actual ON p_actual.idPlan = plan_actual.idPlan
        JOIN pagos p_anterior ON c.idCuenta = p_anterior.idCuenta
        JOIN plan plan_anterior ON p_anterior.idPlan = plan_anterior.idPlan
        WHERE p_actual.estado = 'Completado'
            AND p_anterior.estado = 'Completado'
            AND p_anterior.fechaPago < p_actual.fechaPago
            AND p_anterior.idPlan != p_actual.idPlan
            AND p_anterior.fechaPago = (
                SELECT MAX(fechaPago) 
                FROM pagos 
                WHERE idCuenta = c.idCuenta 
                AND idPlan != p_actual.idPlan
                AND fechaPago < p_actual.fechaPago
                AND estado = 'Completado'
            )
            AND p_actual.fechaPago = (
                SELECT MAX(fechaPago) 
                FROM pagos 
                WHERE idCuenta = c.idCuenta 
                AND estado = 'Completado'
            )
        ORDER BY u.idUsuario;`);
    return rows;
}

/*----------------------------------*/

async function getPlanActual() {
    const [rows] = await localDB.query(
        `SELECT 
        u.idUsuario,
        u.nombre AS usuario,
        u.email,
        u.estado AS estado_usuario,
        p.nombre AS plan_actual,
        p.precio,
        p.maxPerfil,
        p.calidad,
        p.tipoPlan,
        c.fechaInicio AS fecha_contratacion,
        c.fechaFin AS fecha_vencimiento,
        c.estado AS estado_cuenta,
        DATEDIFF(c.fechaFin, CURDATE()) AS dias_restantes
    FROM usuario u
    JOIN cuenta c ON u.idUsuario = c.idUsuario
    JOIN plan p ON c.idPlan = p.idPlan
    WHERE c.fechaInicio = (
        SELECT MAX(fechaInicio) 
        FROM cuenta 
        WHERE idUsuario = u.idUsuario
    )
    ORDER BY u.idUsuario;`);
    return rows;
}

module.exports = { getTotalContenido, getTotalUsuario, getIngresoTotal, getIngresoMensual, getIngresoPlan, getCambioPlan, getPlanActual };