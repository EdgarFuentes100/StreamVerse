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
    WHERE c.idUsuario = ?`,
    [idUsuario]
  );
  return rows;
}

async function getPerfilActivo(idCuentaPerfil) {
  const [rows] = await localDB.query(
    `SELECT 
        c.idCuenta,
        c.idUsuario,
        p.idCuentaPerfil,
        p.nombre,
        p.avatar
     FROM cuenta c
     LEFT JOIN cuenta_perfil p ON c.idCuenta = p.idCuenta
     WHERE p.idCuentaPerfil = ?`,
    [idCuentaPerfil]
  );
  return rows[0]; // ✅ retorna un solo perfil
}

module.exports = { getPerfil, getPerfilActivo };
