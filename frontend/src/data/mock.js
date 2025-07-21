// Mock data para Stepgy - Proyecto tecnológico escolar

export const stepgyData = {
  hero: {
    title: "Stepgy – Energía con tus pasos",
    subtitle: "Una baldosa que transforma el movimiento humano en electricidad",
    cta: "Conocé el proyecto"
  },

  about: {
    title: "¿Qué es Stepgy?",
    content: "Stepgy es una baldosa inteligente que convierte las pisadas humanas en energía eléctrica mediante sensores piezoeléctricos. Está pensada para espacios públicos, plazas y sectores con alto tránsito, y su objetivo es fomentar el uso de energías limpias a través de una solución innovadora y educativa."
  },

  problem: {
    title: "Problemática",
    content: "En zonas urbanas se desperdicia energía cinética constantemente. Al mismo tiempo, el consumo de electricidad en espacios públicos sigue aumentando y proviene en gran parte de fuentes no renovables. Stepgy propone aprovechar esa energía de forma sustentable."
  },

  solution: {
    title: "Cómo lo resolvemos",
    subtitle: "Nuestra solución innovadora",
    steps: [
      {
        id: 1,
        title: "Captación de Energía",
        description: "Captamos energía de las pisadas con sensores piezoeléctricos.",
        icon: "Zap"
      },
      {
        id: 2,
        title: "Conversión AC/DC",
        description: "Convertimos la energía alterna en continua con diodos Schottky.",
        icon: "RefreshCw"
      },
      {
        id: 3,
        title: "Elevación de Voltaje",
        description: "Elevamos el voltaje con un módulo Step-Up.",
        icon: "TrendingUp"
      },
      {
        id: 4,
        title: "Almacenamiento",
        description: "Almacenamos la energía en supercapacitores y alimentamos luces de emergencia.",
        icon: "Battery"
      }
    ]
  },

  technology: {
    title: "Tecnología",
    subtitle: "Componentes técnicos del proyecto",
    components: [
      {
        name: "Sensores Piezoeléctricos",
        description: "10 sensores de 50 mm para captación de energía",
        icon: "Cpu"
      },
      {
        name: "Diodos Schottky",
        description: "Para conversión de corriente alterna a continua",
        icon: "Zap"
      },
      {
        name: "Módulo Step-Up",
        description: "Elevación del voltaje para mejor rendimiento",
        icon: "ArrowUp"
      },
      {
        name: "Supercapacitor",
        description: "Almacenamiento eficiente de la energía generada",
        icon: "Battery"
      }
    ],
    performance: "Cinco baldosas pueden generar hasta 250 V y 1.5 A en horas pico"
  },

  prototype: {
    title: "Prototipo y avances",
    content: "Tras varias pruebas, se incorporó un módulo Step-Up para mejorar el rendimiento. El diseño físico se adaptó para alojar los cables, el circuito y una salida tipo tomacorriente.",
    images: [
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=300&fit=crop"
    ]
  },

  team: {
    title: "Equipo",
    subtitle: "Los estudiantes detrás del proyecto",
    members: [
      {
        name: "Alejo Chaile",
        role: "Coordinación y programación",
        description: "Líder del proyecto y desarrollo de software"
      },
      {
        name: "Santino Biato",
        role: "Diseño físico y prototipo",
        description: "Diseño mecánico y construcción del prototipo"
      },
      {
        name: "Uriel Arellano",
        role: "Electrónica y pruebas técnicas",
        description: "Circuitos eléctricos y validación técnica"
      },
      {
        name: "Joaquín Ortega",
        role: "Investigación, redacción y redes",
        description: "Investigación científica y comunicación"
      }
    ]
  },

  gallery: {
    title: "Galería",
    subtitle: "Imágenes del proyecto y desarrollo",
    categories: [
      {
        name: "Prototipo",
        images: [
          "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
          "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop"
        ]
      },
      {
        name: "Ferias escolares",
        images: [
          "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop"
        ]
      },
      {
        name: "Esquemas técnicos",
        images: [
          "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop",
          "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=400&h=300&fit=crop"
        ]
      }
    ]
  },

  contact: {
    title: "Contacto",
    subtitle: "Conectate con nosotros",
    info: {
      instagram: "@stepgy.proyecto",
      email: "stepgycontacto@gmail.com",
      location: "Merlo, Buenos Aires, Argentina"
    },
    form: {
      fields: ["name", "email", "message"],
      submitText: "Enviar mensaje"
    }
  },

  footer: {
    text: "Stepgy – Proyecto escolar sustentable desde Merlo, Buenos Aires.",
    year: "© 2025"
  }
};

export default stepgyData;