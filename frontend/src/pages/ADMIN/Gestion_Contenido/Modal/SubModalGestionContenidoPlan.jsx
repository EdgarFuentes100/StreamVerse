import React, { useState, useEffect } from 'react';
import TablaReutilizable from '../../../../components/TablaReutilizable';
import { useContenidoPlan } from '../../../../data/useContenidoPlan';

function SubModalGestionContenidoPlan({
    plan = {},
    onClose,
    cargando = false,
}) {
    const { getContenidoPlanTodo, contenidoPlanTodo, cargando: cargandoContenido, configurarContenidoAutomatico, toggleContenidoPlan } = useContenidoPlan();
    const [recargando, setRecargando] = useState(false);
    const [mostrarTabla, setMostrarTabla] = useState(false);
    const [mostrarExplicacion, setMostrarExplicacion] = useState(false);

    useEffect(() => {
        if (plan?.idPlan) {
            cargarContenido();
        }
    }, [plan?.idPlan]);

    const cargarContenido = async () => {
        setRecargando(true);
        await getContenidoPlanTodo(plan.idPlan);
        setRecargando(false);
    };

    const contenidosAsignados = contenidoPlanTodo.filter(c => c.asignado).length;
    const contenidosNuevos = contenidoPlanTodo.filter(c => c.isNew).length;
    const contenidosExclusivos = contenidoPlanTodo.filter(c => c.isExclusive).length;

    const tieneContenidoNuevo = plan?.contenidoNuevo ?? 0;
    const tieneContenidoExclusivo = plan?.contenidoExclusivo ?? 0;

    const getConfiguracionTexto = () => {
        if (tieneContenidoNuevo === 1 && tieneContenidoExclusivo === 1) {
            return "TODO el contenido";
        } else if (tieneContenidoNuevo === 1 && tieneContenidoExclusivo === 0) {
            return "REGULAR + NUEVO";
        } else if (tieneContenidoNuevo === 0 && tieneContenidoExclusivo === 1) {
            return "REGULAR + EXCLUSIVO";
        } else {
            return "SOLO REGULAR";
        }
    };

    // 🔥 SOLO necesitas el idPlan - la lógica va en el backend
    const agregarContenidoAutomatico = async () => {
        if (!plan?.idPlan) return;

        try {
            setRecargando(true);
            // La lógica completa va en el backend con solo el idPlan
            console.log("Ejecutando lógica en BD para plan:", plan.idPlan);

            // Aquí llamas a tu endpoint del backend que hace toda la lógica
            // await tuEndpointAutomatico(plan.idPlan);
            configurarContenidoAutomatico(plan.idPlan);
            // Recargar para ver cambios
            await cargarContenido();
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setRecargando(false);
        }
    };

    if (!plan || !plan.idPlan) {
        return (
            <div className="p-6 text-center !text-red-700 !important">
                Error: Plan no encontrado
                <button
                    onClick={onClose}
                    className="mt-4 px-4 py-2 !bg-blue-800 !text-white rounded-md hover:!bg-blue-900 block mx-auto !important"
                >
                    Cerrar
                </button>
            </div>
        );
    }

    if (cargando || cargandoContenido) {
        return (
            <div className="p-6 text-center !text-gray-700 !important">
                Cargando contenido del plan...
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Fila Única: Detalle del Plan + Explicación */}
            <div className="!bg-gradient-to-r !from-blue-100 !to-indigo-100 rounded-lg !border !border-blue-300 overflow-hidden !important">
                <div className="flex">
                    {/* Detalle del Plan - Se hace más pequeño cuando hay explicación */}
                    <div className={`transition-all duration-300 ${mostrarExplicacion ? 'w-1/2' : 'w-full'} p-4`}>
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                    <h2 className="text-xl font-bold !text-blue-900 !important">{plan?.nombre || 'Plan no disponible'}</h2>
                                    <button
                                        onClick={() => setMostrarExplicacion(!mostrarExplicacion)}
                                        className="flex items-center justify-center w-8 h-8 !bg-blue-200 hover:!bg-blue-300 rounded-full !text-blue-800 text-sm font-bold !important"
                                        title="¿Cómo funciona?"
                                    >
                                        ?
                                    </button>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4 text-sm">
                                        <span className="!text-blue-800 font-medium !important">${plan?.precio || '0'}/mes</span>
                                        <span className="!text-blue-700 !important">{plan?.calidad || 'N/A'}</span>
                                        <span className="!text-blue-700 !important">👥 {plan?.maxPerfil || 0}</span>
                                    </div>
                                </div>

                                {/* Configuración compacta */}
                                <div className="flex gap-2 mt-3 text-xs">
                                    <div className={`px-2 py-1 rounded !important ${tieneContenidoNuevo === 1
                                        ? '!bg-green-700 !text-white !border-green-800'
                                        : '!bg-red-700 !text-white !border-red-800'}`}>
                                        🆕: {tieneContenidoNuevo === 1 ? 'SÍ' : 'NO'}
                                    </div>
                                    <div className={`px-2 py-1 rounded !important ${tieneContenidoExclusivo === 1
                                        ? '!bg-purple-700 !text-white !border-purple-800'
                                        : '!bg-red-700 !text-white !border-red-800'}`}>
                                        ⭐: {tieneContenidoExclusivo === 1 ? 'SÍ' : 'NO'}
                                    </div>
                                    <div className="px-2 py-1 rounded !bg-blue-700 !text-white !border-blue-800 !important">
                                        📦: {getConfiguracionTexto()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Explicación - Aparece al lado cuando se activa */}
                    {mostrarExplicacion && (
                        <div className="w-1/2 !bg-blue-200 !border-l !border-blue-400 p-4 !important">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-bold !text-blue-900 text-sm !important">🎯 Sistema Booleano</h4>
                                <button
                                    onClick={() => setMostrarExplicacion(false)}
                                    className="!text-blue-700 hover:!text-blue-900 text-sm !important"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="space-y-1 text-xs !text-blue-900 !important">
                                <div className="flex items-center">
                                    <span className="font-bold w-16 !bg-white !px-1 !py-0.5 rounded !border !border-gray-400 mr-2 text-center">0:NO 0:NO</span>
                                    <span>Solo <strong>REGULAR</strong></span>
                                </div>
                                <div className="flex items-center">
                                    <span className="font-bold w-16 !bg-white !px-1 !py-0.5 rounded !border !border-gray-400 mr-2 text-center">0:NO 1:SÍ</span>
                                    <span><strong>REGULAR + EXCLUSIVO</strong></span>
                                </div>
                                <div className="flex items-center">
                                    <span className="font-bold w-16 !bg-white !px-1 !py-0.5 rounded !border !border-gray-400 mr-2 text-center">1:SÍ 0:NO</span>
                                    <span><strong>REGULAR + NUEVO</strong></span>
                                </div>
                                <div className="flex items-center">
                                    <span className="font-bold w-16 !bg-white !px-1 !py-0.5 rounded !border !border-gray-400 mr-2 text-center">1:SÍ 1:SÍ</span>
                                    <span><strong>TODO</strong> el contenido</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Botones de Acción */}
            <div className="flex justify-between items-center">
                {/* Botón para agregar contenido automáticamente */}
                <button
                    onClick={agregarContenidoAutomatico}
                    disabled={recargando}
                    className={`flex items-center px-4 py-2 rounded-lg font-medium !important ${recargando
                        ? '!bg-gray-600 !text-white cursor-not-allowed'
                        : '!bg-green-700 hover:!bg-green-800 !text-white'
                        }`}
                >
                    {recargando ? (
                        <>
                            <span className="animate-spin mr-2">⟳</span>
                            Procesando...
                        </>
                    ) : (
                        <>
                            <span className="mr-2">⚡</span>
                            Aplicar Configuración Automática
                        </>
                    )}
                </button>

                {/* Botón para ver tabla completa */}
                <button
                    onClick={() => setMostrarTabla(!mostrarTabla)}
                    className="px-4 py-2 !bg-blue-700 hover:!bg-blue-800 !text-white rounded-lg font-medium !important"
                >
                    {mostrarTabla ? '🙈 Ocultar Tabla' : '👁️ Ver Tabla Completa'}
                </button>
            </div>

            {/* Estadísticas Rápidas */}
            <div className="grid grid-cols-3 gap-4">
                <div className="!bg-green-100 !border !border-green-400 p-4 rounded-lg text-center !important">
                    <div className="text-xl font-bold !text-green-800 !important">{contenidosAsignados}</div>
                    <div className="text-sm !text-green-700 !important">Total asignado</div>
                </div>
                <div className="!bg-blue-100 !border !border-blue-400 p-4 rounded-lg text-center !important">
                    <div className="text-xl font-bold !text-blue-800 !important">{contenidosNuevos}</div>
                    <div className="text-sm !text-blue-700 !important">Disponibles nuevos</div>
                </div>
                <div className="!bg-purple-100 !border !border-purple-400 p-4 rounded-lg text-center !important">
                    <div className="text-xl font-bold !text-purple-800 !important">{contenidosExclusivos}</div>
                    <div className="text-sm !text-purple-700 !important">Disponibles exclusivos</div>
                </div>
            </div>

            {/* Tabla de Gestión Específica */}
            {mostrarTabla && (
                <div className="!bg-white rounded-lg !border !border-gray-400 overflow-hidden !important">
                    <div className="p-4 !bg-gray-200 !border-b !border-gray-400 !important">
                        <h3 className="text-lg font-semibold !text-gray-900 !important">
                            Gestión Individual de Contenido
                        </h3>
                        <p className="text-sm !text-gray-700 mt-1 !important">
                            Usa los botones para agregar o quitar contenido específico
                        </p>
                    </div>
                    <TablaReutilizable
                        data={contenidoPlanTodo}
                        columnas={[
                            { key: "title", label: "Título" },
                            { key: "rating", label: "Rating" },
                            { key: "year", label: "Año" },
                            { key: "duracion", label: "Duración" },
                            { key: "asignado", label: "Asignado", isBoolean: true }
                        ]}
                        expandible={[
                            { key: "image", label: "Imagen" },
                            { key: "isNew", label: "Nuevo" },
                            { key: "isExclusive", label: "Exclusivo" },
                            { key: "descripcion", label: "Descripción" }
                        ]}
                        acciones={[
                            {
                                label: "Agregar",
                                variant: "success",
                                onClick: (item) => toggleContenidoPlan(item.idContenido, plan.idPlan, true),
                                show: (item) => !Boolean(item.asignado)
                            },
                            {
                                label: "Quitar",
                                variant: "danger",
                                onClick: (item) => toggleContenidoPlan(item.idContenido, plan.idPlan, false),
                                show: (item) => Boolean(item.asignado)
                            }
                        ]}
                        idKey="idContenido"
                    />
                </div>
            )}

            {/* Footer */}
            <div className="pt-4 !border-t !border-gray-400 text-center !important">
                <div className="text-sm !text-gray-800 !important">
                    {contenidosAsignados} contenidos asignados • {getConfiguracionTexto()}
                </div>
            </div>
        </div>
    );
}

export default SubModalGestionContenidoPlan;