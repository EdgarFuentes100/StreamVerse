const { localDB } = require('../config/dbConfig');

async function getUsuario(idRol) {
    const [rows] = await localDB.query(
        `SELECT * FROM usuario where idRol = ?`,
        [idRol]
    );
    return rows;
}

// Crear una categoría
async function crearUsuarioModelo(body) {
    const { googleId, nombre, email, avatar, estado, idRol } = body;

    const [result] = await localDB.query(
        `INSERT INTO usuario (googleId, nombre, email, avatar, estado, idRol) VALUES (?,?,?,?,?,?)`,
        [ googleId, nombre, email, avatar, estado, idRol]
    );

    return result;
}

// Actualizar una categoría
async function actualizarUsuarioModelo(id, body) {
    const { nombre, email, avatar, estado, idRol } = body;

    const [result] = await localDB.query(
        `UPDATE usuario SET nombre = ?, email = ?, avatar = ?, estado = ?, idRol = ? WHERE idUsuario = ?`,
        [nombre, email, avatar, estado, idRol, id]
    );

    return result;
}

// Eliminar una categoría
async function eliminarUsuarioModelo(id) {
    const [result] = await localDB.query(
        `DELETE FROM usuario WHERE idUsuario = ?`,
        [id]
    );

    return result;
}

module.exports = { getUsuario, crearUsuarioModelo, actualizarUsuarioModelo, eliminarUsuarioModelo };
