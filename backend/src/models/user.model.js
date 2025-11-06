const { localDB } = require('../config/dbConfig');

async function getUserByGoogleId(googleId) {
    const [rows] = await localDB.query('SELECT * FROM usuario WHERE googleId = ?', [googleId]);
    return rows[0] || null;
}

async function createUser({ googleId, name, email, avatar }) {
    const [result] = await localDB.query(
        'INSERT INTO usuario (googleId, nombre, email, avatar) VALUES (?, ?, ?, ?)',
        [googleId, name, email, avatar]
    );
    return { id: result.insertId, googleId, name, email, avatar };
}

module.exports = { getUserByGoogleId, createUser };
