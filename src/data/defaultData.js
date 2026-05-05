export const navItems = [
  { to: '/', label: 'Inicio' },
  { to: '/studio', label: 'Studio fotografico digital' },
  { to: '/recursos', label: 'Recursos' },
  { to: '/helps', label: 'Helps educativa' },
  { to: '/ebooks', label: 'eBook' },
  { to: '/cursos', label: 'Cursos' },
  { to: '/trabajos', label: 'Trabajos' },
]

export const studioCategories = ['Fotos', 'Videos']
export const marketingCategories = ['Plantillas', 'Videos', 'Diapositivas']
export const aspectRatios = ['1:1', '16:9', '9:16', 'auto']
export const publicationTypes = ['Entrada', 'Pagina interna', 'Enlace externo', 'PDF']
export const publishStatuses = ['Publicado', 'Privado', 'Borrador']
export const contentTypes = ['Entrada', 'Imagen', 'Video', 'Enlace externo', 'PDF']
export const resourceAccessTypes = ['Gratis', 'De pago']
export const destinationSections = ['Inicio', 'Studio', 'Recursos', 'Helps', 'eBooks', 'Cursos', 'Trabajos']
export const destinationSectionOptions = [
  { value: 'Inicio', label: 'Inicio' },
  { value: 'Studio', label: 'Studio fotografico digital' },
  { value: 'Recursos', label: 'Recursos' },
  { value: 'Helps', label: 'Helps educativa' },
  { value: 'eBooks', label: 'eBook' },
  { value: 'Cursos', label: 'Cursos' },
  { value: 'Trabajos', label: 'Trabajos' },
]

export const defaultData = {
  site: {
    brandName: 'Digishop Press Multiverse',
    heroTitle: 'Digishop Press Multiverse',
    heroText:
      'Un espacio moderno para fotografia digital, ayuda educativa, libros, cursos y trabajos creativos.',
    logo: '',
    heroMediaType: 'image',
    heroMedia:
      'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1600&q=80',
    paypalUrl: '',
  },
  publications: [],
  pages: [
    {
      id: 'page-about',
      title: 'Sobre nosotros',
      slug: 'sobre-nosotros',
      summary: 'Conoce Digishop Press Multiverse, su mision y su vision.',
      content:
        'Digishop Press Multiverse es un espacio creativo y educativo pensado para compartir recursos digitales, fotografia, aprendizaje y contenido de valor.\n\nMision:\nOfrecer recursos y servicios digitales utiles, accesibles y bien presentados para apoyar a estudiantes, emprendedores y personas creativas.\n\nVision:\nConvertirse en un multiverso digital donde convivan la educacion, la creatividad, los recursos visuales y las soluciones practicas para distintos tipos de publico.',
      status: 'Publicado',
      targetSection: '',
      coverImage: '',
      videoUrl: '',
      pdfFile: '',
      tags: ['sobre nosotros', 'mision', 'vision'],
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
    title: 'Recursos',
    description:
      'Catalogo de recursos visuales, plantillas, diapositivas y materiales digitales para mostrar, vender o compartir.',
    items: {
      Plantillas: [],
      Videos: [],
      Diapositivas: [],
    },
  },
  helps: {
    title: 'Helps educativa',
    description: 'Espacio limpio para que publiques recursos educativos, entradas, videos, enlaces y archivos.',
    tabs: [],
    items: [],
  },
  ebooks: {
    title: 'Biblioteca digital',
    description: 'Coleccion de libros con portada, descripcion y enlace.',
    items: [],
  },
  courses: {
    title: 'Cursos completos y tutoriales',
    description: 'Cursos, carpetas y tutoriales organizados para aprender paso a paso.',
    items: [],
  },
  jobs: {
    title: 'Trabajos y servicios',
    description: 'Servicios, propuestas y trabajos realizados.',
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
