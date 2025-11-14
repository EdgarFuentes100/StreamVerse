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

// Crear una categoría
async function crearTemporadaModelo(body) {
  const { nombre, idContenido } = body;

  const [result] = await localDB.query(
    `INSERT INTO temporada (nombre, idContenido) VALUES (?,?)`,
    [nombre, idContenido]
  );

  return result;
}

// Actualizar una categoría
async function actualizarTemporadaModelo(id, body) {
  const { nombre, idContenido } = body;

  const [result] = await localDB.query(
    `UPDATE temporada SET nombre = ?, idContenido = ? WHERE idTemporada = ?`,
    [nombre, idContenido, id]
  );

  return result;
}

// Eliminar una categoría
async function eliminarTemporadaModelo(id) {
  const [result] = await localDB.query(
    `DELETE FROM temporada WHERE idTemporada = ?`,
    [id]
  );

  return result;
}
module.exports = { getTemporadaId, getListaTemporada, crearTemporadaModelo, actualizarTemporadaModelo, eliminarTemporadaModelo };
