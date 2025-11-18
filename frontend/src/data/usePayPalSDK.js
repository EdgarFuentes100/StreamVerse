import { useEffect, useState } from 'react';

export const usePayPalSDK = () => {
    const [sdkReady, setSdkReady] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const clientId = 'AURqz2S_Oy-E2Y4QBFstJzJ6BgukOjqiQJqdbXhZKIDqQoxyNM4_tiRH96n_NkjOnIhqGHvUUzz9ZBiq';
        
        // Verificar si ya está cargado
        if (window.paypal) {
            setSdkReady(true);
            return;
        }

        // Verificar si ya hay un script cargándose
        const existingScript = document.querySelector('script[src*="paypal.com/sdk/js"]');
        if (existingScript) {
            // Esperar a que el script existente se cargue
            existingScript.onload = () => {
                if (window.paypal) {
                    setSdkReady(true);
                    setError(null);
                }
            };
            existingScript.onerror = () => {
                setError('Error al cargar el SDK de PayPal');
            };
            return;
        }

        // Crear nuevo script
        const script = document.createElement('script');
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`;
        script.async = true;
        script.setAttribute('data-sdk-integration-source', 'button-factory');
        
        script.onload = () => {
            if (window.paypal && window.paypal.Buttons) {
                setSdkReady(true);
                setError(null);
                console.log('✅ PayPal SDK cargado correctamente');
            } else {
                setError('PayPal SDK no se inicializó correctamente');
            }
        };

        script.onerror = () => {
            setError('Error al cargar el SDK de PayPal');
            console.error('❌ Error cargando PayPal SDK');
        };

        document.head.appendChild(script);

        return () => {
            // No remover el script para evitar recargas innecesarias
        };
    }, []);

    return { sdkReady, error };
};