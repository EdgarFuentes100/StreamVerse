// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../api/authContext";

export const ProtectedRoute = ({ children, rolesPermitidos }) => {
  const { usuario, perfilActivo, cargando } = useAuth();

  if (cargando) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Si no hay usuario logueado → redirige a Login
  if (!usuario) {
    return <Navigate to="/Login" replace />;
  }

  // Si hay rolesPermitidos, valida que el usuario tenga uno permitido
  if (rolesPermitidos && !rolesPermitidos.includes(usuario.idRol)) {
    return <Navigate to="/" replace />;
  }

  // ✅ NUEVA LÓGICA: Rol 2 necesita perfil activo para rutas que NO sean /Perfil
  if (usuario.idRol === 2 && !perfilActivo && window.location.pathname !== '/Perfil') {
    return <Navigate to="/Perfil" replace />;
  }

  return children;
};