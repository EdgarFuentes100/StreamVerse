import { useState, useEffect } from 'react';
import { useFetch } from '../api/useFetch';

const useVideo = () => {
    const { getFetch } = useFetch();
    const [videos, setVideos] = useState([]);
    const [videoActual, setVideoActual] = useState([]);

    const getVideos = (idTemporada) => {
        getFetch(`episodio/listadoEpisodio/${idTemporada}`)
            .then((data) => {
                setVideos(data.datos || []);
                console.log("videos", data.datos);
            })
            .catch((error) => {
                console.error('Error al obtener:', error);
            });
    };

    const getVideoActual = (idVideo) => {
        getFetch(`episodio/episodioActual/${idVideo}`)
            .then((data) => {
                setVideoActual(data.datos[0] || []);
                console.log("espiidodio", data.datos[0]);
            })
            .catch((error) => {
                console.error('Error al obtener:', error);
            });
    };


    useEffect(() => {
        getVideos();
    }, []);

    useEffect(() => {
        getVideoActual();
    }, []);


    return {
        videos,
        videoActual,
        getVideos,
        getVideoActual,
    };
};

export { useVideo };
