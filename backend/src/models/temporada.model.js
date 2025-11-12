const { localDB } = require('../config/dbConfig');

async function getTemporadaId(idContenido) {
  const [rows] = await localDB.query(
    `SELECT * FROM temporada WHERE idContenido = ?`,
    [idContenido]
  );
  return rows;
}

async function getListaTemporada() {
  const [rows] = await localDB.query(
    `SELECT t.idTemporada, t.nombre, t.idContenido, c.title 
    FROM temporada t
    INNER JOIN contenido c ON c.idContenido = t.idContenido;`,
  );
  return rows;
}

module.exports = { getTemporadaId, getListaTemporada };
