import { useState } from 'react';
import { useFetch } from '../api/useFetch';

export const usePago = () => {
    const { postFetch } = useFetch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // ======== PETICIONES CRUD ========
    const crearPago = async (body) => {
        setLoading(true);
        setError(null);
        
        try {
            const data = await postFetch('pagos/crear', body);
            if (data.datos && data.datos.ok) {
                return data;
            } else {
                throw new Error(data.mensaje || 'Error al crear el pago');
            }
        } catch (err) {
            console.error('Error al crear pago:', err);
            setError(err.message || 'Error al procesar el pago');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        crearPago,
        loading,
        error
    };
};