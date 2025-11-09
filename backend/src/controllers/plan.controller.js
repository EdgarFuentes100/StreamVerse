const Data = require('../models/plan.model');

async function listaContendio(req, res, next) {
    try {
                console.log("ID perfil desde token:", req.user.idPerfil); // ✅ verifica que venga bien

        const datos = await Data.getPlanPerfil(req.user.idPerfil);
        console.log(req.user.idPerfil);
        res.json({
            ok: true,
            message: "datos cargados",
            datos
        });
    } catch (err) {
        next(err);
    }
}

async function verificarPermisoVideo(req, res, next) {
    try {
        const datos = await Data.gertPermsioVideo(req.params.id);
        const existe = datos && datos.length > 0;
        // Si exite es que esta disponible para ver
        res.json({
            existe, 
            message: existe ? "Contenido disponible" : "Contenido bloqueado"
        });
    } catch (err) {
        next(err);
    }
}

module.exports = { listaContendio, verificarPermisoVideo };
