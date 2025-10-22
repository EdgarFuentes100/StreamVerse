export const todosLosMangas = [
  {
    id: 1,
    title: "One Piece",
    image: "https://cdn.myanimelist.net/images/manga/2/253146.jpg",
    rating: 4.9,
    year: 1997,
    categoria: "Manga",
    generos: ["Aventura", "Acción", "Comedia", "Fantasía"],
    descripcion: "Monkey D. Luffy y su tripulación buscan el tesoro legendario One Piece para convertirse en el Rey de los Piratas.",
    sinopsis: "La historia sigue las aventuras de Monkey D. Luffy, un joven pirata con un cuerpo elástico después de comer una Fruta del Diablo. Junto a su diversa tripulación, los Piratas de Sombrero de Paja, Luffy explora el océano en busca del tesoro mundial definitivo conocido como 'One Piece' para convertirse en el próximo Rey de los Piratas.",
    autor: "Eiichiro Oda",
    artista: "Eiichiro Oda",
    estado: "En publicación",
    capitulos: 1100,
    volumnes: 104,
    editorial: "Shueisha",
    demografia: "Shōnen",
    isNew: false,
    isPopular: true,
    isFavorito: false,
    tipo: "manga",
    capitulosDetalle: [
      {
        id: 1,
        volumen: 1,
        titulo: "Romance Dawn",
        numero: 1,
        paginas: 192,
        fechaPublicacion: "1997-12-24",
        imagen: "https://cdn.myanimelist.net/images/manga/2/253146.jpg",
        descripcion: "El inicio de la aventura de Luffy",
        archivoUrl: "/mangas/one-piece/vol1.pdf",
        leido: false,
        duracion: "45 min"
      },
      {
        id: 2,
        volumen: 1,
        titulo: "El Hombre Pirata",
        numero: 2,
        paginas: 192,
        fechaPublicacion: "1997-12-24",
        imagen: "https://cdn.myanimelist.net/images/manga/2/253146.jpg",
        descripcion: "Luffy conoce a Zoro",
        archivoUrl: "/mangas/one-piece/vol1.pdf",
        leido: false,
        duracion: "42 min"
      },
      {
        id: 3,
        volumen: 2,
        titulo: "Buggy el Payaso",
        numero: 3,
        paginas: 200,
        fechaPublicacion: "1998-01-21",
        imagen: "https://cdn.myanimelist.net/images/manga/2/253146.jpg",
        descripcion: "Enfrentamiento con Buggy",
        archivoUrl: "/mangas/one-piece/vol2.pdf",
        leido: false,
        duracion: "48 min"
      }
    ],
    temporadasDetalle: [
      {
        id: 1,
        nombre: "Saga East Blue",
        videos: [
          {
            id: 1,
            title: "Capítulo 1: Romance Dawn",
            thumbnail: "https://cdn.myanimelist.net/images/manga/2/253146.jpg",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            duration: "15:20",
            views: "1.2M",
            numero: 1
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Attack on Titan",
    image: "https://cdn.myanimelist.net/images/manga/2/37846.jpg",
    rating: 4.8,
    year: 2009,
    categoria: "Manga",
    generos: ["Acción", "Drama", "Ciencia Ficción", "Horror"],
    descripcion: "La humanidad lucha por sobrevivir contra los titanes en ciudades amuralladas.",
    sinopsis: "Hace cien años, aparecieron los Titanes, seres humanoides gigantescos que devoran humanos sin razón aparente. Lo que queda de la humanidad ahora vive dentro de tres murallas concéntricas: Maria, Rose y Sina. Eren Yeager, Mikasa Ackerman y Armin Arlert se unen al Cuerpo de Exploración para luchar contra los Titanes y descubrir la verdad detrás de su existencia.",
    autor: "Hajime Isayama",
    artista: "Hajime Isayama",
    estado: "Completado",
    capitulos: 139,
    volumnes: 34,
    editorial: "Kodansha",
    demografia: "Shōnen",
    isNew: false,
    isTrending: true,
    isFavorito: true,
    tipo: "manga",
    capitulosDetalle: [
      {
        id: 4,
        volumen: 1,
        titulo: "Para ti, que renuncias a la humanidad",
        numero: 1,
        paginas: 190,
        fechaPublicacion: "2009-09-09",
        imagen: "https://cdn.myanimelist.net/images/manga/2/37846.jpg",
        descripcion: "El comienzo del ataque titán",
        archivoUrl: "/mangas/attack-on-titan/vol1.pdf",
        leido: true,
        duracion: "38 min"
      }
    ]
  },
  {
    id: 3,
    title: "Demon Slayer: Kimetsu no Yaiba",
    image: "https://cdn.myanimelist.net/images/manga/3/204936.jpg",
    rating: 4.7,
    year: 2016,
    categoria: "Manga",
    generos: ["Acción", "Aventura", "Fantasía", "Sobrenatural"],
    descripcion: "Tanjiro Kamado se convierte en cazador de demonios para salvar a su hermana.",
    sinopsis: "Tanjiro Kamado es un joven que vive con su familia en las montañas. Un día, al regresar a casa, descubre que su familia ha sido masacrada por demonios, excepto su hermana Nezuko, quien se ha convertido en un demonio. Decidido a vengar a su familia y encontrar una cura para Nezuko, Tanjiro se une a los Cazadores de Demonios.",
    autor: "Koyoharu Gotouge",
    artista: "Koyoharu Gotouge",
    estado: "Completado",
    capitulos: 205,
    volumnes: 23,
    editorial: "Shueisha",
    demografia: "Shōnen",
    isNew: true,
    isFavorito: false,
    tipo: "manga",
    capitulosDetalle: [
      {
        id: 5,
        volumen: 1,
        titulo: "Crueldad",
        numero: 1,
        paginas: 195,
        fechaPublicacion: "2016-02-15",
        imagen: "https://cdn.myanimelist.net/images/manga/3/204936.jpg",
        descripcion: "La tragedia de la familia Kamado",
        archivoUrl: "/mangas/demon-slayer/vol1.pdf",
        leido: false,
        duracion: "40 min"
      }
    ]
  }
];

export const getMangaById = (id) => {
  return todosLosMangas.find(manga => manga.id === parseInt(id));
};

export const getMangasRecomendaciones = (mangaActual, limit = 4) => {
  return todosLosMangas
    .filter(item => item.id !== mangaActual.id)
    .slice(0, limit);
};

export const toggleFavorito = (mangaId) => {
  const manga = todosLosMangas.find(m => m.id === mangaId);
  if (manga) {
    manga.isFavorito = !manga.isFavorito;
  }
  return manga?.isFavorito;
};