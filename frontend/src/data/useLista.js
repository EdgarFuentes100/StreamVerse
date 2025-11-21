import { useState, useEffect } from 'react';
import { useFetch } from '../api/useFetch';

const useLista = () => {
    const [lista, setLista] = useState([]);
    const { getFetch, deleteFetch } = useFetch();

    const getListaFavorito = (idPerfil) => {
        getFetch(`mi_lista/listado/${idPerfil}`)
            .then((data) => {
                setLista(data.datos);
            })
            .catch((error) => {
                console.error('Error al obtener:', error);
            });
    };

    const eliminarLista = (id, idCuentaPerfil) => {
        return deleteFetch(`mi_lista/eliminar/${id}`)
            .then((data) => {
                if (data.datos.ok) getListaFavorito(idCuentaPerfil);
                return data;
            })
            .catch((err) => {
                console.error('Error al eliminar:', err);
            });
    };

    return {
        lista,
        getListaFavorito,
        eliminarLista
    };
};

export { useLista };
