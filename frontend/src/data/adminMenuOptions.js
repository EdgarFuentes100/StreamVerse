// 🔹 Opciones del menú de USUARIOS
export const usuariosOptions = [
  {
    icon: "👥",
    label: "Gestionar Usuarios",
    ruta: "/Usuario",
    permisos: ["admin", "superadmin"]
  },
  {
    icon: "🎭",
    label: "Roles y Permisos",
    ruta: "/Rol",
    permisos: ["superadmin"]
  }
];

export const contenidoOptions = [
  {
    icon: "🎬",
    label: "Agregar Contenido",
    ruta: "/Contenido",
    permisos: ["admin", "editor", "superadmin"]
  },
  {
    icon: "🎞️",
    label: "Episodios y Películas",
    ruta: "/Video",
    permisos: ["admin", "editor", "superadmin"]
  },
  {
    icon: "📺",
    label: "Temporadas y Grupos",
    ruta: "/Temporada",
    permisos: ["admin", "superadmin"]
  },
  {
    icon: "🏷️",
    label: "Categorías",
    ruta: "/Categoria",
    permisos: ["admin", "superadmin"]
  },
  {
    icon: "🎭",
    label: "Géneros",
    ruta: "/Genero",
    permisos: ["admin", "superadmin"]
  },
  {
    icon: "💳",
    label: "Planes",
    ruta: "/Plan",
    permisos: ["admin", "moderador", "superadmin"]
  }
];

export const reportesOptions = [
  {
    icon: "📊",
    label: "Resumen General",
    ruta: "/reportes/resumen",
    permisos: ["admin", "superadmin"]
  },
  {
    icon: "💳",
    label: "Reporte de Planes",
    ruta: "/reportes/planes",
    permisos: ["admin", "superadmin"]
  },
  {
    icon: "👥",
    label: "Reporte de Usuarios",
    ruta: "/reportes/usuarios",
    permisos: ["admin", "superadmin"]
  },
  {
    icon: "💰",
    label: "Reporte de Ingresos",
    ruta: "/reportes/ingresos",
    permisos: ["superadmin"]
  },
  {
    icon: "🎬",
    label: "Reporte de Contenido",
    ruta: "/reportes/contenido",
    permisos: ["admin", "superadmin"]
  }
];

// 🔹 Menús principales de administración
export const adminMenus = [
  {
    key: "usuarios",
    icon: "👥",
    label: "Usuarios",
    color: "from-green-500 to-emerald-500",
    hoverColor: "hover:!shadow-green-500/25",
    options: usuariosOptions,
    permisos: ["admin", "superadmin"]
  },
  {
    key: "contenido",
    icon: "🎬",
    label: "Contenido",
    color: "from-blue-500 to-cyan-500",
    hoverColor: "hover:!shadow-blue-500/25",
    options: contenidoOptions,
    permisos: ["admin", "editor", "moderador", "superadmin"]
  },
  {
    key: "reportes",
    icon: "📈",
    label: "Reportes",
    color: "from-purple-500 to-pink-500",
    hoverColor: "hover:!shadow-purple-500/25",
    options: reportesOptions,
    permisos: ["admin", "superadmin"]
  }
];

// 🔹 Función para filtrar opciones por permisos (opcional)
export const filtrarOpcionesPorPermiso = (opciones, rolUsuario) => {
  return opciones.filter(opcion =>
    !opcion.permisos || opcion.permisos.includes(rolUsuario)
  );
};

// 🔹 Función para obtener todos los menús disponibles para un rol
export const getMenusPorRol = (rolUsuario) => {
  return adminMenus.filter(menu =>
    !menu.permisos || menu.permisos.includes(rolUsuario)
  ).map(menu => ({
    ...menu,
    options: filtrarOpcionesPorPermiso(menu.options, rolUsuario)
  }));
};

// 🔹 Exportación por defecto de todos los menús
export default {
  usuariosOptions,
  contenidoOptions,
  reportesOptions,
  adminMenus,
  filtrarOpcionesPorPermiso,
  getMenusPorRol
};