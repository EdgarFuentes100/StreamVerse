const { localDB } = require('../config/dbConfig');

async function getContenido() {
    const [rows] = await localDB.query(
        `SELECT 
            c.*, 
            ca.nombre AS categoria,
            GROUP_CONCAT(g.nombre SEPARATOR ', ') AS generos
        FROM contenido AS c
        INNER JOIN categoria AS ca 
            ON c.idCategoria = ca.idCategoria
        LEFT JOIN contenido_genero AS cg 
            ON c.idContenido = cg.idContenido
        LEFT JOIN genero AS g 
            ON cg.idGenero = g.idGenero
        GROUP BY c.idContenido;`
    );
    return rows;
}

async function getPopular() {
    const [rows] = await localDB.query(
        `SELECT c.idContenido, c.title, c.image, c.rating, ca.idCategoria, ca.nombre FROM contenido c
        left join categoria ca on c.idCategoria = ca.idCategoria
        where isPopular = 1;`);
    return rows;
}

async function getNuevo() {
    const [rows] = await localDB.query(
        `SELECT c.idContenido, c.title, c.image, c.rating, ca.idCategoria, ca.nombre FROM contenido c
        left join categoria ca on c.idCategoria = ca.idCategoria
        where isNew = 1;`);
    return rows;
}

async function getGrupo() {
    const [rows] = await localDB.query(
        `SELECT 
            idContenido, 
            title, 
            image, 
            rating, 
            idCategoria, 
            nombre
        FROM (
            SELECT 
                c.idContenido,
                c.title,
                c.image,
                c.rating,
                ca.idCategoria,
                ca.nombre,
                ROW_NUMBER() OVER (PARTITION BY ca.idCategoria ORDER BY c.idContenido ASC) AS rn
            FROM contenido c
            LEFT JOIN categoria ca ON c.idCategoria = ca.idCategoria
        ) AS sub
        WHERE rn = 1
        ORDER BY idCategoria
        LIMIT 4;`);
    return rows;
}

async function getContenidoInfo(idContendio) {
    const [rows] = await localDB.query(
        `SELECT 
            c.*, 
            ca.nombre AS categoria,
            GROUP_CONCAT(g.nombre SEPARATOR ', ') AS generos
        FROM contenido AS c
        INNER JOIN categoria AS ca 
            ON c.idCategoria = ca.idCategoria
        LEFT JOIN contenido_genero AS cg 
            ON c.idContenido = cg.idContenido
        LEFT JOIN genero AS g 
            ON cg.idGenero = g.idGenero
            WHERE c.idContenido = ?
        GROUP BY c.idContenido; `, [idContendio]);
    return rows;
}


async function getContenidoCategoria(idCategoria) {
    const [rows] = await localDB.query(
        `SELECT  idContenido, title, idCategoria FROM nextview.contenido
        where idCategoria = ?`, [idCategoria]);
    return rows;
}


