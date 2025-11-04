const { localDB } = require('../config/dbConfig');

async function getContenido() {
    const [rows] = await localDB.query(
        `SELECT 
            c.*, 
            ca.nombre AS categoria,
            GROUP_CONCAT(g.nombre SEPARATOR ', ') AS generos
        FROM contenido AS c
        INNER JOIN categoria AS ca 
            ON c.idCategoria = ca.idCategoria
        LEFT JOIN contenido_genero AS cg 
            ON c.idContenido = cg.idContenido
        LEFT JOIN genero AS g 
            ON cg.idGenero = g.idGenero
        GROUP BY c.idContenido;`
            );
    return rows;
}

module.exports = {
    getContenido
};
