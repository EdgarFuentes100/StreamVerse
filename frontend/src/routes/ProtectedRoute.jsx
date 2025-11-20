import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../api/authContext";

export const ProtectedRoute = ({ children, rolesPermitidos }) => {
  const { usuario, perfilActivo, cargando, pagoValido } = useAuth();
  const location = useLocation(); // ✅ AGREGAR ESTO

  if (cargando) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Si no hay usuario logueado → redirige a Login
  if (!usuario) {
    return <Navigate to="/Login" replace state={{ from: location }} />;
  }

  // Si hay rolesPermitidos, valida que el usuario tenga uno permitido
  if (rolesPermitidos && !rolesPermitidos.includes(usuario.idRol)) {
    return <Navigate to="/" replace />;
  }

  // ✅ LÓGICA SOLO PARA CLIENTES (ROL 2)
  if (usuario.idRol === 2) {
    // Si no tiene pago válido y no está en /Planes → redirige a Planes
    if (!pagoValido && location.pathname !== '/Planes') {
      return <Navigate to="/Planes" replace />;
    }

    // Si no tiene perfil activo y no está en /Perfil → redirige a Perfil
    if (!perfilActivo && location.pathname !== '/Perfil') {
      return <Navigate to="/Perfil" replace />;
    }

    // Si ya tiene perfil activo y está en /Perfil → redirige a Catálogo
    if (perfilActivo && location.pathname === '/Perfil') {
      return <Navigate to="/Catalogo" replace />;
    }

    // Si tiene pago válido pero intenta acceder a /Planes → redirige a Perfil o Catálogo
    if (pagoValido && location.pathname === '/Planes') {
      if (!perfilActivo) {
        return <Navigate to="/Perfil" replace />;
      } else {
        return <Navigate to="/Catalogo" replace />;
      }
    }
  }

  // ✅ ADMIN (ROL 1) Y OTROS ROLES ACCEDEN DIRECTAMENTE SIN VERIFICACIÓN DE PAGO
  return children;
};