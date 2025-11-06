import { useState, useEffect } from 'react';
import { useFetch } from '../api/useFetch';

const useContenido = () => {
    const { getFetch } = useFetch();
    const [contenido, setContenido] = useState([]);
    const [contenidoPopular, setContenidoPopular] = useState([]);
    const [contenidoNuevo, setContenidoNuevo] = useState([]);
    const [contenidoGrupo, setContenidoGrupo] = useState([]);

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

    return {
        contenido,
        contenidoPopular,
        contenidoNuevo,
        contenidoGrupo
    };
};

export { useContenido };
