import { useState, useEffect } from 'react';
import { useAuth } from '../api/authContext';
import { usePlan } from '../data/usePlan';

function CambiarPlanPage() {
    const { usuario } = useAuth();
    const { planActual, getPlanActual, plan } = usePlan();
    const [cargando, setCargando] = useState(true);
    const [planSeleccionado, setPlanSeleccionado] = useState(null);

    useEffect(() => {
        const cargarPlanes = async () => {
            if (usuario?.idCuenta) {
                await getPlanActual(usuario.idCuenta);
                setCargando(false);
            }
        };
        cargarPlanes();
    }, [usuario]);

    // DEBUG - Ver qué datos tenemos
    console.log("PLAN ACTUAL:", planActual);
    console.log("TODOS LOS PLANES:", plan);

    if (cargando) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center pt-20">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
                    <div className="text-white text-xl">Cargando planes...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-950 pt-20">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-white mb-4">Cambiar Plan</h1>
                    <p className="text-gray-400 text-lg">Elige el plan que mejor se adapte a tus necesidades</p>
                </div>

                {/* PLAN ACTUAL - MUY SIMPLE */}
                {planActual && (
                    <div className="bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl p-6 mb-8 text-white">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-bold mb-2">Tu Plan Actual</h2>
                                <p className="text-cyan-100 text-2xl font-bold">{planActual.nombre}</p>
                                <div className="flex flex-wrap gap-4 mt-3 text-sm">
                                    <span>👥 {planActual.maxPerfil} perfiles</span>
                                    <span>💰 ${planActual.precio}/mes</span>
                                    <span>🎬 Calidad {planActual.calidad}p</span>
                                    <span>📅 {planActual.tipoPlan}</span>
                                    {planActual.contenidoNuevo === 1 && <span>🆕 Contenido Nuevo</span>}
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="bg-white text-cyan-600 px-4 py-2 rounded-full font-bold text-sm">Activo</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* TODOS LOS PLANES */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {plan.map((planItem) => {
                        const esActual = planActual && planActual.idPlan === planItem.idPlan;

                        return (
                            <div
                                key={planItem.idPlan}
                                className={`bg-gray-800 rounded-xl p-6 border-2 ${esActual
                                        ? '!border-purple-500 opacity-70'
                                        : '!border-gray-600 hover:border-cyan-400 cursor-pointer'
                                    }`}
                                onClick={() => !esActual && setPlanSeleccionado(planItem)}
                            >
                                {/* Badge si es actual */}
                                {esActual && (
                                    <div className="!bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">
                                        Plan Actual
                                    </div>
                                )}

                                <h3 className="text-xl font-bold text-white mb-2">{planItem.nombre}</h3>
                                <p className="text-3xl font-bold text-cyan-400 mb-4">
                                    ${planItem.precio}<span className="text-sm text-gray-400">/mes</span>
                                </p>

                                <ul className="space-y-2 mb-6">
                                    <li className="flex items-center text-gray-300">
                                        <span className="text-green-400 mr-2">✓</span> {planItem.maxPerfil} perfiles
                                    </li>
                                    <li className="flex items-center text-gray-300">
                                        <span className="text-green-400 mr-2">✓</span> Calidad {planItem.calidad}p
                                    </li>
                                    {planItem.contenidoExclusivo === 1 && (
                                        <li className="flex items-center text-gray-300">
                                            <span className="text-green-400 mr-2">✓</span> Contenido Exclusivo
                                        </li>
                                    )}
                                    {planItem.contenidoNuevo === 1 && (
                                        <li className="flex items-center text-gray-300">
                                            <span className="text-green-400 mr-2">✓</span> Contenido Nuevo
                                        </li>
                                    )}
                                    {planItem.sinAnuncios === 1 && (
                                        <li className="flex items-center text-gray-300">
                                            <span className="text-green-400 mr-2">✓</span> Sin Anuncios
                                        </li>
                                    )}
                                </ul>

                                <button
                                    className={`w-full py-3 rounded-lg font-bold ${esActual
                                            ? '!bg-gray-600 text-gray-400 cursor-not-allowed'
                                            : planSeleccionado?.idPlan === planItem.idPlan
                                                ? '!bg-cyan-500 text-white'
                                                : '!bg-gray-700 text-white hover:bg-gray-600'
                                        }`}
                                    disabled={esActual}
                                >
                                    {esActual ? 'Plan Actual' : planSeleccionado?.idPlan === planItem.idPlan ? 'Seleccionado' : 'Seleccionar'}
                                </button>
                            </div>
                        );
                    })}
                </div>

                {/* Botón para cambiar plan */}
                {planSeleccionado && planActual && planSeleccionado.idPlan !== planActual.idPlan && (
                    <div className="text-center mt-8">
                        <button className="!bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all">
                            Cambiar a Plan {planSeleccionado.nombre} - ${planSeleccionado.precio}/mes
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CambiarPlanPage;