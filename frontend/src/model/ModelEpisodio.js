function ModelEpisodio(
  idEpisodio = 0,
  idTemporada = 0,
  capitulo = 0,
  title = '',
  image = '',
  videoUrl = '',
  duration = '',
  views = ''
) {
  return {
    idEpisodio,
    idTemporada,
    capitulo,
    title,
    image,
    videoUrl,
    duration,
    views
  };
}

export { ModelEpisodio };