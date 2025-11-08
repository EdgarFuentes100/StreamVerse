// src/api/authContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { useFetch } from "./useFetch";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const { getFetch, postFetch } = useFetch();
    const [usuario, setUsuario] = useState(null);
    const [perfil, setPerfil] = useState([]);
    // ✅ AHORA (carga desde localStorage)
    const [perfilActivo, setPerfilActivo] = useState(() => {
        const perfilGuardado = localStorage.getItem("perfilActivo");
        return perfilGuardado ? JSON.parse(perfilGuardado) : null;
    });
    const [contenidoPlan, setContenidoPlan] = useState([]);
    const [contenido, setContenido] = useState([]);
    const [contenidoFiltrado, setContenidoFiltrado] = useState([]);
    const [cargando, setCargando] = useState(true);

    // 🔹 Obtener usuario - CORREGIDO para retornar Promise
    const getUsuario = () => {
        return getFetch("auth/user") // ✅ Ya retorna Promise
            .then((data) => {
                setUsuario(data.datos || null);
                console.log("user", data.datos);
                return data.datos;
            })
            .catch(() => {
                setUsuario(null);
                return null;
            });
    };

    // 🔹 Obtener perfiles del usuario - EXACTAMENTE IGUAL
    const getPerfil = (idUsuario) => {
        getFetch(`perfil/listaPerfil/${idUsuario}`)
            .then((data) => {
                setPerfil(data.datos || []);
                console.log("perfil", data.datos);
            })
            .catch(() => setPerfil([]));
    };

    // 🔹 Crear nuevo perfil - EXACTAMENTE IGUAL
    const crearPerfil = (idUsuario, nombrePerfil) => {
        return postFetch("perfil/crear", { idUsuario, nombrePerfil })
            .then(() => getPerfil(idUsuario));
    };

    // 🔹 Cerrar sesión - EXACTAMENTE IGUAL
    const logout = () => {
        getFetch("auth/logout").then(() => {
            setUsuario(null);
            setPerfil([]);
            setPerfilActivo(null);
            setContenido([]);
            setContenidoPlan([]);
            setContenidoFiltrado([]);
            localStorage.removeItem("perfilActivo");
            setCargando(false);
        });
    };

    // 🔹 Contenido permitido por plan - EXACTAMENTE IGUAL
    const getContenidoPlan = (idPerfil) => {
        getFetch(`plan/listaContenido/${idPerfil}`)
            .then((data) => {
                setContenidoPlan(data.datos || []);
                console.log("contenido plan", data.datos);
            })
            .catch(() => setContenidoPlan([]));
    };

    // 🔹 Todos los contenidos - EXACTAMENTE IGUAL
    const getContenido = (idPerfil) => {
        getFetch("contenido/listado")
            .then((data) => {
                setContenido(data.datos || []);
                console.log("contenido total", data.datos);
            })
            .catch(() => setContenido([]));
    };

    // 🔹 Comparar contenido general con contenidoPlan - EXACTAMENTE IGUAL
    const combinarContenido = () => {
        if (!usuario || !contenido.length) return;

        if (usuario.idRol === 2) {
            const listaPlanIds = new Set(contenidoPlan.map(c => c.idContenido));
            const fusion = contenido.map(c => ({
                ...c,
                bloqueado: !listaPlanIds.has(c.idContenido)
            }));
            setContenidoFiltrado(fusion);
        } else {
            const sinBloqueo = contenido.map(c => ({ ...c, bloqueado: false }));
            setContenidoFiltrado(sinBloqueo);
        }
    };

    useEffect(() => {
        combinarContenido();
    }, [contenido, contenidoPlan, usuario]);

    // 🔹 Cargar usuario al iniciar app - CORREGIDO
    useEffect(() => {
        const inicializarAuth = async () => {
            try {
                await getUsuario(); // ✅ Ahora sí podemos usar await
            } catch (error) {
                console.error("Error inicializando auth:", error);
            } finally {
                setCargando(false); // ✅ Siempre dejar de cargar
            }
        };

        inicializarAuth();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                usuario,
                perfil,
                perfilActivo,
                contenido,
                contenidoPlan,
                contenidoFiltrado,
                cargando,
                setPerfilActivo,
                getUsuario,
                getPerfil,
                crearPerfil,
                logout,
                getContenido,
                getContenidoPlan
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);