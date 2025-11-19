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

async function crearPerfilModelo(body) {
  const { idCuenta, nombre, avatar } = body;

  const [perfilesActuales] = await localDB.query(
    `SELECT COUNT(*) as totalPerfiles FROM cuenta_perfil WHERE idCuenta = ?`,
    [idCuenta]
  );

  const [planInfo] = await localDB.query(
    `SELECT p.maxPerfil 
     FROM cuenta c 
     JOIN plan p ON c.idPlan = p.idPlan 
     WHERE c.idCuenta = ?`,
    [idCuenta]
  );

  const totalPerfiles = perfilesActuales[0]?.totalPerfiles || 0;
  const maxPerfilesPermitidos = planInfo[0]?.maxPerfil || 1;

  if (totalPerfiles >= maxPerfilesPermitidos) {
    return null;
  }

  const [result] = await localDB.query(
    `INSERT INTO cuenta_perfil (idCuenta, nombre, avatar) VALUES (?,?,?)`,
    [idCuenta, nombre, avatar]
  );

  return result;
}
module.exports = { getPerfil, getPerfilActivo, crearPerfilModelo };
