const { localDB } = require('../config/dbConfig');

async function getRol() {
    const [rows] = await localDB.query(
        `SELECT * FROM rol;`
    );
    return rows;
}

// Crear una categoría
async function crearRolModelo(body) {
    const { rol } = body;

    const [result] = await localDB.query(
        `INSERT INTO rol (rol) VALUES (?)`,
        [rol]
    );

    return result;
}

// Actualizar una categoría
async function actualizarRolModelo(id, body) {
    const { rol } = body;

    const [result] = await localDB.query(
        `UPDATE rol SET rol = ? WHERE idRol = ?`,
        [rol, id]
    );

    return result;
}

// Eliminar una categoría
async function eliminarRolModelo(id) {
    const [result] = await localDB.query(
        `DELETE FROM rol WHERE idRol = ?`,
        [id]
    );

    return result;
}

module.exports = { getRol, crearRolModelo, actualizarRolModelo, eliminarRolModelo };
