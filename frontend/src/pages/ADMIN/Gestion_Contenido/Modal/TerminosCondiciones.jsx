import React from "react";

function TerminosCondiciones() {
    return (
        <>
            {/* Body del modal */}
            <div className="modal-body py-4" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                <div className="space-y-4">
                    <section>
                        <h6 className="!text-cyan-600 fw-bold mb-2">1. Aceptación de los Términos</h6>
                        <p className="!text-gray-700 mb-0">
                            El presente Aviso Legal regula el acceso y uso de la plataforma digital Nex View,
                            un servicio en línea que ofrece a los usuarios acceso a contenido audiovisual en
                            modalidad de suscripción. El uso de la plataforma implica la aceptación plena de
                            las condiciones aquí descritas.
                        </p>
                    </section>

                    <section>
                        <h6 className="!text-cyan-600 fw-bold mb-2">2. Uso del Servicio</h6>
                        <p className="!text-gray-700 mb-0">
                            El usuario se compromete a utilizar la plataforma de forma lícita, responsable y
                            conforme a la legislación vigente, evitando cualquier acción que pueda afectar su
                            funcionamiento, vulnerar derechos de propiedad intelectual o causar perjuicios a terceros.
                        </p>
                    </section>

                    <section>
                        <h6 className="!text-cyan-600 fw-bold mb-2">3. Propiedad Intelectual</h6>
                        <p className="!text-gray-700 mb-0">
                            Todo el contenido disponible en Nex View, incluyendo imágenes, nombres, producciones,
                            marcas, logotipos, diseños, interfaces y material audiovisual, está protegido por las
                            leyes de propiedad intelectual y su uso no autorizado queda estrictamente prohibido.
                        </p>
                    </section>

                    <section>
                        <h6 className="!text-cyan-600 fw-bold mb-2">4. Suscripciones y Pagos</h6>
                        <p className="!text-gray-700 mb-0">
                            Nex View opera bajo un modelo de suscripción. Los usuarios aceptan pagar las tarifas
                            aplicables de manera recurrente según el plan seleccionado. Las suscripciones se
                            renuevan automáticamente hasta que sean canceladas por el usuario.
                        </p>
                    </section>

                    <section>
                        <h6 className="!text-cyan-600 fw-bold mb-2">5. Limitación de Responsabilidad</h6>
                        <p className="!text-gray-700 mb-0">
                            Nex View no se hace responsable por interrupciones temporales del servicio, pérdida
                            de datos o cualquier daño indirecto que pueda surgir del uso de la plataforma.
                            El usuario acepta utilizar el servicio bajo su propio riesgo.
                        </p>
                    </section>

                    <section>
                        <h6 className="!text-cyan-600 fw-bold mb-2">6. Modificaciones del Servicio</h6>
                        <p className="!text-gray-700 mb-0">
                            Nex View se reserva el derecho de modificar, suspender o discontinuar cualquier
                            aspecto del servicio en cualquier momento, incluyendo la disponibilidad de
                            características específicas o contenido.
                        </p>
                    </section>

                    <section>
                        <h6 className="!text-cyan-600 fw-bold mb-2">7. Privacidad y Datos</h6>
                        <p className="!text-gray-700 mb-0">
                            La información personal de los usuarios será tratada de acuerdo con nuestra
                            Política de Privacidad. Al utilizar Nex View, usted acepta el procesamiento
                            de sus datos según lo establecido en dicha política.
                        </p>
                    </section>

                    <section>
                        <h6 className="!text-cyan-600 fw-bold mb-2">8. Terminación</h6>
                        <p className="!text-gray-700 mb-0">
                            Nex View se reserva el derecho de terminar o suspender el acceso de cualquier
                            usuario que viole estos términos y condiciones, sin previo aviso y a su sola discreción.
                        </p>
                    </section>

                    <div className="!bg-yellow-50 !border !border-yellow-200 rounded p-3 mt-4">
                        <p className="!text-yellow-800 mb-0 text-sm">
                            <strong>Nota importante:</strong> Al utilizar Nex View, usted reconoce haber leído,
                            entendido y aceptado todos los términos y condiciones aquí establecidos.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TerminosCondiciones;