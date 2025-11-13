const { localDB } = require('../config/dbConfig');

async function getUsuario(idRol) {
    const [rows] = await localDB.query(
        `SELECT * FROM usuario where idRol = ?`,
        [idRol]
    );
    return rows;
}

module.exports = { getUsuario };
