const { localDB } = require('../config/dbConfig');

async function getRol() {
    const [rows] = await localDB.query(
        `SELECT * FROM rol;`
    );
    return rows;
}

module.exports = { getRol };
