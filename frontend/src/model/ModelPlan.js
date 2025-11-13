function ModelPlan(
  idPlan = 0,
  nombre = '',
  precio = 0,
  maxPerfil = 0,
  cantidad = 0
) {
  return {
    idPlan,
    nombre,
    precio,
    maxPerfil,
    cantidad
  };
}

export { ModelPlan };