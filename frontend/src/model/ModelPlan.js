function ModelPlan(
  idPlan = 0,
  nombre = '',
  precio = 0,
  maxPerfil = 0,
  calidad = 0,
  contenidoExclusivo = false,
  contenidoNuevo = false,
  sinAnuncios = false
) {
  return {
    idPlan,
    nombre,
    precio,
    maxPerfil,
    calidad,
    contenidoExclusivo,
    contenidoNuevo,
    sinAnuncios
  };
}

export { ModelPlan };
