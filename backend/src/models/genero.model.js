const { localDB } = require('../config/dbConfig');

async function getGenero() {
    const [rows] = await localDB.query(
        `select * from genero`
    );
    return rows;
}

// Crear una categoría
async function crearGeneroModelo(body) {
    const { nombre } = body;

    const [result] = await localDB.query(
        `INSERT INTO genero (nombre) VALUES (?)`,
        [nombre]
    );

    return result;
}

// Actualizar una categoría
async function actualizarGeneroModelo(id, body) {
    const { nombre } = body;

    const [result] = await localDB.query(
        `UPDATE genero SET nombre = ? WHERE idGenero = ?`,
        [nombre, id]
    );

    return result;
}

// Eliminar una categoría
async function eliminarGeneroModelo(id) {
    const [result] = await localDB.query(
        `DELETE FROM genero WHERE idGenero = ?`,
        [id]
    );

    return result;
}

module.exports = {
    getGenero,
    crearGeneroModelo,
    actualizarGeneroModelo,
    eliminarGeneroModelo
};
