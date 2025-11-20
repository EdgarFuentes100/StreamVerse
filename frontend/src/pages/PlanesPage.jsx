import { useState, useEffect } from "react";
import { usePayPal } from "../data/usePayPal";
import { usePlan } from "../data/usePlan";
import PayPalModal from "../components/PayPalModal";
import { usePayPalSDK } from "../data/usePayPalSDK";
import { useAuth } from "../api/authContext";
import { useNavigate } from "react-router-dom";

function PlanesPage() {
    const [planActivo, setPlanActivo] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [mostrarPayPal, setMostrarPayPal] = useState(false);
    const [planSeleccionado, setPlanSeleccionado] = useState(null);

    const { plan } = usePlan();
    const { procesarPagoExitoso } = usePayPal();
    const { sdkReady, error } = usePayPalSDK();
    const { usuario, pagoValido, verificarPago } = useAuth();
    const navigate = useNavigate();

    const colores = [
        "!from-cyan-500 !to-blue-500",
        "!from-purple-500 !to-pink-500",
        "!from-green-500 !to-emerald-500",
        "!from-orange-500 !to-red-500",
    ];

    // ✅ REDIRIGIR SI YA TIENE PAGO VÁLIDO
    useEffect(() => {
        if (usuario && pagoValido) {
            if (!usuario.perfilActivo) {
                navigate("/Perfil");
            } else {
                navigate("/Catalogo");
            }
        }
    }, [usuario, pagoValido, navigate]);

    const getPlanColor = (index) => {
        return colores[index % colores.length];
    };

    const getPlanFeatures = (planItem) => {
        const features = [
            `Calidad ${planItem.calidad}p`,
            `${planItem.maxPerfil} perfiles`
        ];

        if (planItem.contenidoExclusivo) {
            features.push('Contenido exclusivo');
        }

        if (planItem.contenidoNuevo) {
            features.push('Contenido nuevo');
        }

        if (planItem.sinPublicidad) {
            features.push('Sin publicidad');
        }

        return features;
    };

    const handleSeleccionarPlan = (planItem) => {
        if (!sdkReady) {
            alert("PayPal aún no está listo. Por favor, espera un momento.");
            return;
        }
        setPlanSeleccionado(planItem);
        setMostrarPayPal(true);
    };

    const handlePaymentSuccess = async (details) => {
        try {
            const resultado = await procesarPagoExitoso(planSeleccionado, details);

            if (resultado.success) {
                alert(resultado.message);
                setMostrarPayPal(false);
                setPlanSeleccionado(null);

                // ✅ VERIFICAR PAGO Y REDIRIGIR
                if (usuario) {
                    await verificarPago(usuario.idUsuario);
                    navigate("/Perfil");
                }
            } else {
                alert(resultado.message);
            }
        } catch (error) {
            console.error("Error en el procesamiento del pago:", error);
            alert("Error al procesar el pago. Por favor, contacta con soporte.");
        }
    };

    const handlePaymentError = (error) => {
        console.error('Error en PayPal:', error);
        alert("Error en el pago. Por favor, intenta nuevamente.");
    };

    const handlePaymentCancel = () => {
        alert("Pago cancelado");
        setMostrarPayPal(false);
        setPlanSeleccionado(null);
    };

    const siguientePlan = () => {
        if (isAnimating || !plan || plan.length === 0) return;
        setIsAnimating(true);
        setPlanActivo((prev) => (prev + 1) % plan.length);
        setTimeout(() => setIsAnimating(false), 500);
    };

    const anteriorPlan = () => {
        if (isAnimating || !plan || plan.length === 0) return;
        setIsAnimating(true);
        setPlanActivo((prev) => (prev - 1 + plan.length) % plan.length);
        setTimeout(() => setIsAnimating(false), 500);
    };

    useEffect(() => {
        if (!plan || plan.length === 0) return;
        const interval = setInterval(() => {
            siguientePlan();
        }, 5000);
        return () => clearInterval(interval);
    }, [planActivo, plan]);

    const getPlanPosition = (index) => {
        if (!plan || plan.length === 0) return 'oculto';
        const diff = index - planActivo;

        if (diff === 0) return 'centro';
        if (diff === -1 || (diff === plan.length - 1 && plan.length > 2)) return 'izquierda';
        if (diff === 1 || (diff === -(plan.length - 1) && plan.length > 2)) return 'derecha';
        return 'oculto';
    };

    // ✅ Mostrar estado de carga de PayPal
    if (error) {
        return (
            <section className="min-h-screen py-12 !bg-gradient-to-br !from-gray-900 !via-purple-900/20 !to-cyan-900/20 flex items-center justify-center">
                <div className="container mx-auto text-center">
                    <div className="!text-red-500 text-xl mb-4">❌ Error al cargar PayPal</div>
                    <p className="!text-gray-300 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 !bg-blue-500 !text-white rounded-lg hover:!bg-blue-600"
                    >
                        Recargar Página
                    </button>
                </div>
            </section>
        );
    }

    if (!plan || plan.length === 0) {
        return (
            <section className="min-h-screen py-12 !bg-gradient-to-br !from-gray-900 !via-purple-900/20 !to-cyan-900/20 flex items-center justify-center">
                <div className="container mx-auto text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 !border-purple-500 mx-auto"></div>
                    <p className="!text-gray-300 mt-4">Cargando planes...</p>
                </div>
            </section>
        );
    }

    // ✅ Mostrar carga de PayPal SDK
    if (!sdkReady) {
        return (
            <section className="min-h-screen py-12 !bg-gradient-to-br !from-gray-900 !via-purple-900/20 !to-cyan-900/20 flex items-center justify-center">
                <div className="container mx-auto text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 !border-blue-500 mx-auto"></div>
                    <p className="!text-gray-300 mt-4">Inicializando PayPal...</p>
                    <p className="!text-gray-400 text-sm">Esto puede tomar unos segundos</p>
                </div>
            </section>
        );
    }

    return (
        <section className="min-h-screen py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 !bg-gradient-to-br !from-gray-900 !via-purple-900/20 !to-cyan-900/20">
            <div className="container mx-auto">

                <PayPalModal
                    mostrar={mostrarPayPal}
                    planSeleccionado={planSeleccionado}
                    onClose={() => {
                        setMostrarPayPal(false);
                        setPlanSeleccionado(null);
                    }}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                    onCancel={handlePaymentCancel}
                />

                <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4">
                        <span className="!bg-gradient-to-r !from-cyan-400 !via-purple-400 !to-pink-400 !bg-clip-text !text-transparent">
                            Elige Tu Plan
                        </span>
                    </h2>
                    <p className="!text-gray-300 text-sm sm:text-base">
                        {plan.length} planes disponibles
                    </p>
                    {/* ✅ Indicador de PayPal listo */}
                    <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full !bg-green-500/20 !border !border-green-500/30">
                        <div className="w-2 h-2 !bg-green-500 rounded-full mr-2 animate-pulse"></div>
                        <span className="!text-green-400 text-xs">PayPal listo</span>
                    </div>
                </div>

                <div className="relative h-[500px] sm:h-[550px] lg:h-[650px] flex items-center justify-center mb-12">
                    {plan.length > 1 && (
                        <>
                            <button onClick={anteriorPlan} disabled={isAnimating} className="absolute left-2 sm:left-4 lg:left-8 z-30 !bg-gray-800/80 hover:!bg-gray-700/80 !text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95 disabled:opacity-50">
                                ←
                            </button>
                            <button onClick={siguientePlan} disabled={isAnimating} className="absolute right-2 sm:right-4 lg:right-8 z-30 !bg-gray-800/80 hover:!bg-gray-700/80 !text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95 disabled:opacity-50">
                                →
                            </button>
                        </>
                    )}

                    <div className="relative w-full h-full flex items-center justify-center">
                        {plan.map((planItem, index) => {
                            const posicion = getPlanPosition(index);
                            if (posicion === 'oculto') return null;

                            const features = getPlanFeatures(planItem);

                            return (
                                <div
                                    key={planItem.idPlan}
                                    className={`absolute transition-all duration-500 ease-in-out cursor-pointer
                                        ${posicion === 'centro' ? 'z-30 scale-100 opacity-100 translate-x-0' :
                                            posicion === 'izquierda' ? 'z-20 scale-85 opacity-70 -translate-x-40 sm:-translate-x-56 lg:-translate-x-72 rotate-[-3deg]' :
                                                'z-20 scale-85 opacity-70 translate-x-40 sm:translate-x-56 lg:translate-x-72 rotate-[3deg]'} 
                                        ${isAnimating ? 'pointer-events-none' : ''}`}
                                    onClick={() => posicion !== 'centro' && setPlanActivo(index)}
                                >
                                    <div className={`relative rounded-2xl sm:rounded-3xl p-6 sm:p-8 !bg-gradient-to-br ${getPlanColor(index)} backdrop-blur-lg !border-2
                                        ${posicion === 'centro' ? '!border-cyan-400 shadow-2xl !shadow-cyan-500/25 w-72 sm:w-88 lg:w-104 h-[420px] sm:h-[480px] lg:h-[580px]' :
                                            '!border-gray-600/50 w-60 sm:w-72 lg:w-80 h-[380px] sm:h-[420px] lg:h-[500px] hover:!border-gray-400'} 
                                        transition-all duration-500`}
                                    >
                                        {posicion === 'centro' && (
                                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-40">
                                                <div className="!bg-gradient-to-r !from-cyan-400 !to-purple-400 !text-gray-900 px-4 sm:px-6 py-2 rounded-full text-sm font-bold shadow-2xl flex items-center space-x-2 animate-pulse">
                                                    <span>⭐</span>
                                                    <span>RECOMENDADO</span>
                                                </div>
                                            </div>
                                        )}

                                        <div className="text-center mb-6">
                                            <h3 className={`font-bold mb-3 !text-white 
                                                ${posicion === 'centro' ? 'text-xl sm:text-4xl lg:text-5xl' : 'text-lg sm:text-2xl lg:text-3xl'}`}>
                                                {planItem.nombre}
                                            </h3>
                                            <div className="flex items-baseline justify-center space-x-2">
                                                <span className={`font-black !text-white 
                                                    ${posicion === 'centro' ? 'text-3xl sm:text-6xl lg:text-7xl' : 'text-2xl sm:text-4xl lg:text-5xl'}`}>
                                                    ${planItem.precio}
                                                </span>
                                                <span className="!text-gray-200 text-sm sm:text-base">/mes</span>
                                            </div>
                                        </div>

                                        <ul className="space-y-2 mb-6">
                                            {features.map((feature, i) => (
                                                <li key={i} className="flex items-start space-x-2 !text-white/90">
                                                    <div className={`rounded-full flex items-center justify-center flex-shrink-0 mt-1
                                                         ${posicion === 'centro' ? '!bg-cyan-500/30 w-5 h-5 sm:w-6 sm:h-6' : '!bg-white/20 w-4 h-4 sm:w-5 sm:h-5'}`}>
                                                        <span className="!text-cyan-300 text-xs sm:text-sm">✓</span>
                                                    </div>
                                                    <span className={`${posicion === 'centro' ? 'text-sm sm:text-base font-medium' : 'text-xs sm:text-sm'}`}>
                                                        {feature}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>

                                        <button
                                            onClick={() => handleSeleccionarPlan(planItem)}
                                            className={`w-full py-3 sm:py-4 rounded-xl font-bold transition-all duration-300
                                                ${posicion === 'centro' ? '!bg-white !text-gray-900 hover:!bg-gray-50 text-base sm:text-lg shadow-2xl' :
                                                    '!bg-gray-900/60 !text-white hover:!bg-gray-900/80 !border !border-white/20 text-sm sm:text-base'}`}
                                        >
                                            <span className="flex items-center justify-center space-x-2">
                                                <span>{posicion === 'centro' ? 'Seleccionar Plan' : 'Ver Detalles'}</span>
                                                <span>→</span>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {plan.length > 1 && (
                    <div className="flex justify-center mt-8 space-x-3">
                        {plan.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setPlanActivo(index)}
                                disabled={isAnimating}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${planActivo === index ? '!bg-cyan-400 scale-125' : '!bg-gray-600 hover:!bg-gray-400'} ${isAnimating ? 'opacity-50' : ''}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default PlanesPage;