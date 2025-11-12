// 🔹 Opciones del menú de USUARIOS
export const usuariosOptions = [
  {
    icon: "👥",
    label: "Gestionar Usuarios",
    ruta: "/admin/usuarios",
    permisos: ["admin", "superadmin"]
  },
  {
    icon: "🎭",
    label: "Roles y Permisos",
    ruta: "/admin/roles",
    permisos: ["superadmin"]
  },
  {
    icon: "👤",
    label: "Perfiles de Usuario",
    ruta: "/admin/perfiles",
    permisos: ["admin", "superadmin"]
  },
  {
    icon: "📋",
    label: "Registros de Actividad",
    ruta: "/admin/actividad",
    permisos: ["admin", "superadmin"]
  },
  {
    icon: "🛡️",
    label: "Seguridad y Accesos",
    ruta: "/admin/seguridad",
    permisos: ["superadmin"]
  }
];

// 🔹 Opciones del menú de CONTENIDO
export const contenidoOptions = [
  {
    icon: "🎬",
    label: "Agregar Contenido",
    ruta: "/Contenido",
    permisos: ["admin", "editor", "superadmin"]
  },
  {
    icon: "🎞️",
    label: "Episodios y Peliculas",
    ruta: "/Video",
    permisos: ["admin", "editor", "superadmin"]
  },
  {
    icon: "📂",
    label: "Temporada y Grupos",
    ruta: "/Temporada",
    permisos: ["admin", "superadmin"]
  },
  {
    icon: "📂",
    label: "Categorías",
    ruta: "/Categoria",
    permisos: ["admin", "superadmin"]
  },
  {
    icon: "🗂️",
    label: "Generos",
    ruta: "/Genero",
    permisos: ["admin", "superadmin"]
  },
  {
    icon: "🚫",
    label: "Contenido Reportado",
    ruta: "/admin/reportes-contenido",
    permisos: ["admin", "moderador", "superadmin"]
  }
];

// 🔹 Opciones del menú de FINANZAS
export const finanzasOptions = [
  {
    icon: "💰",
    label: "Pagos y Suscripciones",
    ruta: "/admin/pagos",
    permisos: ["admin", "finance", "superadmin"]
  },
  {
    icon: "📊",
    label: "Estadísticas Financieras",
    ruta: "/admin/estadisticas",
    permisos: ["admin", "finance", "superadmin"]
  },
  {
    icon: "🧾",
    label: "Facturación",
    ruta: "/admin/facturacion",
    permisos: ["admin", "finance", "superadmin"]
  },
  {
    icon: "💳",
    label: "Métodos de Pago",
    ruta: "/admin/metodos-pago",
    permisos: ["admin", "superadmin"]
  },
  {
    icon: "📈",
    label: "Reportes de Ingresos",
    ruta: "/admin/reportes",
    permisos: ["admin", "finance", "superadmin"]
  },
  {
    icon: "🔔",
    label: "Suscripciones Activas",
    ruta: "/admin/suscripciones",
    permisos: ["admin", "finance", "superadmin"]
  }
];

// 🔹 Opciones del menú de CONFIGURACIÓN
export const configuracionOptions = [
  {
    icon: "⚙️",
    label: "Configuración General",
    ruta: "/admin/configuracion",
    permisos: ["superadmin"]
  },
  {
    icon: "🎨",
    label: "Apariencia y Tema",
    ruta: "/admin/apariencia",
    permisos: ["admin", "superadmin"]
  },
  {
    icon: "🔔",
    label: "Notificaciones",
    ruta: "/admin/notificaciones",
    permisos: ["admin", "superadmin"]
  },
  {
    icon: "📧",
    label: "Configuración de Email",
    ruta: "/admin/email",
    permisos: ["superadmin"]
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
    key: "finanzas",
    icon: "💰",
    label: "Finanzas",
    color: "from-amber-500 to-orange-500",
    hoverColor: "hover:!shadow-amber-500/25",
    options: finanzasOptions,
    permisos: ["admin", "finance", "superadmin"]
  },
  {
    key: "configuracion",
    icon: "⚙️",
    label: "Configuración",
    color: "from-purple-500 to-pink-500",
    hoverColor: "hover:!shadow-purple-500/25",
    options: configuracionOptions,
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
  finanzasOptions,
  configuracionOptions,
  adminMenus,
  filtrarOpcionesPorPermiso,
  getMenusPorRol
};