export const todosLosContenidos = [
  // ANIMES
  {
    id: 1,
    title: "Attack on Titan",
    image: "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
    rating: 4.9,
    year: 2023,
    categoria: "Anime",
    generos: ["Acción", "Drama", "Ciencia Ficción"],
    descripcion: "La humanidad vive en ciudades rodeadas por enormes muros que los protegen de los titanes.",
    temporadas: 4,
    episodios: 24,
    isNew: true,
    isExclusive: true,
    // Datos para el reproductor
    tipo: "anime",
    temporadasDetalle: [
      {
        id: 1,
        nombre: "Temporada 1",
        videos: [
          {
            id: 1,
            title: "Episodio 1: Para ti, que renuncias a la humanidad",
            thumbnail: "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            duration: "24:15",
            views: "2.4M",
            numero: 1
          },
          {
            id: 2,
            title: "Episodio 2: Ese día",
            thumbnail: "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            duration: "23:45",
            views: "2.1M",
            numero: 2
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Demon Slayer: Kimetsu no Yaiba",
    image: "https://cdn.myanimelist.net/images/anime/1286/99889.jpg",
    rating: 4.8,
    year: 2023,
    categoria: "Anime",
    generos: ["Acción", "Aventura", "Fantasía"],
    descripcion: "Tanjiro Kamado se convierte en cazador de demonios para salvar a su hermana.",
    temporadas: 3,
    episodios: 26,
    isTrending: true,
    tipo: "anime",
    temporadasDetalle: [
      {
        id: 1,
        nombre: "Temporada 1",
        videos: [
          {
            id: 3,
            title: "Episodio 1: Crueldad",
            thumbnail: "https://cdn.myanimelist.net/images/anime/1286/99889.jpg",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
            duration: "23:30",
            views: "3.2M",
            numero: 1
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Jujutsu Kaisen",
    image: "https://cdn.myanimelist.net/images/anime/1171/109222.jpg",
    rating: 4.7,
    year: 2023,
    categoria: "Anime",
    generos: ["Acción", "Sobrenatural", "Aventura"],
    descripcion: "Estudiantes de hechicería luchan contra maldiciones en el mundo moderno.",
    temporadas: 2,
    episodios: 24,
    isPopular: true,
    tipo: "anime",
    temporadasDetalle: [
      {
        id: 1,
        nombre: "Temporada 1",
        videos: [
          {
            id: 4,
            title: "Episodio 1: Ryomen Sukuna",
            thumbnail: "https://cdn.myanimelist.net/images/anime/1171/109222.jpg",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
            duration: "24:00",
            views: "2.8M",
            numero: 1
          }
        ]
      }
    ]
  },

  // PELÍCULAS
  {
    id: 4,
    title: "Spider-Man: Across the Spider-Verse",
    image: "https://image.tmdb.org/t/p/w500/iiXliCeykkzmJ0Eg9RYJ7F2CWSz.jpg",
    rating: 4.7,
    year: 2023,
    categoria: "Película",
    generos: ["Animación", "Superhéroes", "Aventura", "Ciencia Ficción"],
    descripcion: "Miles Morales viaja a través del multiverso para unirse a Gwen Stacy.",
    duracion: "2:20:15",
    isNew: true,
    tipo: "pelicula",
    temporadasDetalle: [
      {
        id: 1,
        nombre: "Película Completa",
        videos: [
          {
            id: 5,
            title: "Spider-Man: Across the Spider-Verse",
            thumbnail: "https://image.tmdb.org/t/p/w500/iiXliCeykkzmJ0Eg9RYJ7F2CWSz.jpg",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
            duration: "2:20:15",
            views: "12.4M",
            numero: 1
          }
        ]
      }
    ]
  },
  {
    id: 5,
    title: "Avengers: Endgame",
    image: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    rating: 4.9,
    year: 2019,
    categoria: "Película",
    generos: ["Acción", "Superhéroes", "Ciencia Ficción", "Aventura"],
    descripcion: "Los Vengadores se reúnen para revertir el chasquido de Thanos.",
    duracion: "3:01:00",
    isPopular: true,
    tipo: "pelicula",
    temporadasDetalle: [
      {
        id: 1,
        nombre: "Película Completa",
        videos: [
          {
            id: 6,
            title: "Avengers: Endgame",
            thumbnail: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            duration: "3:01:00",
            views: "25.1M",
            numero: 1
          }
        ]
      }
    ]
  },

  // SERIES
  {
    id: 6,
    title: "Stranger Things",
    image: "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
    rating: 4.6,
    year: 2022,
    categoria: "Serie",
    generos: ["Ciencia Ficción", "Terror", "Drama", "Misterio"],
    descripcion: "Un grupo de niños se enfrenta a fuerzas sobrenaturales en su pueblo.",
    temporadas: 4,
    episodios: 34,
    isPopular: true,
    tipo: "serie",
    temporadasDetalle: [
      {
        id: 1,
        nombre: "Temporada 1",
        videos: [
          {
            id: 7,
            title: "Capítulo 1: La desaparición de Will Byers",
            thumbnail: "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            duration: "47:15",
            views: "15.2M",
            numero: 1
          }
        ]
      }
    ]
  },
  {
    id: 7,
    title: "The Last of Us",
    image: "https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg",
    rating: 4.7,
    year: 2023,
    categoria: "Serie",
    generos: ["Drama", "Post-apocalíptico", "Aventura", "Terror"],
    descripcion: "Un hombre y una niña en un mundo devastado por una infección.",
    temporadas: 1,
    episodios: 9,
    isTrending: true,
    tipo: "serie",
    temporadasDetalle: [
      {
        id: 1,
        nombre: "Temporada 1",
        videos: [
          {
            id: 8,
            title: "Episodio 1: Cuando estás perdido en la oscuridad",
            thumbnail: "https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
            duration: "58:20",
            views: "18.7M",
            numero: 1
          }
        ]
      }
    ]
  },

  // DORAMAS
  {
    id: 8,
    title: "Goblin: The Lonely and Great God",
    image: "https://i.mydramalist.com/4vz1W_4f.jpg",
    rating: 4.8,
    year: 2016,
    categoria: "Dorama",
    generos: ["Romance", "Fantasía", "Drama"],
    descripcion: "Un inmortal goblin busca a su novia humana para poner fin a su inmortalidad.",
    episodios: 16,
    tipo: "dorama",
    temporadasDetalle: [
      {
        id: 1,
        nombre: "Temporada 1",
        videos: [
          {
            id: 9,
            title: "Episodio 1",
            thumbnail: "https://i.mydramalist.com/4vz1W_4f.jpg",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
            duration: "60:00",
            views: "5.2M",
            numero: 1
          }
        ]
      },
       {
        id: 2,
        nombre: "Temporada 2",
        videos: [
          {
            id: 9,
            title: "Episodio 1",
            thumbnail: "https://i.mydramalist.com/4vz1W_4f.jpg",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
            duration: "60:00",
            views: "5.2M",
            numero: 1
          }
        ]
      }
    ]
  }
];

// Función para buscar contenido por ID
export const getContenidoById = (id) => {
  return todosLosContenidos.find(contenido => contenido.id === parseInt(id));
};

// Función para obtener recomendaciones (misma categoría)
export const getRecomendaciones = (contenidoActual, limit = 4) => {
  return todosLosContenidos
    .filter(item => 
      item.id !== contenidoActual.id && 
      item.categoria === contenidoActual.categoria
    )
    .slice(0, limit);
};