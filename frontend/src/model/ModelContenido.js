function ModelContenido(
  idContenido = 0,
  title = '',
  image = '',
  rating = 0.0,
  year = 0,
  descripcion = '',
  duracion = '',
  temporadas = 0,
  episodios = 0,
  isNew = 0,
  isPopular = 0,
  isTrending = 0,
  isExclusive = 0,
  isFavorito = 0,
  idCategoria = 0
) {
  return {
    idContenido,
    title,
    image,
    rating,
    year,
    descripcion,
    duracion,
    temporadas,
    episodios,
    isNew,
    isPopular,
    isTrending,
    isExclusive,
    isFavorito,
    idCategoria
  };
}

export { ModelContenido };