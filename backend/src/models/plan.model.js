const { localDB } = require('../config/dbConfig');

async function getPlanPerfil(idPerfil) {
  const [rows] = await localDB.query(
    `SELECT 
              c.*, 
              ca.nombre AS categoria,
              GROUP_CONCAT(g.nombre SEPARATOR ', ') AS generos,
              p.nombre AS nombrePlan,
              p.calidad,
              p.maxPerfil
          FROM cuenta_perfil AS cp
          INNER JOIN cuenta AS cu ON cp.idCuenta = cu.idCuenta
          INNER JOIN plan AS p ON cu.idPlan = p.idPlan
          INNER JOIN contenido_plan AS cpl ON p.idPlan = cpl.idPlan
          INNER JOIN contenido AS c ON cpl.idContenido = c.idContenido
          INNER JOIN categoria AS ca ON c.idCategoria = ca.idCategoria
          LEFT JOIN contenido_genero AS cg ON c.idContenido = cg.idContenido
          LEFT JOIN genero AS g ON cg.idGenero = g.idGenero
          WHERE cp.idCuentaPerfil = ?
          GROUP BY c.idContenido`,
    [idPerfil]
  );
  return rows;
}

async function getPermisoVideo(idUsuario, idContenido) {
  // Verificar si es admin
  const [adminRows] = await localDB.query(
    `SELECT idRol FROM usuario WHERE idUsuario = ? AND idRol = 1`,
    [idUsuario]
  );

  // Si es admin, retornar un objeto indicando permiso
  if (adminRows.length > 0) {
    return [{ idContenido: idContenido, tienePermiso: 1 }];
  }

  // Si no es admin, verificar si está en su plan
  const [rows] = await localDB.query(
    `SELECT cp.* 
     FROM contenido_plan cp
     INNER JOIN cuenta c ON cp.idPlan = c.idPlan
     WHERE c.idUsuario = ? AND cp.idContenido = ?`,
    [idUsuario, idContenido]
  );

  return rows;
}
async function getPlanes() {
  const [rows] = await localDB.query(
    `SELECT * FROM plan`
  );
  return rows;
}

async function getPlanActual(idCuenta) {
  const [rows] = await localDB.query(
    `SELECT * FROM plan p, cuenta c 
      where p.idPlan = c.idPlan 
      and c.idCuenta = ?`, [idCuenta]
  );
  return rows;
}

// Crear una categoría
async function crearPlanModelo(body) {
  const { nombre, precio, maxPerfil, calidad, contenidoExclusivo, contenidoNuevo, sinAnuncios } = body;

  const [result] = await localDB.query(
    `INSERT INTO plan (nombre, precio, maxPerfil, calidad, contenidoExclusivo, contenidoNuevo) VALUES (?,?,?,?,?,?,?)`,
    [nombre, precio, maxPerfil, calidad, contenidoExclusivo, contenidoNuevo, sinAnuncios]
  );

  return result;
}

// Actualizar una categoría
async function actualizarPlanModelo(id, body) {
  const { nombre, precio, maxPerfil, calidad, contenidoExclusivo, contenidoNuevo, sinAnuncios } = body;

  const [result] = await localDB.query(
    `UPDATE Plan SET nombre = ?, precio = ?, maxPerfil = ?, calidad = ?, contenidoExclusivo = ?, contenidoNuevo = ?,
            sinAnuncios = ? WHERE idPlan = ?`,
    [nombre, precio, maxPerfil, calidad, contenidoExclusivo, contenidoNuevo, sinAnuncios, id]
  );

  return result;
}

// Eliminar una categoría
async function eliminarPlanModelo(id) {
  const [result] = await localDB.query(
    `DELETE FROM Plan WHERE idPlan = ?`,
    [id]
  );

  return result;
}

module.exports = { getPlanPerfil, getPermisoVideo, getPlanes, crearPlanModelo, actualizarPlanModelo, eliminarPlanModelo, getPlanActual };