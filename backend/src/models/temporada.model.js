const { localDB } = require('../config/dbConfig');

async function getTemporadaId(idContenido) {
  console.log("ID recibido en modelo:", idContenido);
  const [rows] = await localDB.query(
    `SELECT * FROM temporada WHERE idContenido = ?`,
    [idContenido]
  );
  return rows;
}

module.exports = { getTemporadaId };
