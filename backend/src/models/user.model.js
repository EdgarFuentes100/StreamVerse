const { localDB } = require('../config/dbConfig');

// 🔹 Buscar usuario por Google ID
async function getUserByGoogleId(googleId) {
    const [rows] = await localDB.query(
        'SELECT * FROM usuario WHERE googleId = ?',
        [googleId]
    );
    return rows[0] || null;
}

// 🔹 Crear usuario con datos de Google Y crear cuenta automáticamente
async function createUser({ googleId, name, email, avatar }) {
    try {
        // Iniciar transacción para asegurar que ambos inserts se completen
        await localDB.query('START TRANSACTION');

        // 1. Insertar usuario
        const [userResult] = await localDB.query(
            'INSERT INTO usuario (googleId, nombre, email, avatar) VALUES (?, ?, ?, ?)',
            [googleId, name, email, avatar]
        );

        const userId = userResult.insertId;

        // 2. Insertar cuenta automáticamente
        const [accountResult] = await localDB.query(
            'INSERT INTO cuenta (idUsuario, idPlan, fechaInicio, fechaFin, estado) VALUES (?, NULL, CURDATE(), NULL, "activa")',
            [userId]
        );

        // Confirmar transacción
        await localDB.query('COMMIT');

        return {
            idUsuario: userId,
            idCuenta: accountResult.insertId,
            googleId,
            name,
            email,
            avatar
        };

    } catch (error) {
        // Revertir transacción en caso de error
        await localDB.query('ROLLBACK');
        throw error;
    }
}

// 🔹 Buscar usuario por ID (para Passport)
async function getUserById(id) {
    const [rows] = await localDB.query(
        `SELECT 
            u.idUsuario, 
            u.nombre, 
            u.email, 
            u.avatar, 
            r.idRol, 
            r.rol,
            c.idCuenta
        FROM usuario u
        LEFT JOIN rol r ON u.idRol = r.idRol
        LEFT JOIN cuenta c ON u.idUsuario = c.idUsuario  -- JOIN con tabla cuenta
        WHERE u.idUsuario = ?`, [id]
    );
    return rows[0] || null;
}
module.exports = {
    getUserByGoogleId,
    createUser,
    getUserById
};
