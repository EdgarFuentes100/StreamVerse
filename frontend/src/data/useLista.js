import { useState, useEffect } from 'react';
import { useFetch } from '../api/useFetch';

const useLista = () => {
    const [lista, setLista] = useState([]);
    const { getFetch } = useFetch();

    const getListaFavorito = (idPerfil) => {
        getFetch(`mi_lista/listado/${idPerfil}`)
            .then((data) => {
                setLista(data.datos);
                console.log("lista f", data.datos);
            })
            .catch((error) => {
                console.error('Error al obtener:', error);
            });
    };

    return {
        lista,
        getListaFavorito
    };
};

export { useLista };
