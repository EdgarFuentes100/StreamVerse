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

async function getPopular() {
    const [rows] = await localDB.query(
        `SELECT c.idContenido, c.title, c.image, c.rating, ca.idCategoria, ca.nombre FROM contenido c
        left join categoria ca on c.idCategoria = ca.idCategoria
        where isPopular = 1;`);
    return rows;
}

async function getNuevo() {
    const [rows] = await localDB.query(
        `SELECT c.idContenido, c.title, c.image, c.rating, ca.idCategoria, ca.nombre FROM contenido c
        left join categoria ca on c.idCategoria = ca.idCategoria
        where isNew = 1;`);
    return rows;
}

async function getGrupo() {
    const [rows] = await localDB.query(
        `SELECT 
            idContenido, 
            title, 
            image, 
            rating, 
            idCategoria, 
            nombre
        FROM (
            SELECT 
                c.idContenido,
                c.title,
                c.image,
                c.rating,
                ca.idCategoria,
                ca.nombre,
                ROW_NUMBER() OVER (PARTITION BY ca.idCategoria ORDER BY c.idContenido ASC) AS rn
            FROM contenido c
            LEFT JOIN categoria ca ON c.idCategoria = ca.idCategoria
        ) AS sub
        WHERE rn = 1
        ORDER BY idCategoria
        LIMIT 4;`);
    return rows;
}

async function getContenidoInfo(idContendio) {
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
            WHERE c.idContenido = ?
        GROUP BY c.idContenido; `, [idContendio]);
    return rows;
}


async function getContenidoCategoria(idCategoria) {
    const [rows] = await localDB.query(
        `SELECT  idContenido, title, idCategoria FROM nextview.contenido
        where idCategoria = ?`, [idCategoria]);
    return rows;
}


module.exports = {
    getContenido,
    getPopular,
    getNuevo,
    getGrupo,
    getContenidoInfo,
    getContenidoCategoria
};
