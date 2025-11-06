const { localDB } = require('../config/dbConfig');

async function getEpisodio(idTemporada) {
    const [rows] = await localDB.query(
        `select * from episodio where idTemporada = ?`, [idTemporada]
    );
    return rows;
}


async function getEpisodioActual(idEpisodio) {
    const [rows] = await localDB.query(
        `select * from episodio where idEpisodio = ?`, [idEpisodio]
    );
    return rows;
}
module.exports = {
    getEpisodio,
    getEpisodioActual
};
