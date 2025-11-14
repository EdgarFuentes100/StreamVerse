const { localDB } = require('../config/dbConfig');

// Obtener todas las categorías
async function getCategoria() {
    const [rows] = await localDB.query(`SELECT * FROM categoria`);
    return rows;
}

// Crear una categoría
async function crearCategoriaModelo(body) {
    const { nombre, icon, cantidad } = body;

    const [result] = await localDB.query(
        `INSERT INTO categoria (nombre, icon, cantidad) VALUES (?, ?, ?)`,
        [nombre, icon, cantidad]
    );

    return result;
}

// Actualizar una categoría
async function actualizarCategoriaModelo(id, body) {
    const { nombre, icon, cantidad } = body;

    const [result] = await localDB.query(
        `UPDATE categoria SET nombre = ?, icon = ?, cantidad = ? WHERE idCategoria = ?`,
        [nombre, icon, cantidad, id]
    );

    return result;
}

// Eliminar una categoría
async function eliminarCategoriaModelo(id) {
    const [result] = await localDB.query(
        `DELETE FROM categoria WHERE idCategoria = ?`,
        [id]
    );

    return result;
}

module.exports = {
    getCategoria,
    crearCategoriaModelo,
    actualizarCategoriaModelo,
    eliminarCategoriaModelo
};
