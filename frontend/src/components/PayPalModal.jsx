import { useState, useEffect } from "react";
import PayPalButton from "./PayPalButton";

function PayPalModal({ 
    mostrar, 
    planSeleccionado, 
    onClose, 
    onSuccess, 
    onError, 
    onCancel 
}) {
    const [procesando, setProcesando] = useState(false);
    const [mostrarPayPal, setMostrarPayPal] = useState(false);

    useEffect(() => {
        if (mostrar && planSeleccionado) {
            const timer = setTimeout(() => {
                setMostrarPayPal(true);
            }, 100);
            
            return () => {
                clearTimeout(timer);
                setMostrarPayPal(false);
                setProcesando(false);
            };
        }
    }, [mostrar, planSeleccionado]);

    const handleSuccess = async (details) => {
        setProcesando(true);
        try {
            await onSuccess(details);
        } finally {
            setProcesando(false);
        }
    };

    const handleClose = () => {
        setMostrarPayPal(false);
        setProcesando(false);
        onClose();
    };

    if (!mostrar || !planSeleccionado) return null;

    return (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-cyan-500/30 shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col">
                <div className="p-6 border-b border-gray-700/50 flex-shrink-0">
                    <div className="text-center">
                        <h3 className="text-white font-bold text-xl mb-2">
                            {procesando ? "Procesando pago..." : "Confirmar Pago"}
                        </h3>
                        <div className="flex items-baseline justify-center space-x-2">
                            <span className="text-3xl font-bold text-green-400">${planSeleccionado.precio}</span>
                            <span className="text-gray-400 text-lg">USD/mes</span>
                        </div>
                        <p className="text-gray-300 mt-2">
                            Plan: <span className="text-cyan-400 font-semibold">{planSeleccionado.nombre}</span>
                        </p>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    <div className="bg-white/5 rounded-xl p-4 border border-gray-600/30 min-h-[400px] flex items-center justify-center">
                        {!procesando && mostrarPayPal ? (
                            <PayPalButton
                                amount={planSeleccionado.precio}
                                onSuccess={handleSuccess}
                                onError={onError}
                                onCancel={onCancel}
                                key={`paypal-${planSeleccionado.idPlan}-${Date.now()}`}
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center space-y-4">
                                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-500"></div>
                                <p className="text-gray-400 text-center">
                                    {procesando ? "Procesando tu pago..." : "Cargando PayPal..."}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-4 border-t border-gray-700/50 flex-shrink-0">
                    <button
                        onClick={handleClose}
                        disabled={procesando}
                        className="w-full border border-gray-600 text-gray-400 hover:text-white hover:border-gray-400 py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {procesando ? "Procesando..." : "Volver a planes"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PayPalModal;