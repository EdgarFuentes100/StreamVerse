import { useState, useEffect } from 'react';
import { useFetch } from '../api/useFetch';

const useContenido = () => {
    const { getFetch, postFetch, putFetch, deleteFetch } = useFetch();
    const [contenido, setContenido] = useState([]);
    const [contenidoPopular, setContenidoPopular] = useState([]);
    const [contenidoNuevo, setContenidoNuevo] = useState([]);
    const [contenidoGrupo, setContenidoGrupo] = useState([]);
    const [contenidoCategoria, setContenidoCategoria] = useState([]);
    const [contenidoInfo, setContenidoInfo] = useState([]);
    const [recomendacion, setRecomendacion] = useState([]);

    const getContenido = () => {
        getFetch('contenido/listado')
            .then((data) => {
                setContenido(data.datos || []);
                console.log(data.datos);
            })
            .catch((error) => {
                console.error('Error al obtener:', error);
            });
    };

    const getContenidoPopular = () => {
        getFetch('contenido/listadoPopular')
            .then((data) => {
                setContenidoPopular(data.datos || []);
                console.log("p", data.datos);
            })
            .catch((error) => {
                console.error('Error al obtener:', error);
            });
    };

    const getContenidoNuevo = () => {
        getFetch('contenido/listadoNuevo')
            .then((data) => {
                setContenidoNuevo(data.datos || []);
                console.log("n", data.datos);
            })
            .catch((error) => {
                console.error('Error al obtener:', error);
            });
    };

    const getContenidoGrupo = () => {
        getFetch('contenido/listadoGrupo')
            .then((data) => {
                setContenidoGrupo(data.datos || []);
                console.log("g", data.datos);
            })
            .catch((error) => {
                console.error('Error al obtener:', error);
            });
    };

    const getContenidoCategoria = (idCategoria) => {
        getFetch(`contenido/contenidoCategoria/${idCategoria}`)
            .then((data) => {
                setContenidoCategoria(data.datos || []);
                console.log("pctagoriaaa", data.datos);
            })
            .catch((error) => {
                console.error('Error al obtener:', error);
            });
    };

    const getContenidoInfo = (idContenido) => {
        getFetch(`contenido/contenidoInfo/${idContenido}`)
            .then((data) => {
                setContenidoInfo(data.datos[0] || []);
                console.log("informacion", data.datos[0]);
            })
            .catch((error) => {
                console.error('Error al obtener:', error);
            });
    };

    const getRecomendaciones = (idCuenta, idContenido, esAdmin = false) => {
        console.log(idCuenta, idContenido, esAdmin, "aaa");
        getFetch(`contenido/recomendaciones/${idCuenta}/${idContenido}/${esAdmin}`)
            .then((data) => {
                setRecomendacion(data.datos || []);
                console.log("recomendaciones", data.datos);
            })
            .catch((error) => {
                console.error('Error al obtener recomendaciones:', error);
            });
    };

    useEffect(() => {
        getContenido();
    }, []);

    useEffect(() => {
        getContenidoPopular();
    }, []);

    useEffect(() => {
        getContenidoNuevo();
    }, []);

    useEffect(() => {
        getContenidoGrupo();
    }, []);


    // ======== PETICIONES CRUD ========
    const crearContenido = (body) => {
        return postFetch('contenido/crear', body)
            .then((data) => {
                if (data.datos.ok) getContenido();
                return data;
            })
            .catch((err) => {
                console.error('Error al crear:', err);
            });
    };

    const actualizarContenido = (id, body) => {
        return putFetch(`contenido/editar/${id}`, body)
            .then((data) => {
                if (data.datos.ok) getContenido();
                return data;
            })
            .catch((err) => {
                console.error('Error al actualizar:', err);
            });
    };

    const eliminarContenido = (id) => {
        return deleteFetch(`contenido/eliminar/${id}`)
            .then((data) => {
                if (data.datos.ok) getContenido();
                return data;
            })
            .catch((err) => {
                console.error('Error al eliminar:', err);
            });
    };


    return {
        contenido,
        contenidoPopular,
        contenidoNuevo,
        contenidoGrupo,
        getContenidoCategoria,
        getContenidoInfo,
        contenidoCategoria,
        contenidoInfo,
        recomendacion,
        crearContenido,
        actualizarContenido,
        eliminarContenido,
        getRecomendaciones
    };
};

export { useContenido };
