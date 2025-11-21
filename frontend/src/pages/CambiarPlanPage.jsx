import { useState, useEffect } from 'react';
import { useAuth } from '../api/authContext';
import { useFetch } from '../api/useFetch';

function CambiarPlanPage() {
  const { usuario, pagoValido, maxPerfiles, verificarPago } = useAuth();
  const { getFetch, postFetch } = useFetch();
  const [planActual, setPlanActual] = useState(null);
  const [planesDisponibles, setPlanesDisponibles] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [planSeleccionado, setPlanSeleccionado] = useState(null);

  // Obtener plan actual y planes disponibles
  useEffect(() => {
    const cargarPlanes = async () => {
      try {
        setCargando(true);
        
        const [planesData, planActualData] = await Promise.all([
          getFetch('planes/listado'),
          getFetch(`planes/planActual/${usuario.idUsuario}`)
        ]);

        if (planesData.ok) {
          const planes = planesData.datos || [];
          setPlanesDisponibles(planes);
        }
        
        if (planActualData.ok) {
          setPlanActual(planActualData.datos);
          setPlanSeleccionado(planActualData.datos);
        }

      } catch (error) {
        console.error('Error cargando planes:', error);
      } finally {
        setCargando(false);
      }
    };

    if (usuario) cargarPlanes();
  }, [usuario]);

  const cambiarPlan = async () => {
    if (!planSeleccionado || planSeleccionado.idPlan === planActual?.idPlan) {
      alert('Por favor selecciona un plan diferente');
      return;
    }

    try {
      const response = await postFetch('planes/cambiarPlan', {
        idUsuario: usuario.idUsuario,
        idPlan: planSeleccionado.idPlan
      });

      if (response.ok) {
        alert(`¡Plan cambiado a ${planSeleccionado.nombre} exitosamente!`);
        // Actualizar estado de pago
        await verificarPago(usuario.idUsuario);
        // Recargar página
        window.location.reload();
      }
    } catch (error) {
      console.error('Error cambiando plan:', error);
      alert('Error al cambiar de plan');
    }
  };

  if (cargando) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center pt-20">
        <div className="text-white text-xl">Cargando planes...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Cambiar Plan</h1>
          <p className="text-gray-400 text-lg">
            Actualiza o modifica tu plan actual
          </p>
        </div>

        {/* Plan Actual */}
        {planActual && (
          <div className="bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl p-6 mb-8 text-white">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold mb-2">Plan Actual</h2>
                <p className="text-cyan-100">{planActual.nombre}</p>
                <div className="flex gap-4 mt-2 text-sm">
                  <span>💼 {maxPerfiles} perfiles</span>
                  <span>💰 ${planActual.precio}/mes</span>
                </div>
              </div>
              <div className="text-right">
                <span className="bg-white text-cyan-600 px-3 py-1 rounded-full font-bold text-sm">
                  Activo
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Planes Disponibles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {planesDisponibles.map((plan) => (
            <div
              key={plan.idPlan}
              onClick={() => setPlanSeleccionado(plan)}
              className={`bg-gray-800 rounded-xl p-6 border-2 cursor-pointer transition-all duration-300 ${
                planSeleccionado?.idPlan === plan.idPlan
                  ? 'border-cyan-500 shadow-2xl shadow-cyan-500/25'
                  : planActual?.idPlan === plan.idPlan
                  ? 'border-purple-500'
                  : 'border-gray-600 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/10'
              }`}
            >
              {/* Badge Plan Actual */}
              {planActual?.idPlan === plan.idPlan && (
                <div className="bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">
                  Tu Plan Actual
                </div>
              )}

              {/* Nombre y Precio */}
              <h3 className="text-xl font-bold text-white mb-2">{plan.nombre}</h3>
              <p className="text-3xl font-bold text-cyan-400 mb-4">
                ${plan.precio}
                <span className="text-sm text-gray-400">/mes</span>
              </p>

              {/* Características */}
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-gray-300">
                  <span className="text-green-400 mr-2">✓</span>
                  {plan.maxPerfiles} perfiles simultáneos
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="text-green-400 mr-2">✓</span>
                  Calidad {plan.calidad || 'HD'}
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="text-green-400 mr-2">✓</span>
                  Contenido {plan.exclusivo ? 'Exclusivo' : 'Estándar'}
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="text-green-400 mr-2">✓</span>
                  Sin anuncios
                </li>
              </ul>

              {/* Botón de selección */}
              <button
                className={`w-full py-3 rounded-lg font-bold transition-all ${
                  planSeleccionado?.idPlan === plan.idPlan
                    ? 'bg-cyan-500 text-white hover:bg-cyan-600'
                    : planActual?.idPlan === plan.idPlan
                    ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
                disabled={planActual?.idPlan === plan.idPlan}
              >
                {planActual?.idPlan === plan.idPlan
                  ? 'Plan Actual'
                  : planSeleccionado?.idPlan === plan.idPlan
                  ? 'Seleccionado'
                  : 'Seleccionar'}
              </button>
            </div>
          ))}
        </div>

        {/* Botón para cambiar plan */}
        {planSeleccionado && planSeleccionado.idPlan !== planActual?.idPlan && (
          <div className="text-center">
            <button
              onClick={cambiarPlan}
              className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-cyan-500/25 transition-all hover:scale-105"
            >
              Cambiar a Plan {planSeleccionado.nombre} - ${planSeleccionado.precio}/mes
            </button>
            <p className="text-gray-400 mt-3">
              El cambio será efectivo inmediatamente
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CambiarPlanPage;