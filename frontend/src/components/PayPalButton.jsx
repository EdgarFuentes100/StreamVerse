import { useEffect, useRef } from 'react';

function PayPalButton({ amount, onSuccess, onError, onCancel }) {
    const paypalRef = useRef();
    const rendered = useRef(false);

    useEffect(() => {
        // Verificar condiciones básicas
        if (!window.paypal || !paypalRef.current || rendered.current) {
            return;
        }

        console.log('🔄 Inicializando botones de PayPal...');

        try {
            // Limpiar contenedor
            paypalRef.current.innerHTML = '';

            const buttons = window.paypal.Buttons({
                style: {
                    layout: 'vertical',
                    color: 'gold',
                    shape: 'rect',
                    label: 'paypal',
                    height: 55
                },
                createOrder: function(data, actions) {
                    console.log('🎯 Creando orden de PayPal...');
                    return actions.order.create({
                        intent: 'CAPTURE',
                        purchase_units: [{
                            amount: {
                                currency_code: 'USD',
                                value: amount.toString()
                            },
                            description: `Suscripción - $${amount}/mes`
                        }]
                    });
                },
                onApprove: async function(data, actions) {
                    console.log('✅ Pago aprobado:', data);
                    try {
                        const details = await actions.order.capture();
                        console.log('💰 Pago capturado:', details);
                        onSuccess(details);
                    } catch (error) {
                        console.error('❌ Error capturando pago:', error);
                        onError(error);
                    }
                },
                onError: function(err) {
                    console.error('❌ Error de PayPal:', err);
                    onError(err);
                },
                onCancel: function(data) {
                    console.log('🚫 Pago cancelado por usuario');
                    onCancel(data);
                }
            });

            // Renderizar botones
            buttons.render(paypalRef.current).then(() => {
                console.log('✅ Botones de PayPal renderizados correctamente');
                rendered.current = true;
            }).catch((error) => {
                console.error('❌ Error renderizando botones:', error);
                rendered.current = false;
            });

        } catch (error) {
            console.error('❌ Error inicializando PayPal:', error);
            onError(error);
        }

        return () => {
            rendered.current = false;
        };
    }, [amount, onSuccess, onError, onCancel]);

    return (
        <div 
            ref={paypalRef} 
            className="w-full"
            style={{ minHeight: '200px' }}
        />
    );
}

export default PayPalButton;