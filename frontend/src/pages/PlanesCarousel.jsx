import { useState, useEffect } from "react";

function PlanesCarousel() {
    const [planActivo, setPlanActivo] = useState(2); // Comenzamos con el del medio
    const [isAnimating, setIsAnimating] = useState(false);

    const planes = [
        {
            id: 1,
            name: "Básico",
            price: "$5.99",
            period: "/ mes",
            features: ["Calidad 720p", "1 dispositivo", "Contenido limitado", "Anuncios incluidos"],
            color: "from-gray-500 to-gray-700",
            popular: false,
        },
        {
            id: 2,
            name: "Estándar",
            price: "$9.99",
            period: "/ mes",
            features: ["Calidad 1080p", "2 dispositivos", "Contenido completo", "Sin anuncios", "Descargas"],
            color: "from-cyan-500 to-blue-500",
            popular: true,
        },
        {
            id: 3,
            name: "Premium",
            price: "$14.99",
            period: "/ mes",
            features: ["Calidad 4K UHD", "4 dispositivos", "Todo el contenido", "Sin anuncios", "Descargas ilimitadas", "Contenido exclusivo"],
            color: "from-purple-500 to-pink-500",
            popular: false,
        },
    ];

    const siguientePlan = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        const currentIndex = planes.findIndex(plan => plan.id === planActivo);
        const nextIndex = (currentIndex + 1) % planes.length;
        setPlanActivo(planes[nextIndex].id);
        setTimeout(() => setIsAnimating(false), 500);
    };

    const anteriorPlan = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        const currentIndex = planes.findIndex(plan => plan.id === planActivo);
        const prevIndex = (currentIndex - 1 + planes.length) % planes.length;
        setPlanActivo(planes[prevIndex].id);
        setTimeout(() => setIsAnimating(false), 500);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            siguientePlan();
        }, 5000);
        return () => clearInterval(interval);
    }, [planActivo]);

    const getPlanPosition = (planId) => {
        const activeIndex = planes.findIndex(plan => plan.id === planActivo);
        const planIndex = planes.findIndex(plan => plan.id === planId);
        const diff = planIndex - activeIndex;
        if (diff === 0) return 'centro';
        if (diff === -1 || diff === planes.length - 1) return 'izquierda';
        if (diff === 1 || diff === - (planes.length - 1)) return 'derecha';
        return 'oculto';
    };

    return (
        <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-purple-900/20 to-cyan-900/20">
            <div className="container mx-auto">

                {/* Header */}
                <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4">
                        <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Elige Tu Experiencia
                        </span>
                    </h2>
                    <p className="text-gray-300 text-sm sm:text-base">
                        Desliza para explorar nuestros planes
                    </p>
                </div>

                {/* Carrusel */}
                <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] flex items-center justify-center mb-12">

                    {/* Flechas */}
                    <button
                        onClick={anteriorPlan}
                        disabled={isAnimating}
                        className="absolute left-2 sm:left-4 lg:left-8 z-30 bg-gray-800/80 hover:bg-gray-700/80 text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95 disabled:opacity-50"
                    >←</button>

                    <button
                        onClick={siguientePlan}
                        disabled={isAnimating}
                        className="absolute right-2 sm:right-4 lg:right-8 z-30 bg-gray-800/80 hover:bg-gray-700/80 text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95 disabled:opacity-50"
                    >→</button>

                    {/* Contenedor de planes */}
                    <div className="relative w-full h-full flex items-center justify-center">
                        {planes.map(plan => {
                            const posicion = getPlanPosition(plan.id);
                            if (posicion === 'oculto') return null;

                            return (
                                <div
                                    key={plan.id}
                                    className={`absolute transition-all duration-500 ease-in-out cursor-pointer
                                        ${posicion === 'centro'
                                            ? 'z-30 scale-100 opacity-100 translate-x-0'
                                            : posicion === 'izquierda'
                                                ? 'z-20 scale-75 opacity-60 -translate-x-32 sm:-translate-x-48 lg:-translate-x-64 rotate-[-5deg]'
                                                : 'z-20 scale-75 opacity-60 translate-x-32 sm:translate-x-48 lg:translate-x-64 rotate-[5deg]'
                                        } ${isAnimating ? 'pointer-events-none' : ''}`}
                                    onClick={() => posicion !== 'centro' && setPlanActivo(plan.id)}
                                >
                                    <div className={`relative rounded-2xl sm:rounded-3xl p-6 sm:p-8 bg-gradient-to-br ${plan.color} backdrop-blur-lg border-2
                                    ${posicion === 'centro'
                                            ? 'border-cyan-400 shadow-2xl shadow-cyan-500/25 w-64 sm:w-80 lg:w-96 h-[350px] sm:h-[450px] lg:h-[600px]'
                                            : 'border-gray-600/50 w-52 sm:w-64 lg:w-80 h-[300px] sm:h-[350px] lg:h-[500px] hover:border-gray-400'
                                        } transition-all duration-500`}
                                    >

                                        {/* Badge central */}
                                        {posicion === 'centro' && (
                                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-40">
                                                <div className="bg-gradient-to-r from-cyan-400 to-purple-400 text-gray-900 px-4 sm:px-6 py-2 rounded-full text-sm font-bold shadow-2xl flex items-center space-x-2 animate-pulse">
                                                    <span>⭐</span>
                                                    <span>ACTUAL</span>
                                                </div>
                                            </div>
                                        )}

                                        {/* Header del plan */}
                                        <div className="text-center mb-6">
                                            <h3 className={`font-bold mb-3 text-white 
                                            ${posicion === 'centro'
                                                    ? 'text-lg sm:text-3xl' // <--- más pequeño en móvil
                                                    : 'text-sm sm:text-2xl' // <--- más pequeño en móvil
                                                }`}>
                                                {plan.name}
                                            </h3>
                                            <div className="flex items-baseline justify-center space-x-2">
                                                <span className={`font-black text-white 
                                                 ${posicion === 'centro'
                                                        ? 'text-2xl sm:text-5xl' // <--- precio más pequeño en móvil
                                                        : 'text-xl sm:text-4xl'
                                                    }`}>
                                                    {plan.price}
                                                </span>
                                                <span className="text-gray-200 text-xs sm:text-sm">{plan.period}</span>
                                            </div>
                                        </div>

                                        {/* Características */}
                                        <ul className="space-y-3 mb-6">
                                            {plan.features.slice(0, posicion === 'centro' ? plan.features.length : 3).map((feature, i) => (
                                                <li key={i} className="flex items-start space-x-3 text-white/90">
                                                    <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 
                                                         ${posicion === 'centro' ? 'bg-cyan-500/30' : 'bg-white/20'}`}>
                                                        <span className="text-cyan-300 text-xs sm:text-sm">✓</span>
                                                    </div>
                                                    <span className={`${posicion === 'centro' ? 'text-xs sm:text-sm font-medium' : 'text-[10px] sm:text-xs'}`}>
                                                        {feature}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* Botón */}
                                        <button className={`w-full py-2 sm:py-3 rounded-xl font-bold transition-all duration-300
                                         ${posicion === 'centro'
                                                ? 'bg-white text-gray-900 hover:bg-gray-50 text-sm sm:text-base shadow-2xl'
                                                : 'bg-gray-900/60 text-white hover:bg-gray-900/80 border border-white/20 text-xs sm:text-sm'
                                            }`}>
                                            <span className="flex items-center justify-center space-x-2">
                                                <span>{posicion === 'centro' ? 'Comenzar Ahora' : 'Ver Detalles'}</span>
                                                <span>→</span>
                                            </span>
                                        </button>

                                        {/* Overlay para laterales */}
                                        {posicion !== 'centro' && (
                                            <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-black/20 hover:bg-black/10 transition-all duration-300 cursor-pointer" />
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </div>

                {/* Indicadores */}
                <div className="flex justify-center mt-4 space-x-3">
                    {planes.map(plan => (
                        <button
                            key={plan.id}
                            onClick={() => setPlanActivo(plan.id)}
                            disabled={isAnimating}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${planActivo === plan.id ? 'bg-cyan-400 scale-125' : 'bg-gray-600 hover:bg-gray-400'} ${isAnimating ? 'opacity-50' : ''}`}
                        />
                    ))}
                </div>

                {/* Instrucciones */}
                <div className="text-center mt-6">
                    <p className="text-gray-400 text-sm">
                        💡 <span className="text-cyan-400">Haz clic en las flechas</span> o en los planes laterales para navegar
                    </p>
                </div>

                {/* Garantías */}
                <div className="mt-12 sm:mt-16 text-center">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        <div className="flex flex-col items-center space-y-2 p-4 bg-gray-800/30 rounded-2xl backdrop-blur-sm">
                            <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center">
                                <span className="text-green-400 text-xl">🔒</span>
                            </div>
                            <span className="text-white font-semibold">Sin compromiso</span>
                            <span className="text-gray-400 text-sm">Cancela cuando quieras</span>
                        </div>
                        <div className="flex flex-col items-center space-y-2 p-4 bg-gray-800/30 rounded-2xl backdrop-blur-sm">
                            <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center">
                                <span className="text-blue-400 text-xl">📱</span>
                            </div>
                            <span className="text-white font-semibold">Multiplataforma</span>
                            <span className="text-gray-400 text-sm">Todos tus dispositivos</span>
                        </div>
                        <div className="flex flex-col items-center space-y-2 p-4 bg-gray-800/30 rounded-2xl backdrop-blur-sm">
                            <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center">
                                <span className="text-purple-400 text-xl">🎁</span>
                            </div>
                            <span className="text-white font-semibold">7 días gratis</span>
                            <span className="text-gray-400 text-sm">Prueba sin riesgo</span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default PlanesCarousel;
