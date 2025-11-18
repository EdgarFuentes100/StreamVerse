import { useAuth } from "../api/authContext";
import { usePago } from "./usePago";

export const usePayPal = () => {
    const { crearPago } = usePago();
    const { usuario } = useAuth();

    const calcularPeriodoSuscripcion = (fechaPago) => {
        const inicio = new Date(fechaPago);
        const fin = new Date(fechaPago);
        fin.setMonth(fin.getMonth() + 1);
        fin.setDate(fin.getDate() - 1);

        return {
            periodoInicio: inicio.toISOString().split('T')[0],
            periodoFin: fin.toISOString().split('T')[0]
        };
    };

    const procesarPagoExitoso = async (planSeleccionado, details) => {
        try {
            if (!usuario?.idCuenta) {
                throw new Error('Usuario no autenticado. Por favor, inicia sesión nuevamente.');
            }

            if (!planSeleccionado?.precio || !planSeleccionado?.idPlan) {
                throw new Error('Información del plan inválida.');
            }

            if (!details?.id) {
                throw new Error('No se recibió confirmación del pago.');
            }

            const fechaPago = new Date();
            const periodo = calcularPeriodoSuscripcion(fechaPago);

            const body = {
                idCuenta: usuario.idCuenta,
                idPlan: planSeleccionado.idPlan,
                monto: parseFloat(planSeleccionado.precio),
                fechaPago: fechaPago.toISOString(),
                periodoInicio: periodo.periodoInicio,
                periodoFin: periodo.periodoFin,
                estado: 'Completado',
                metodoPago: 'PayPal',
                referencia: details.id,
                detalles: JSON.stringify({
                    payer: details.payer,
                    plan: planSeleccionado.nombre
                })
            };

            const resultado = await crearPago(body);
            
            if (!resultado) {
                throw new Error('No se pudo registrar el pago en el sistema.');
            }

            return { 
                success: true, 
                message: `¡Pago exitoso! Plan ${planSeleccionado.nombre} activado correctamente.` 
            };
            
        } catch (error) {
            console.error("Error procesando pago PayPal:", error);
            return { 
                success: false, 
                message: error.message || "Error al procesar el pago. Por favor, contacta al soporte." 
            };
        }
    };

    return {
        procesarPagoExitoso
    };
};