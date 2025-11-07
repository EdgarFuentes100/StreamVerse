const { localDB } = require('../config/dbConfig');

async function getPerfil(idUsuario) {
  const [rows] = await localDB.query(
    `SELECT 
        c.idCuenta,
        c.idUsuario,
        p.idCuentaPerfil,
        p.nombre,
        p.avatar
    FROM cuenta c
    LEFT JOIN cuenta_perfil p ON c.idCuenta = p.idCuenta
    where c.idUsuario = ?`,
    [idUsuario]
  );
  return rows;
}

module.exports = { getPerfil };