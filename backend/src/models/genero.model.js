const { localDB } = require('../config/dbConfig');

async function getGenero() {
    const [rows] = await localDB.query(
        `select * from genero`
    );
    return rows;
}

module.exports = {
    getGenero
};
