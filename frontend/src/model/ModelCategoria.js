function ModelCategoria(
  idCategoria = 0,
  nombre = '',
  icon = '',
  cantidad = ''
) {
  return {
    idCategoria,
    nombre,
    icon,
    cantidad
  };
}

export { ModelCategoria };