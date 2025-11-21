import { useState, useEffect } from 'react';
import { useAuth } from '../api/authContext';
import { usePlan } from '../data/usePlan';
import { usePayPal } from "../data/usePayPal";
import { usePayPalSDK } from "../data/usePayPalSDK";
import PayPalModal from "../components/PayPalModal";
import { useNavigate } from "react-router-dom";
import Particles from '../components/Particles';
import Toast from '../components/Toast';

function CambiarPlanPage() {
    const { usuario } = useAuth();
    const { planActual, getPlanActual, plan } = usePlan();
    const { procesarPagoExitoso } = usePayPal();
    const { sdkReady, error } = usePayPalSDK();
    const navigate = useNavigate();
    const [cargando, setCargando] = useState(true);
    const [planSeleccionado, setPlanSeleccionado] = useState(null);
    const [mostrarPayPal, setMostrarPayPal] = useState(false);
    const [toast, setToast] = useState(null);
    const mostrarToast = (tipo, mensaje) => {
        setToast({ tipo, mensaje });
    };
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

    const handleSeleccionarPlan = (planItem) => {
        if (!sdkReady) {
            mostrarToast("error", "PayPal aún no está listo. Por favor, espera un momento");
            return;
        }
        setPlanSeleccionado(planItem);
        setMostrarPayPal(true);
    };

    const handlePaymentSuccess = async (details) => {
        try {
            const resultado = await procesarPagoExitoso(planSeleccionado, details);

            if (resultado.success) {
                mostrarToast("success", resultado.message);
                setMostrarPayPal(false);
                setPlanSeleccionado(null);

                setTimeout(() => navigate("/Catalogo"), 2000);
            } else {
                mostrarToast("error", resultado.message);
            }
        } catch (error) {
            console.error("Error en el procesamiento del pago:", error);
            mostrarToast("error", "Error al procesar el pago. Por favor, contacta con soporte.");
        }
    };

    const handlePaymentError = (error) => {
        console.error('Error en PayPal:', error);
        mostrarToast("error", "Error en el pago. Por favor, intenta nuevamente.");
    };

    const handlePaymentCancel = () => {
        mostrarToast("error", "Pago cancelado");
        setMostrarPayPal(false);
        setPlanSeleccionado(null);
    };

    // ✅ Mostrar estado de carga de PayPal
    if (error) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center pt-20">
                <div className="text-center">
                    <div className="text-red-500 text-xl mb-4">❌ Error al cargar PayPal</div>
                    <p className="text-gray-300 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Recargar Página
                    </button>
                </div>
            </div>
        );
    }

    if (cargando) {
        return (
            <div className="min-h-screen !bg-gray-950 flex items-center justify-center pt-20">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
                    <div className="text-white text-xl">Cargando planes...</div>
                </div>
            </div>
        );
    }

    // ✅ Mostrar carga de PayPal SDK
    if (!sdkReady) {
        return (
            <div className="min-h-screen !bg-gray-950 flex items-center justify-center pt-20">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="text-gray-300 mt-4">Inicializando PayPal...</p>
                    <p className="text-gray-400 text-sm">Esto puede tomar unos segundos</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-950 pt-20">
            {toast && (
                <Toast
                    tipo={toast.tipo}
                    mensaje={toast.mensaje}
                    onClose={() => setToast(null)}
                />
            )}

            <Particles
                count={{ sm: 200, lg: 700 }}      // Cantidad de partículas según tamaño
                intensity={{ sm: "low", lg: "medium" }}  // Opacidad según tamaño
                className="absolute inset-0 z-0"
            />

            {/* PayPal Modal */}
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

            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-white mb-4">Cambiar Plan</h1>
                    <p className="text-gray-400 text-lg">Elige el plan que mejor se adapte a tus necesidades</p>

                    {/* ✅ Indicador de PayPal listo */}
                    <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                        <span className="text-green-400 text-xs">PayPal listo</span>
                    </div>
                </div>

                {/* PLAN ACTUAL */}
                {planActual && (
                    <div className="!bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl p-6 mb-8 text-white">
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
                                <span className="!bg-white text-cyan-600 px-4 py-2 rounded-full font-bold text-sm">Activo</span>
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
                                className={`!bg-gray-800 rounded-xl p-6 border-2 ${esActual
                                    ? '!border-purple-500 opacity-70'
                                    : '!border-gray-600 hover:border-cyan-400 cursor-pointer'
                                    }`}
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
                                    onClick={() => !esActual && handleSeleccionarPlan(planItem)}
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
                        <button
                            onClick={() => handleSeleccionarPlan(planSeleccionado)}
                            className="!bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all"
                        >
                            Cambiar a Plan {planSeleccionado.nombre} - ${planSeleccionado.precio}/mes
                        </button>
                        <p className="text-gray-400 mt-3">
                            Serás redirigido a PayPal para completar el pago
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CambiarPlanPage;