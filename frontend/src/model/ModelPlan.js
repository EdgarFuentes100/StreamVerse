function ModelPlan(
  idPlan = 0,
  nombre = '',
  precio = 0,
  maxPerfil = 0,
  calidad = 0
) {
  return {
    idPlan,
    nombre,
    precio,
    maxPerfil,
    calidad
  };
}

export { ModelPlan };