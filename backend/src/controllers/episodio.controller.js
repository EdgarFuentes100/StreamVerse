const Data = require('../models/episodio.model');

async function listaEspisodios(req, res, next) {
    try {
        const datos = await Data.getEpisodio(req.params.idTemporada);
        res.json({
            ok: true,
            message: "datos cargados",
            datos
        });
    } catch (err) {
        next(err);
    }
}

async function episodioActual(req, res, next) {
    try {
        const datos = await Data.getEpisodioActual(req.params.idEpisodio);
        res.json({
            ok: true,
            message: "datos cargados",
            datos
        });
    } catch (err) {
        next(err);
    }
}

module.exports = { listaEspisodios, episodioActual };
