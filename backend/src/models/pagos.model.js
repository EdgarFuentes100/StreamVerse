const { localDB } = require('../config/dbConfig');

async function getPago(idUsuario) {
    const [rows] = await localDB.query(
        `SELECT 
            c.idCuenta,
            c.idUsuario,
            pl.nombre AS nombrePlan,
            pl.maxPerfil,
            pl.precio,
            CASE 
                WHEN EXISTS (
                    SELECT 1 
                    FROM pagos pg 
                    WHERE pg.idCuenta = c.idCuenta
                    AND pg.estado = 'Completado'
                    AND DATE_FORMAT(pg.fechaPago, '%Y-%m') = DATE_FORMAT(CURDATE(), '%Y-%m')
                ) THEN 1 
                ELSE 0 
            END AS yaPago
        FROM cuenta c
        JOIN plan pl ON c.idPlan = pl.idPlan
        WHERE c.idUsuario =?`, [idUsuario]);
    return rows;
}


async function crearPagoModelo(body) {
    console.log("si llego", body);
    const { idCuenta, idPlan, monto, fechaPago, periodoInicio, periodoFin, estado, metodoPago, referencia, detalles } = body;

    // ✅ Convertir fecha ISO a formato MySQL
    const fechaPagoMySQL = new Date(fechaPago).toISOString().slice(0, 19).replace('T', ' ');

    const [result] = await localDB.query(
        `INSERT INTO pagos (idCuenta, idPlan, monto, fechaPago, periodoInicio, periodoFin, estado, metodoPago, referencia, detalles) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [idCuenta, idPlan, monto, fechaPagoMySQL, periodoInicio, periodoFin, estado, metodoPago, referencia, detalles]
    );

    return result;
}

module.exports = {
    getPago, crearPagoModelo
};

