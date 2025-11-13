const { localDB } = require('../config/dbConfig');

async function getPlanPerfil(idPerfil) {
  const [rows] = await localDB.query(
    `SELECT 
              c.*, 
              ca.nombre AS categoria,
              GROUP_CONCAT(g.nombre SEPARATOR ', ') AS generos,
              p.nombre AS nombrePlan,
              p.calidad,
              p.maxPerfil
          FROM cuenta_perfil AS cp
          INNER JOIN cuenta AS cu ON cp.idCuenta = cu.idCuenta
          INNER JOIN plan AS p ON cu.idPlan = p.idPlan
          INNER JOIN contenido_plan AS cpl ON p.idPlan = cpl.idPlan
          INNER JOIN contenido AS c ON cpl.idContenido = c.idContenido
          INNER JOIN categoria AS ca ON c.idCategoria = ca.idCategoria
          LEFT JOIN contenido_genero AS cg ON c.idContenido = cg.idContenido
          LEFT JOIN genero AS g ON cg.idGenero = g.idGenero
          WHERE cp.idCuentaPerfil = ?
          GROUP BY c.idContenido`,
    [idPerfil]
  );
  return rows;
}

async function gertPermsioVideo(idContendio) {
  const [rows] = await localDB.query(
    `SELECT * FROM contenido_plan where idContenido = ?;`,
    [idContendio]
  );
  return rows;
}

async function getPlanes() {
  const [rows] = await localDB.query(
    `SELECT * FROM plan`
  );
  return rows;
}
module.exports = { getPlanPerfil, gertPermsioVideo, getPlanes };