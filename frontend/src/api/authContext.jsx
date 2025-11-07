// src/api/authContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { useFetch } from "./useFetch";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const { getFetch, postFetch } = useFetch();
    const [usuario, setUsuario] = useState(null);
    const [perfil, setPerfil] = useState([]);
    const [perfilActivo, setPerfilActivo] = useState(null);

    // 🔹 Obtener usuario
    const getUsuario = () => {
        getFetch("auth/user")
            .then((data) => {
                setUsuario(data.datos || null);
                                console.log("user", data.datos);
            })
            .catch(() => setUsuario(null));
    };

    // 🔹 Obtener perfiles del usuario
    const getPerfil = (idUsuario) => {
        getFetch(`perfil/listaPerfil/${idUsuario}`)
            .then((data) => {
                setPerfil(data.datos || []);
                console.log("peerfil", data.datos);
            })
            .catch(() => setPerfil([]));
    };

    // 🔹 Crear nuevo perfil
    const crearPerfil = (idUsuario, nombrePerfil) => {
        return postFetch("perfil/crear", { idUsuario, nombrePerfil })
            .then(() => getPerfil(idUsuario));
    };

    // 🔹 Cerrar sesión
    const logout = () => {
        getFetch("auth/logout").then(() => {
            setUsuario(null);
            setPerfil([]);
            setPerfilActivo(null);
        });
    };

    // 🔹 Cargar usuario al iniciar app
    useEffect(() => {
        getUsuario();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                usuario,
                perfil,
                perfilActivo,
                setPerfilActivo,
                getUsuario,
                getPerfil,
                crearPerfil,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
