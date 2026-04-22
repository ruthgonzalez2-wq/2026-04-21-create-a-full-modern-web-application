export const navItems = [
  { to: '/', label: 'Inicio' },
  { to: '/studio', label: 'Studio fotografico digital' },
  { to: '/marketing', label: 'Marketing' },
  { to: '/helps', label: 'Helps educativa' },
  { to: '/ebooks', label: 'eBook' },
  { to: '/cursos', label: 'Cursos' },
  { to: '/trabajos', label: 'Trabajos' },
]

export const studioCategories = ['Fotos', 'Videos']
export const marketingCategories = ['Imagenes', 'Videos', 'Campanas']
export const helpsCategories = ['Juegos educativos', 'Tareas por encargo', 'Tutoriales']
export const helpsSubjects = ['Matematicas', 'Lengua', 'Ciencias']
export const aspectRatios = ['1:1', '16:9', '9:16', 'auto']

export const defaultData = {
  site: {
    heroTitle: 'Digishoppress Multiverse',
    heroText:
      'Un espacio moderno para fotografia digital, ayuda educativa, libros, cursos y trabajos creativos.',
    logo: '',
    heroMediaType: 'image',
    heroMedia:
      'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1600&q=80',
  },
  publications: [
    {
      id: 'pub-1',
      title: 'Bienvenida',
      description: 'Este es el espacio principal del sitio para mostrar novedades y contenido importante.',
      image:
        'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
      category: 'Novedad',
    },
  ],
  studio: {
    title: 'Digishoppress Fotografico',
    description:
      'Servicio completamente online donde puedes enviar tus fotos y recibirlas editadas profesionalmente para uso digital.',
    items: {
      Fotos: [],
      Videos: [],
    },
  },
  marketing: {
    title: 'Marketing Digishoppress',
    description:
      'Area dedicada a piezas de marketing, campañas visuales, videos promocionales y recursos comerciales.',
    items: {
      Imagenes: [],
      Videos: [],
      Campanas: [],
    },
  },
  helps: {
    title: 'Helps educativa',
    description: 'Recursos organizados por categoria y materia.',
    items: {
      'Juegos educativos': {
        Matematicas: [],
        Lengua: [],
        Ciencias: [],
      },
      'Tareas por encargo': {
        Matematicas: [],
        Lengua: [],
        Ciencias: [],
      },
      Tutoriales: {
        Matematicas: [],
        Lengua: [],
        Ciencias: [],
      },
    },
  },
  ebooks: {
    title: 'Biblioteca digital',
    description: 'Coleccion de libros con portada, descripcion y enlace.',
    items: [],
  },
  courses: {
    title: 'Cursos completos y tutoriales',
    description: 'Cursos, carpetas y tutoriales organizados desde el panel.',
    items: [],
  },
  jobs: {
    title: 'Trabajos y servicios',
    description: 'Publica servicios, propuestas y trabajos realizados.',
    items: [],
  },
  legal: {
    termsTitle: 'Terms and Conditions',
    termsText:
      'Los contenidos y servicios mostrados en este sitio pueden cambiar sin previo aviso y deben confirmarse antes de cualquier contratacion.',
    privacyTitle: 'Privacy Policy',
    privacyText:
      'Esta aplicacion usa almacenamiento local del navegador para guardar cambios y preferencias del sitio.',
  },
}
