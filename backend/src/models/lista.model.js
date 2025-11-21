const { localDB } = require('../config/dbConfig');

async function getLista(idCuentaPerfil) {
    const [rows] = await localDB.query(
        `SELECT 
            m.idMiLista,
            m.idCuentaPerfil,
            m.idContenido,
            m.fechaAgregado,
            c.*,
            
            -- Verificar si el contenido está en el plan
            pc.idContenido as contenido_en_plan,
            
            -- Estado de disponibilidad
            CASE 
                WHEN pc.idContenido IS NOT NULL THEN 'DISPONIBLE'
                ELSE 'NO_DISPONIBLE'
            END as estado_acceso,
            
            -- Booleano simple para el frontend
            CASE 
                WHEN pc.idContenido IS NOT NULL THEN 1
                ELSE 0
            END as disponible

        FROM mi_lista m
        INNER JOIN contenido c ON m.idContenido = c.idContenido
        INNER JOIN cuenta_perfil cp ON m.idCuentaPerfil = cp.idCuentaPerfil
        INNER JOIN cuenta cu ON cp.idCuenta = cu.idCuenta
        INNER JOIN plan p ON cu.idPlan = p.idPlan
        LEFT JOIN contenido_plan pc ON p.idPlan = pc.idPlan AND c.idContenido = pc.idContenido
        WHERE m.idCuentaPerfil = ?
        ORDER BY m.fechaAgregado DESC`,
        [idCuentaPerfil]
    );
    return rows;
}

// Crear una categoría
async function agregarListaModelo(body) {
    const { idCuentaPerfil, idContenido } = body;

    const [result] = await localDB.query(
        `INSERT INTO mi_lista (idCuentaPerfil, idContenido) VALUES (?,?)`,
        [idCuentaPerfil, idContenido]
    );

    return result;
}


// Eliminar una categoría
async function eliminarListaModelo(id) {
    const [result] = await localDB.query(
        `DELETE FROM mi_lista WHERE idMiLista = ?`,
        [id]
    );

    return result;
}

module.exports = {
    getLista,
    agregarListaModelo,
    eliminarListaModelo
};
