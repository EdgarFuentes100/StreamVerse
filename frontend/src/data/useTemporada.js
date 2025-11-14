import { useState, useEffect } from 'react';
import { useFetch } from '../api/useFetch';

const useTemporada = () => {
    const { getFetch, postFetch, putFetch, deleteFetch } = useFetch();
    const [temporadas, setTemporadas] = useState([]);
    const [listaTemporas, setListaTemporada] = useState([]);

    const getTemporadas = (idContenido) => {
        getFetch(`temporada/listadoTemporada/${idContenido}`)
            .then((data) => {
                setTemporadas(data.datos || []);
                console.log("Temporada", data.datos);
            })
            .catch((error) => {
                console.error('Error al obtener:', error);
            });
    };

    const getListaTemporada = () => {
        getFetch(`temporada/listadoTemporada`)
            .then((data) => {
                setListaTemporada(data.datos || []);
            })
            .catch((error) => {
                console.error('Error al obtener:', error);
            });
    };

    useEffect(() => {
        getListaTemporada();
    }, []);

    // ======== PETICIONES CRUD ========
    const crearTemporada = (body) => {
        return postFetch('temporada/crear', body)
            .then((data) => {
                if (data.datos.ok) getListaTemporada();
                return data;
            })
            .catch((err) => {
                console.error('Error al crear:', err);
            });
    };

    const actualizarTemporada = (id, body) => {
        return putFetch(`temporada/editar/${id}`, body)
            .then((data) => {
                if (data.datos.ok) getListaTemporada();
                return data;
            })
            .catch((err) => {
                console.error('Error al actualizar:', err);
            });
    };

    const eliminarTemporada = (id) => {
        return deleteFetch(`temporada/eliminar/${id}`)
            .then((data) => {
                if (data.datos.ok) getListaTemporada();
                return data;
            })
            .catch((err) => {
                console.error('Error al eliminar:', err);
            });
    };

    return {
        temporadas,
        getTemporadas,
        listaTemporas,
        crearTemporada,
        actualizarTemporada,
        eliminarTemporada
    };
};

export { useTemporada };
