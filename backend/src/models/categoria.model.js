const { localDB } = require('../config/dbConfig');

async function getCategoria() {
    const [rows] = await localDB.query(
        `select * from categoria`
    );
    return rows;
}

module.exports = {
    getCategoria
};
