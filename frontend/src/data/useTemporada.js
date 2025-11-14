import { useState, useEffect } from 'react';
import { useFetch } from '../api/useFetch';

const useTemporada = () => {
    const { getFetch } = useFetch();
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


    return {
        temporadas,
        getTemporadas,
        listaTemporas
    };
};

export { useTemporada };
