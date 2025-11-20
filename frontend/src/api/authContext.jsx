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

    // ✅ SOLO AGREGAR ESTOS DOS ESTADOS
    const [pagoValido, setPagoValido] = useState(false);
    const [maxPerfiles, setMaxPerfiles] = useState(1);

    // ✅ SOLO AGREGAR ESTA FUNCIÓN
    const getPagos = (idUsuario) => {
        return getFetch(`pagos/pagos/${idUsuario}`)
            .then(data => data.datos || [])
            .catch((error) => {
                console.error("Error en getPagos:", error);
                return [];
            });
    };

    // ✅ SOLO AGREGAR ESTA FUNCIÓN
    const verificarPago = async (idUsuario) => {
        if (!idUsuario) {
            console.log("No hay usuario para verificar pago");
            return false;
        }

        try {
            const data = await getPagos(idUsuario);
            const infoPago = data?.[0];

            console.log("Pago detectado:", infoPago);

            if (infoPago?.yaPago === 1) {
                setPagoValido(true);
                setMaxPerfiles(infoPago.maxPerfil || 1);
                return true;
            } else {
                setPagoValido(false);
                setMaxPerfiles(1);
                return false;
            }
        } catch (error) {
            console.error("Error verificando pago:", error);
            setPagoValido(false);
            setMaxPerfiles(1);
            return false;
        }
    };

    // 🔹 Obtener usuario - EXACTAMENTE IGUAL
    const getUsuario = () => {
        return getFetch("auth/user")
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

    // 🔹 Obtener perfiles del usuario - EXACTAMENTE IGUAL
    const getPerfilActivo = (idCuentaPerfil) => {
        return getFetch(`perfil/firmarPerfil/${idCuentaPerfil}`)
            .then((data) => {
                if (data.ok && data.datos) {
                    const { idPerfil, token } = data.datos;

                    // Guardar solo ID y token
                    localStorage.setItem("tokenPerfil", token);
                    localStorage.setItem("perfilActivo", idPerfil);

                    setPerfilActivo(idPerfil);

                    return idPerfil; // 🔹 importante
                }
                return null;
            })
            .catch(() => null);
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
            localStorage.removeItem("tokenPerfil");
            setCargando(false);
        });
    };

    const getContenidoPlan = () => {
        getFetch(`plan/listaContenido`)
            .then((data) => {
                setContenidoPlan(data.datos || []);
                console.log("contenido plan", data.datos);
            })
            .catch(err => console.error("Error al obtener contenido:", err));
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

    useEffect(() => {
        const inicializarAuth = async () => {
            try {
                const user = await getUsuario();

                // ✅ AGREGAR: Verificar pago si hay usuario
                if (user && user.idRol === 2) {
                    await verificarPago(user.idUsuario);
                }
            } catch (error) {
                console.error("Error inicializando auth:", error);
            } finally {
                setCargando(false);
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
                pagoValido,
                maxPerfiles,
                getPagos,
                setPerfilActivo,
                getUsuario,
                getPerfil,
                logout,
                getContenido,
                getContenidoPlan,
                getPerfilActivo,
                verificarPago
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);