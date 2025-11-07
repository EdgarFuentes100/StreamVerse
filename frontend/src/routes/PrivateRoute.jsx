// src/routes/PrivateRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../api/authContext";

export const PrivateRoute = ({ children, requirePerfil = false }) => {
    const { usuario, perfil } = useAuth();
    const location = useLocation();

    // 🔒 No autenticado → redirige al login
    if (!usuario) return <Navigate to="/Login" replace />;

    // 👑 Admin → acceso total sin importar perfil
    if (usuario.idRol === 1) return children;

    // 👤 Participante sin perfil activo → redirige a /Perfil
    if (requirePerfil && !perfil && location.pathname !== "/Perfil") {
        return <Navigate to="/Perfil" replace />;
    }

    // ✅ Autenticado (y con perfil si se requiere)
    return children;
};
