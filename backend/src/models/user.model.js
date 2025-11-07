const { localDB } = require('../config/dbConfig');

// 🔹 Buscar usuario por Google ID
async function getUserByGoogleId(googleId) {
    const [rows] = await localDB.query(
        'SELECT * FROM usuario WHERE googleId = ?',
        [googleId]
    );
    return rows[0] || null;
}

// 🔹 Crear usuario con datos de Google
async function createUser({ googleId, name, email, avatar }) {
    const [result] = await localDB.query(
        'INSERT INTO usuario (googleId, nombre, email, avatar) VALUES (?, ?, ?, ?)',
        [googleId, name, email, avatar]
    );
    return { idUsuario: result.insertId, googleId, name, email, avatar };
}

// 🔹 Buscar usuario por ID (para Passport)
async function getUserById(id) {
    const [rows] = await localDB.query(
        `SELECT u.idUsuario, u.nombre, u.email, u.avatar, r.idRol, r.rol FROM usuario u
                LEFT JOIN rol r ON u.idRol = r.idRol
        where u.idUsuario = ?`,[id]
    );
    return rows[0] || null;
}
module.exports = {
    getUserByGoogleId,
    createUser,
    getUserById
};
