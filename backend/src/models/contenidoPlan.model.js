const { localDB } = require('../config/dbConfig');

// Obtener TODO el contenido marcando cuál pertenece al plan (LEFT JOIN)
async function getContenidoConAsignacion(idPlan) {
    const [rows] = await localDB.query(
        `SELECT 
            c.idContenido,
            c.title,
            c.image,
            c.rating,
            c.year,
            c.descripcion,
            c.duracion,
            c.temporadas,
            c.episodios,
            c.isNew,
            c.isPopular,
            c.isTrending,
            c.isExclusive,
            c.isFavorito,
            c.idCategoria,
            CASE 
                WHEN cp.idContenido IS NOT NULL THEN 1 
                ELSE 0 
            END as asignado
        FROM contenido c
        LEFT JOIN contenido_plan cp ON c.idContenido = cp.idContenido AND cp.idPlan = ?
        ORDER BY c.title;`,
        [idPlan]
    );
    return rows;
}

// Obtener SOLO el contenido que pertenece al plan (INNER JOIN)
async function getContenidoDelPlan(idPlan) {
    const [rows] = await localDB.query(
        `SELECT 
            c.idContenido,
            c.title,
            c.image,
            c.rating,
            c.year,
            c.descripcion,
            c.duracion,
            c.temporadas,
            c.episodios,
            c.isNew,
            c.isPopular,
            c.isTrending,
            c.isExclusive,
            c.isFavorito,
            c.idCategoria,
            1 as asignado
        FROM contenido c
        INNER JOIN contenido_plan cp ON c.idContenido = cp.idContenido
        WHERE cp.idPlan = ?
        ORDER BY c.title;`,
        [idPlan]
    );
    return rows;
}

// ASIGNAR contenido a un plan
async function asignarContenidoPlan(idContenido, idPlan) {
    const [result] = await localDB.query(
        `INSERT INTO contenido_plan (idContenido, idPlan) VALUES (?, ?)`,
        [idContenido, idPlan]
    );
    return result;
}

// QUITAR contenido de un plan
async function quitarContenidoPlan(idContenido, idPlan) {
    const [result] = await localDB.query(
        `DELETE FROM contenido_plan WHERE idContenido = ? AND idPlan = ?`,
        [idContenido, idPlan]
    );
    return result;
}

async function configurarContenidoAutomatico(idPlan) {
    try {

        // 1. Obtener configuración del plan
        const [config] = await localDB.query(
            `SELECT contenidoNuevo, contenidoExclusivo FROM plan WHERE idPlan = ?`,
            [idPlan]
        );

        if (config.length === 0) {
            return { success: false, error: "Plan no encontrado" };
        }

        const { contenidoNuevo, contenidoExclusivo } = config[0];

        // 2. Quitar contenido existente
        await localDB.query(
            `DELETE FROM contenido_plan WHERE idPlan = ?`,
            [idPlan]
        );

        // 3. Construir la consulta dinamicamente
        let sqlInsert = `
            INSERT INTO contenido_plan (idContenido, idCategoria, idPlan)
            SELECT idContenido, idCategoria, ?
            FROM contenido
        `;
        let params = [idPlan];

        if (contenidoNuevo == 0 && contenidoExclusivo == 0) {
            sqlInsert += ` WHERE isNew = 0 AND isExclusive = 0`;
        }
        else if (contenidoNuevo == 1 && contenidoExclusivo == 0) {
            sqlInsert += ` WHERE (isNew = 1 AND isExclusive = 0) OR (isNew = 0 AND isExclusive = 0)`;
        }
        else if (contenidoNuevo == 0 && contenidoExclusivo == 1) {
            sqlInsert += ` WHERE (isNew = 0 AND isExclusive = 1) OR (isNew = 0 AND isExclusive = 0)`;
        }
        // si ambos son 1 → no se agrega WHERE (todos los contenidos)

        // 4. Ejecutar inserción
        const [insertResult] = await localDB.query(sqlInsert, params);

        return {
            success: true,
            contenidosInsertados: insertResult.affectedRows,
            mensaje: `Configuración automática aplicada: ${insertResult.affectedRows} contenidos asignados`
        };

    } catch (error) {
        console.error("Error en configurarContenidoAutomatico:", error);
        return { success: false, error: error.message };
    }
}

module.exports = {
    getContenidoConAsignacion,  // LEFT JOIN - todo el contenido con estado
    getContenidoDelPlan,        // INNER JOIN - solo contenido del plan
    asignarContenidoPlan,       // ASIGNAR
    quitarContenidoPlan,
    configurarContenidoAutomatico
};