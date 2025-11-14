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

// Crear una categoría
async function crearVideoModelo(body) {
    const { idTemporada, capitulo, title, image, videoUrl, duration, views } = body;

    const [result] = await localDB.query(
        `INSERT INTO episodio (idTemporada, capitulo, title, image, videoUrl, duration, views) 
         VALUES (?,?,?,?,?,?,?)`,
        [idTemporada, capitulo, title, image, videoUrl, duration, views]
    );

    return result;
}

// Actualizar una categoría
async function actualizarVideoModelo(id, body) {
    const { idTemporada, capitulo, title, image, videoUrl, duration, views } = body;

    const [result] = await localDB.query(
        `UPDATE episodio SET idTemporada = ?, capitulo = ?, title = ?, image = ?, 
        videoUrl = ?, duration = ?, views = ? WHERE idEpisodio = ?`,
        [idTemporada, capitulo, title, image, videoUrl, duration, views, id]
    );

    return result;
}

// Eliminar una categoría
async function eliminarVideoModelo(id) {
    const [result] = await localDB.query(
        `DELETE FROM episodio WHERE idEpisodio = ?`, [id]
    );

    return result;
}
module.exports = {
    getEpisodio,
    getEpisodioActual,
    crearVideoModelo,
    actualizarVideoModelo,
    eliminarVideoModelo
};
