import React, { useState, useEffect } from 'react';
import SubModal from "../../../components/SubModal";
import TablaReutilizable from "../../../components/TablaReutilizable";
import SubModalGestionContenidoPlan from "./Modal/SubModalGestionContenidoPlan";
import { usePlan } from '../../../data/usePlan';
import { useContenidoPlan } from '../../../data/useContenidoPlan';

const GestionContenidoPlan = () => {
    const { plan } = usePlan(); // ✅ planes en plural sería mejor
    const {
        getContenidoPlanSolo,
        contenidoPlanSolo,
        cargando
    } = useContenidoPlan(); // ✅ Agregar las funciones que faltan

    const [showSubModal, setShowSubModal] = useState(false);
    const [planActual, setPlanActual] = useState(null);
    const [planSeleccionado, setPlanSeleccionado] = useState(null); // ✅ FALTABA ESTE STATE

    // Abrir modal para un plan específico
    const abrirModal = (plan) => {
        setPlanSeleccionado(plan.idPlan);
        setPlanActual(plan);
        setShowSubModal(true);
    };

    // Actualizar planActual si cambia planSeleccionado
    useEffect(() => {
        if (planSeleccionado) {
            const planEncontrado = plan.find(p => p.idPlan === planSeleccionado); // ✅ Cambié 'plan' por 'planEncontrado'
            setPlanActual(planEncontrado);
            getContenidoPlanSolo(planSeleccionado); // ✅ Llamar a la función para cargar contenido
        }
    }, [planSeleccionado, plan]);

    const cerrarModal = () => {
        setShowSubModal(false);
    };

    const handleContinue = () => {
        console.log('💾 Guardando cambios para el plan:', planActual);
        cerrarModal();
    };

    return (
        <div className="container-fluid p-3 pt-24">
            <h1 className="text-2xl font-bold text-white mb-6">Gestión de Contenido por Plan</h1>

            {/* Selector de Plan */}
            <div className="!bg-gray-800 rounded-lg p-6 mb-6 border border-gray-700">
                <h2 className="text-lg font-semibold text-white mb-4">Seleccionar Plan</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {plan.map(planItem => ( // ✅ Cambié 'plan' por 'planItem' para evitar conflicto
                        <div
                            key={planItem.idPlan}
                            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${planSeleccionado === planItem.idPlan
                                ? 'border-blue-500 !bg-blue-900 bg-opacity-20'
                                : 'border-gray-600 !bg-gray-700 hover:border-gray-500'
                                }`}
                            onClick={() => setPlanSeleccionado(planItem.idPlan)} // ✅ Solo seleccionar, no cargar contenido aquí
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-lg font-semibold text-white">{planItem.nombre}</h3>
                                    <p className="text-2xl font-bold text-blue-400">${planItem.precio}</p>
                                </div>
                                <div className="flex flex-col items-end space-y-2">
                                    {planSeleccionado === planItem.idPlan && (
                                        <span className="!bg-blue-500 text-white px-2 py-1 rounded-full text-xs">Seleccionado</span>
                                    )}
                                    {/* 🔘 BOTÓN PARA ABRIR MODAL */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            abrirModal(planItem);
                                        }}
                                        className="!bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
                                    >
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        Gestionar
                                    </button>
                                </div>
                            </div>
                            <div className="mt-2 text-sm text-gray-300">
                                <p>Calidad: {planItem.calidad}</p>
                                <p>Máx. {planItem.maxPerfil} perfil{planItem.maxPerfil > 1 ? 'es' : ''}</p>

                                {/* ✅ AGREGAR ESTOS DOS CAMPOS NUEVOS */}
                                <div className="flex gap-2 mt-1">
                                    {planItem.contenidoNuevo > 0 && (
                                        <span className="bg-green-900 text-green-200 px-2 py-1 rounded text-xs">
                                            🆕 {planItem.contenidoNuevo} nuevo{planItem.contenidoNuevo > 1 ? 's' : ''}
                                        </span>
                                    )}
                                    {planItem.contenidoExclusivo > 0 && (
                                        <span className="bg-purple-900 text-purple-200 px-2 py-1 rounded text-xs">
                                            ⭐ {planItem.contenidoExclusivo} exclusivo{planItem.contenidoExclusivo > 1 ? 's' : ''}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 📋 TABLA ORIGINAL */}
            {planSeleccionado && (
                <div className="!bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-white">
                            Contenido del Plan: {plan.find(p => p.idPlan === planSeleccionado)?.nombre}
                        </h2>
                        <div className="flex items-center space-x-4">
                            {/* BOTÓN PARA ABRIR MODAL DESDE LA TABLA */}
                            <button
                                onClick={() => {
                                    const planEncontrado = plan.find(p => p.idPlan === planSeleccionado);
                                    abrirModal(planEncontrado);
                                }}
                                className="!bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Abrir Gestor
                            </button>
                            <span className="text-sm text-gray-300">
                                {contenidoPlanSolo.length} contenidos asignados {/* ✅ Cambié contenidos por contenidoPlanSolo */}
                            </span>
                        </div>
                    </div>

                    {cargando ? (
                        <div className="flex justify-center items-center h-32 text-white">Cargando contenido...</div>
                    ) : (
                        <TablaReutilizable
                            data={contenidoPlanSolo}
                            columnas={[
                                { key: "title", label: "Título" },
                                { key: "rating", label: "Rating" },
                                { key: "year", label: "Año" },
                                { key: "duracion", label: "Duración" },
                                { key: "isNew", label: "Nuevo", isBoolean: true },
                                { key: "isExclusive", label: "Exclusivo", isBoolean: true }
                            ]}
                            acciones={[
                                {
                                    label: "Quitar",
                                    variant: "danger",
                                    onClick: (item) => toggleContenidoPlan(item.idContenido, plan.idPlan, false)
                                }
                            ]}
                            idKey="idContenido"
                        />
                    )}
                </div>
            )}

            {/* 🪟 SubModal */}
            <SubModal
                show={showSubModal}
                handleContinue={handleContinue}
                handleClose={cerrarModal}
                titulo={`Gestionar Contenido - ${planActual?.nombre || 'Plan'}`}
                width={1200}
                continueText="Guardar Cambios"
                cancelText="Cancelar"
                continueVariant="success"
                backdrop={true}
                scrollable={true}
                centered={true}
            >
                <SubModalGestionContenidoPlan
                    plan={planActual}
                    onClose={cerrarModal}
                    cargando={cargando}
                />
            </SubModal>

            {/* Mensaje cuando no hay plan seleccionado */}
            {!planSeleccionado && (
                <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 text-center">
                    <div className="text-gray-400 text-lg mb-2">👆</div>
                    <h3 className="text-xl font-semibold text-white mb-2">Selecciona un Plan</h3>
                    <p className="text-gray-400">Elige un plan de la lista superior para gestionar su contenido</p>
                </div>
            )}
        </div>
    );
};

export default GestionContenidoPlan;