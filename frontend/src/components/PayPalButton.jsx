import { useEffect, useRef, useState } from 'react';

function PayPalButton({ amount, onSuccess, onError, onCancel }) {
    const paypalRef = useRef();
    const buttonsRendered = useRef(false);
    const [sdkLoaded, setSdkLoaded] = useState(false);

    useEffect(() => {
        const checkPayPalSDK = () => {
            if (window.paypal) {
                setSdkLoaded(true);
                return true;
            }
            return false;
        };

        if (!checkPayPalSDK()) {
            const interval = setInterval(() => {
                if (checkPayPalSDK()) {
                    clearInterval(interval);
                }
            }, 100);

            return () => clearInterval(interval);
        }
    }, []);

    useEffect(() => {
        if (!sdkLoaded || !paypalRef.current || !amount) {
            return;
        }

        const renderPayPalButtons = async () => {
            try {
                if (paypalRef.current.innerHTML) {
                    paypalRef.current.innerHTML = '';
                }

                if (buttonsRendered.current) {
                    return;
                }

                if (!window.paypal) {
                    throw new Error('PayPal SDK no está disponible');
                }

                const buttons = window.paypal.Buttons({
                    style: {
                        layout: 'vertical',
                        color: 'gold',
                        shape: 'rect',
                        label: 'paypal'
                    },
                    createOrder: (data, actions) => {
                        return actions.order.create({
                            intent: 'CAPTURE',
                            purchase_units: [{
                                amount: {
                                    currency_code: 'USD',
                                    value: amount.toString()
                                }
                            }]
                        });
                    },
                    onApprove: async (data, actions) => {
                        try {
                            const details = await actions.order.capture();
                            onSuccess(details);
                        } catch (error) {
                            console.error('Error capturing order:', error);
                            onError(error);
                        }
                    },
                    onError: (err) => {
                        console.error('PayPal Button Error:', err);
                        onError(err);
                    },
                    onCancel: (data) => {
                        console.log('Payment cancelled by user');
                        onCancel(data);
                    }
                });

                if (buttons.isEligible()) {
                    await buttons.render(paypalRef.current);
                    buttonsRendered.current = true;
                } else {
                    throw new Error('PayPal buttons not eligible');
                }

            } catch (error) {
                console.error('Error rendering PayPal buttons:', error);
                onError(error);
            }
        };

        renderPayPalButtons();

        return () => {
            buttonsRendered.current = false;
            if (paypalRef.current) {
                paypalRef.current.innerHTML = '';
            }
        };
    }, [sdkLoaded, amount, onSuccess, onError, onCancel]);

    if (!sdkLoaded) {
        return (
            <div className="flex flex-col items-center justify-center p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-2"></div>
                <p className="text-gray-400 text-sm">Cargando PayPal...</p>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div ref={paypalRef} className="paypal-buttons-container" />
        </div>
    );
}

export default PayPalButton;