async function getContenidoRecomendacion(idCuenta, idContenidoActual, esAdmin = false) {
    console.log(idCuenta, idContenidoActual, esAdmin);
    const [rows] = await localDB.query(
        `SELECT 
            c.*,
            GROUP_CONCAT(DISTINCT g.nombre) as genero,
            CASE 
                WHEN ? = true THEN 1  -- Admin: siempre disponible
                ELSE 
                    CASE 
                        WHEN EXISTS (
                            SELECT 1 FROM contenido_plan cp 
                            WHERE cp.idContenido = c.idContenido 
                            AND cp.idPlan = (SELECT idPlan FROM cuenta WHERE idCuenta = ?)
                        ) THEN 1 
                        ELSE 0 
                    END
            END as enPlan
        FROM contenido c
        INNER JOIN contenido_genero cg ON c.idContenido = cg.idContenido
        INNER JOIN genero g ON cg.idGenero = g.idGenero
        WHERE g.nombre IN (
            SELECT DISTINCT g2.nombre 
            FROM genero g2
            INNER JOIN contenido_genero cg2 ON g2.idGenero = cg2.idGenero
            WHERE cg2.idContenido = ?
        )
        AND c.idContenido != ?
        GROUP BY c.idContenido
        ORDER BY c.rating DESC
        LIMIT 12`,
        [esAdmin, idCuenta, idContenidoActual, idContenidoActual]
    );

    return rows;
}
// Crear una categoría
async function crearContenidoModelo(body) {
    const { title, image, rating, year, descripcion, duracion, temporadas, episodios,
        isNew, isPopular, isTrending, isExclusive, isFavorito, idCategoria, generos } = body;

    let connection;
    try {
        // Iniciar transacción
        connection = await localDB.getConnection();
        await connection.beginTransaction();

        // 1. Insertar el contenido principal
        const [result] = await connection.query(
            `INSERT INTO contenido 
            (title, image, rating, year, descripcion, duracion, temporadas, episodios, isNew, isPopular, 
            isTrending, isExclusive, isFavorito, idCategoria)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [title, image, rating, year, descripcion, duracion, temporadas,
                episodios, isNew, isPopular, isTrending, isExclusive, isFavorito, idCategoria]
        );

        const idContenido = result.insertId;

        // 2. Insertar los géneros en contenido_genero
        if (generos && generos.trim() !== '') {
            const generosArray = generos.split(',').map(g => g.trim());

            for (const nombreGenero of generosArray) {
                const [generoRows] = await connection.query(
                    'SELECT idGenero FROM genero WHERE nombre = ?',
                    [nombreGenero]
                );

                if (generoRows.length > 0) {
                    const idGenero = generoRows[0].idGenero;

                    await connection.query(
                        'INSERT INTO contenido_genero (idContenido, idGenero) VALUES (?, ?)',
                        [idContenido, idGenero]
                    );
                }
            }
        }

        // Confirmar transacción
        await connection.commit();

        return result; // ✅ Retorna el result original

    } catch (error) {
        // Revertir transacción en caso de error
        if (connection) {
            await connection.rollback();
        }
        console.error('Error al crear contenido:', error);
        throw error;
    } finally {
        if (connection) {
            connection.release();
        }
    }
}

// Actualizar una categoría
async function actualizarContenidoModelo(id, body) {
    const { title, image, rating, year, descripcion, duracion, temporadas, episodios,
        isNew, isPopular, isTrending, isExclusive, isFavorito, idCategoria, generos } = body;

    let connection;
    try {
        // Iniciar transacción
        connection = await localDB.getConnection();
        await connection.beginTransaction();

        // 1. Actualizar el contenido principal
        const [result] = await connection.query(
            `UPDATE contenido SET title = ?, image = ?, rating = ?, year = ?, descripcion = ?, duracion = ?, temporadas = ?,
             episodios = ?, isNew = ?, isPopular = ?, isTrending = ?, isExclusive = ?, isFavorito = ?,
              idCategoria = ? WHERE idContenido = ?`,
            [title, image, rating, year, descripcion, duracion, temporadas,
                episodios, isNew, isPopular, isTrending, isExclusive, isFavorito, idCategoria, id]
        );

        // 2. Eliminar géneros existentes
        await connection.query(
            'DELETE FROM contenido_genero WHERE idContenido = ?',
            [id]
        );

        // 3. Insertar los nuevos géneros
        if (generos && generos.trim() !== '') {
            const generosArray = generos.split(',').map(g => g.trim());

            for (const nombreGenero of generosArray) {
                const [generoRows] = await connection.query(
                    'SELECT idGenero FROM genero WHERE nombre = ?',
                    [nombreGenero]
                );

                if (generoRows.length > 0) {
                    const idGenero = generoRows[0].idGenero;

                    await connection.query(
                        'INSERT INTO contenido_genero (idContenido, idGenero) VALUES (?, ?)',
                        [id, idGenero]
                    );
                }
            }
        }

        // Confirmar transacción
        await connection.commit();

        return result; // ✅ Retorna el result original

    } catch (error) {
        // Revertir transacción en caso de error
        if (connection) {
            await connection.rollback();
        }
        console.error('Error al actualizar contenido:', error);
        throw error;
    } finally {
        if (connection) {
            connection.release();
        }
    }
}

// Eliminar una categoría
async function eliminarContenidoModelo(id) {
    let connection;
    try {
        // Iniciar transacción
        connection = await localDB.getConnection();
        await connection.beginTransaction();

        // 1. Eliminar los géneros primero (por la foreign key)
        await connection.query(
            'DELETE FROM contenido_genero WHERE idContenido = ?',
            [id]
        );

        // 2. Eliminar el contenido
        const [result] = await connection.query(
            'DELETE FROM contenido WHERE idContenido = ?',
            [id]
        );

        // Confirmar transacción
        await connection.commit();

        return result; // ✅ Retorna el result original

    } catch (error) {
        // Revertir transacción en caso de error
        if (connection) {
            await connection.rollback();
        }
        console.error('Error al eliminar contenido:', error);
        throw error;
    } finally {
        if (connection) {
            connection.release();
        }
    }
}

module.exports = {
    getContenido,
    getPopular,
    getNuevo,
    getGrupo,
    getContenidoInfo,
    getContenidoCategoria,
    crearContenidoModelo,
    actualizarContenidoModelo,
    eliminarContenidoModelo,
    getContenidoRecomendacion
};
