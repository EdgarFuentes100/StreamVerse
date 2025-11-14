function ModelUsuario(
    idUsuario = 0,
    googleId = "00",
    nombre = "",
    email = "",
    avatar = "",
    estado = "activo",
    idRol = 0,
    createdAt = new Date()
) {
    return {
        idUsuario,
        googleId,
        nombre,
        email,
        avatar,
        estado,
        idRol,
        createdAt
    };
}

export { ModelUsuario };
