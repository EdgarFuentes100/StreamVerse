import { useState, useEffect } from "react";
import { usePayPal } from "../data/usePayPal";
import { usePlan } from "../data/usePlan";
import PayPalModal from "../components/PayPalModal";

function PlanesCarousel() {
    const [planActivo, setPlanActivo] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [mostrarPayPal, setMostrarPayPal] = useState(false);
    const [planSeleccionado, setPlanSeleccionado] = useState(null);
    
    const { plan } = usePlan();
    const { procesarPagoExitoso } = usePayPal();

    // Colores más intensos con !
    const colores = [
        "from-cyan-500! to-blue-600!",
        "from-purple-600! to-pink-600!",
        "from-green-500! to-emerald-600!",
        "from-orange-500! to-red-600!",
        "from-yellow-500! to-amber-600!",
        "from-indigo-600! to-violet-600!"
    ];

    const getPlanColor = (index) => {
        return colores[index % colores.length];
    };

    const getPlanFeatures = (planItem) => {
        const features = [
            `Calidad ${planItem.calidad}p`,
            `${planItem.maxPerfil} perfiles`
        ];

        // Agregar características adicionales basadas en el plan
        if (planItem.contenidoExclusivo) {
            features.push("Contenido Exclusivo");
        }
        
        if (planItem.contenidoNuevo) {
            features.push("Contenido Nuevo Semanal");
        }
        
        if (planItem.sinAnuncios) {
            features.push("Sin Anuncios");
        }
        
        if (planItem.descargas) {
            features.push("Descargas Offline");
        }
        
        if (planItem.multidispositivo) {
            features.push("Hasta 4 dispositivos");
        }

        return features;
    };

    const handleSeleccionarPlan = (planItem) => {
        setPlanSeleccionado(planItem);
        setMostrarPayPal(true);
    };

    const handlePaymentSuccess = async (details) => {
        const resultado = await procesarPagoExitoso(planSeleccionado, details);
        
        if (resultado.success) {
            alert(resultado.message);
            setMostrarPayPal(false);
            setPlanSeleccionado(null);
        } else {
            alert(resultado.message);
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

    // Función para obtener icono según la característica
    const getFeatureIcon = (feature) => {
        if (feature.includes("Calidad")) return "🎯";
        if (feature.includes("perfiles")) return "👥";
        if (feature.includes("Exclusivo")) return "🎬";
        if (feature.includes("Nuevo")) return "🆕";
        if (feature.includes("Anuncios")) return "🚫";
        if (feature.includes("Descargas")) return "💾";
        if (feature.includes("dispositivos")) return "📱";
        return "✓";
    };

    if (!plan || plan.length === 0) {
        return (
            <section className="py-12 bg-gradient-to-br from-gray-900! via-purple-900/20! to-cyan-900/20!">
                <div className="container mx-auto text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500! mx-auto"></div>
                    <p className="text-gray-300 mt-4">Cargando planes...</p>
                </div>
            </section>
        );
    }

    return (
        <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900! via-purple-900/20! to-cyan-900/20!">
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
                        <span className="bg-gradient-to-r from-cyan-400! via-purple-400! to-pink-400! bg-clip-text text-transparent">
                            Elige Tu Plan Perfecto
                        </span>
                    </h2>
                    <p className="text-gray-300 text-sm sm:text-base">
                        {plan.length} planes premium disponibles • Calidad garantizada
                    </p>
                </div>

                <div className="relative h-[550px] sm:h-[600px] lg:h-[700px] flex items-center justify-center mb-12">
                    {plan.length > 1 && (
                        <>
                            <button onClick={anteriorPlan} disabled={isAnimating} className="absolute left-2 sm:left-4 lg:left-8 z-30 bg-gray-800/90! hover:bg-gray-700/90! text-white! w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-2xl! transition-all hover:scale-110! active:scale-95! disabled:opacity-50">
                                ←
                            </button>
                            <button onClick={siguientePlan} disabled={isAnimating} className="absolute right-2 sm:right-4 lg:right-8 z-30 bg-gray-800/90! hover:bg-gray-700/90! text-white! w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-2xl! transition-all hover:scale-110! active:scale-95! disabled:opacity-50">
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
                                    <div className={`relative rounded-2xl sm:rounded-3xl p-6 sm:p-8 bg-gradient-to-br ${getPlanColor(index)} backdrop-blur-lg! border-2!
                                        ${posicion === 'centro' ? 'border-cyan-400! shadow-2xl! shadow-cyan-500/30! w-80 sm:w-96 lg:w-112 h-[480px] sm:h-[540px] lg:h-[640px]' : 
                                         'border-gray-600/50! w-64 sm:w-76 lg:w-88 h-[420px] sm:h-[460px] lg:h-[540px] hover:border-gray-400!'} 
                                        transition-all duration-500`}
                                    >
                                        {posicion === 'centro' && (
                                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-40">
                                                <div className="bg-gradient-to-r from-cyan-400! to-purple-400! text-gray-900! px-4 sm:px-6 py-2 rounded-full text-sm font-bold shadow-2xl! flex items-center space-x-2 animate-pulse">
                                                    <span>🔥</span>
                                                    <span>MÁS POPULAR</span>
                                                </div>
                                            </div>
                                        )}

                                        <div className="text-center mb-6">
                                            <h3 className={`font-bold mb-3 text-white! 
                                                ${posicion === 'centro' ? 'text-xl sm:text-4xl lg:text-5xl' : 'text-lg sm:text-2xl lg:text-3xl'}`}>
                                                {planItem.nombre}
                                            </h3>
                                            <div className="flex items-baseline justify-center space-x-2">
                                                <span className={`font-black text-white! 
                                                    ${posicion === 'centro' ? 'text-3xl sm:text-6xl lg:text-7xl' : 'text-2xl sm:text-4xl lg:text-5xl'}`}>
                                                    ${planItem.precio}
                                                </span>
                                                <span className="text-gray-200! text-sm sm:text-base">/mes</span>
                                            </div>
                                        </div>

                                        <ul className="space-y-3 mb-6">
                                            {features.map((feature, i) => (
                                                <li key={i} className="flex items-start space-x-3 text-white/95!">
                                                    <div className={`rounded-full flex items-center justify-center flex-shrink-0 mt-1
                                                         ${posicion === 'centro' ? 'bg-white/30! w-6 h-6 sm:w-7 sm:h-7' : 'bg-white/25! w-5 h-5 sm:w-6 sm:h-6'}`}>
                                                        <span className="text-white! text-sm">
                                                            {getFeatureIcon(feature)}
                                                        </span>
                                                    </div>
                                                    <span className={`${posicion === 'centro' ? 'text-sm sm:text-base font-medium' : 'text-xs sm:text-sm'} leading-tight`}>
                                                        {feature}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>

                                        <button
                                            onClick={() => handleSeleccionarPlan(planItem)}
                                            className={`w-full py-3 sm:py-4 rounded-xl font-bold transition-all duration-300 mt-4
                                                ${posicion === 'centro' ? 
                                                 'bg-white! text-gray-900! hover:bg-gray-50! text-base sm:text-lg shadow-2xl! hover:shadow-cyan-500/20! hover:scale-105!' : 
                                                 'bg-gray-900/70! text-white! hover:bg-gray-900/90! border border-white/30! text-sm sm:text-base hover:border-white/50!'}`}
                                        >
                                            <span className="flex items-center justify-center space-x-2">
                                                <span>{posicion === 'centro' ? 'Seleccionar Plan' : 'Ver Detalles'}</span>
                                                <span className={`${posicion === 'centro' ? 'text-lg' : 'text-base'}`}>→</span>
                                            </span>
                                        </button>

                                        {/* Badge de características destacadas */}
                                        {posicion === 'centro' && (planItem.contenidoExclusivo || planItem.contenidoNuevo) && (
                                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 z-20">
                                                <div className="bg-gradient-to-r from-green-500! to-emerald-600! text-white! px-3 py-1 rounded-full text-xs font-semibold shadow-lg!">
                                                    {planItem.contenidoExclusivo && planItem.contenidoNuevo ? 
                                                     "🎬 Contenido Exclusivo + Nuevo" : 
                                                     planItem.contenidoExclusivo ? "🎬 Exclusivo" : "🆕 Nuevo Contenido"}
                                                </div>
                                            </div>
                                        )}
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
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${planActivo === index ? 'bg-cyan-400! scale-125!' : 'bg-gray-600! hover:bg-gray-400!'} ${isAnimating ? 'opacity-50' : ''}`}
                            />
                        ))}
                    </div>
                )}

                {/* Información adicional */}
                <div className="text-center mt-12 max-w-2xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-400">
                        <div className="flex items-center justify-center space-x-2">
                            <span>Contenido Exclusivo</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                            <span>Contenido Nuevo Semanal</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                            <span>Sin Anuncios</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default PlanesCarousel;