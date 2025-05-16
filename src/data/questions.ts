// Enhanced question format with category and chart mapping information
export interface Question {
  id: string;
  text: string;
  type:
    | "texto_abierto"
    | "seleccion"
    | "numero"
    | "email"
    | "fecha"
    | "escala"
    | "seleccion_multiple";
  respuestas?: Array<string | number>;
  category?: string;
  chartGroup?: string;
}

export interface QuestionsData {
  [key: string]: Question;
}

// Categories for organizing questions
export const categories = {
  companyInfo: "Información de la Empresa",
  governance: "Gobernanza de TI",
  strategy: "Estrategia y Planificación",
  implementation: "Implementación y Desarrollo",
  service: "Gestión de Servicios",
  improvement: "Mejora Continua",
  recommendations: "Recomendaciones",
  compliance: "Cumplimiento Normativo",
  monitoring: "Monitoreo",
};

// Chart groups for organizing data visualization
export const chartGroups = {
  overallScore: "Puntuación General",
  governanceScore: "Gobernanza de TI",
  strategyScore: "Estrategia y Planificación",
  implementationScore: "Implementación y Desarrollo",
  serviceScore: "Gestión de Servicios",
  improvementScore: "Mejora Continua",
  complianceStatus: "Estado de Cumplimiento",
};

export const questionsData: QuestionsData = {
  q01: {
    id: "q01",
    text: "Nombre de la empresa:",
    type: "texto_abierto",
    category: categories.companyInfo,
  },
  q02: {
    id: "q02",
    text: "Sector o industria:",
    type: "seleccion",
    respuestas: [
      "Salud",
      "Finanzas",
      "Educación",
      "Tecnología",
      "Manufactura",
      "Otro",
    ],
    category: categories.companyInfo,
  },
  q03: {
    id: "q03",
    text: "Número de empleados:",
    type: "numero",
    category: categories.companyInfo,
  },
  q04: {
    id: "q04",
    text: "Persona responsable de TI (nombre):",
    type: "texto_abierto",
    category: categories.companyInfo,
  },
  q05: {
    id: "q05",
    text: "Correo electrónico responsable:",
    type: "email",
    category: categories.companyInfo,
  },
  q06: {
    id: "q06",
    text: "Fecha de evaluación:",
    type: "fecha",
    category: categories.companyInfo,
  },

  q07: {
    id: "q07",
    text: "La dirección de la empresa revisa regularmente que las actividades de TI estén alineadas con los objetivos del negocio.",
    type: "escala",
    respuestas: [1, 2, 3, 4, 5],
    category: categories.governance,
    chartGroup: chartGroups.governanceScore,
  },
  q08: {
    id: "q08",
    text: "Se realizan evaluaciones periódicas del desempeño y cumplimiento de los procesos de TI.",
    type: "escala",
    respuestas: [1, 2, 3, 4, 5],
    category: categories.governance,
    chartGroup: chartGroups.governanceScore,
  },
  q09: {
    id: "q09",
    text: "Existen controles efectivos para proteger los activos tecnológicos.",
    type: "escala",
    respuestas: [1, 2, 3, 4, 5],
    category: categories.governance,
    chartGroup: chartGroups.governanceScore,
  },
  q10: {
    id: "q10",
    text: "La empresa cumple con las normativas legales y regulatorias aplicables en TI (ej. GDPR, ISO).",
    type: "escala",
    respuestas: [1, 2, 3, 4, 5],
    category: categories.governance,
    chartGroup: chartGroups.governanceScore,
  },

  q11: {
    id: "q11",
    text: "Existe un plan estratégico de TI alineado con la estrategia empresarial.",
    type: "escala",
    respuestas: [1, 2, 3, 4, 5],
    category: categories.strategy,
    chartGroup: chartGroups.strategyScore,
  },
  q12: {
    id: "q12",
    text: "Se gestionan adecuadamente los riesgos tecnológicos.",
    type: "escala",
    respuestas: [1, 2, 3, 4, 5],
    category: categories.strategy,
    chartGroup: chartGroups.strategyScore,
  },
  q13: {
    id: "q13",
    text: "Se asignan los recursos (humanos, técnicos, financieros) de forma óptima para proyectos TI.",
    type: "escala",
    respuestas: [1, 2, 3, 4, 5],
    category: categories.strategy,
    chartGroup: chartGroups.strategyScore,
  },
  q14: {
    id: "q14",
    text: "La empresa tiene políticas claras sobre gestión de requisitos y cambios en TI.",
    type: "escala",
    respuestas: [1, 2, 3, 4, 5],
    category: categories.strategy,
    chartGroup: chartGroups.strategyScore,
  },

  q15: {
    id: "q15",
    text: "Los proyectos TI son implementados según plan, cumpliendo tiempos y costos.",
    type: "escala",
    respuestas: [1, 2, 3, 4, 5],
    category: categories.implementation,
    chartGroup: chartGroups.implementationScore,
  },
  q16: {
    id: "q16",
    text: "Se evalúa la capacidad y disponibilidad de los recursos tecnológicos.",
    type: "escala",
    respuestas: [1, 2, 3, 4, 5],
    category: categories.implementation,
    chartGroup: chartGroups.implementationScore,
  },
  q17: {
    id: "q17",
    text: "Los usuarios son capacitados adecuadamente en nuevas tecnologías o sistemas.",
    type: "escala",
    respuestas: [1, 2, 3, 4, 5],
    category: categories.implementation,
    chartGroup: chartGroups.implementationScore,
  },
  q18: {
    id: "q18",
    text: "Se realizan pruebas y validaciones antes de poner en producción nuevas soluciones.",
    type: "escala",
    respuestas: [1, 2, 3, 4, 5],
    category: categories.implementation,
    chartGroup: chartGroups.implementationScore,
  },

  q19: {
    id: "q19",
    text: "Se monitorea el desempeño y disponibilidad de los servicios TI.",
    type: "escala",
    respuestas: [1, 2, 3, 4, 5],
    category: categories.service,
    chartGroup: chartGroups.serviceScore,
  },
  q20: {
    id: "q20",
    text: "Existen procedimientos claros para la gestión de incidentes y problemas.",
    type: "escala",
    respuestas: [1, 2, 3, 4, 5],
    category: categories.service,
    chartGroup: chartGroups.serviceScore,
  },
  q21: {
    id: "q21",
    text: "Los usuarios reciben soporte oportuno y eficaz.",
    type: "escala",
    respuestas: [1, 2, 3, 4, 5],
    category: categories.service,
    chartGroup: chartGroups.serviceScore,
  },
  q22: {
    id: "q22",
    text: "Se gestionan adecuadamente los accesos y la seguridad de la información.",
    type: "escala",
    respuestas: [1, 2, 3, 4, 5],
    category: categories.service,
    chartGroup: chartGroups.serviceScore,
  },

  q23: {
    id: "q23",
    text: "Se revisan indicadores clave (KPIs) de los procesos TI con frecuencia.",
    type: "escala",
    respuestas: [1, 2, 3, 4, 5],
    category: categories.improvement,
    chartGroup: chartGroups.improvementScore,
  },
  q24: {
    id: "q24",
    text: "La empresa tiene mecanismos para recibir y gestionar auditorías TI.",
    type: "escala",
    respuestas: [1, 2, 3, 4, 5],
    category: categories.improvement,
    chartGroup: chartGroups.improvementScore,
  },
  q25: {
    id: "q25",
    text: "Se aplican acciones de mejora continua basadas en resultados de auditorías y evaluaciones.",
    type: "escala",
    respuestas: [1, 2, 3, 4, 5],
    category: categories.improvement,
    chartGroup: chartGroups.improvementScore,
  },
  q26: {
    id: "q26",
    text: "Existe un registro histórico de evaluaciones y planes de mejora.",
    type: "escala",
    respuestas: [1, 2, 3, 4, 5],
    category: categories.improvement,
    chartGroup: chartGroups.improvementScore,
  },

  q27: {
    id: "q27",
    text: "Principales áreas de oportunidad detectadas:",
    type: "texto_abierto",
    category: categories.recommendations,
  },
  q28: {
    id: "q28",
    text: "Recomendaciones específicas para mejorar procesos con puntajes bajos:",
    type: "texto_abierto",
    category: categories.recommendations,
  },
  q29: {
    id: "q29",
    text: "Priorización de acciones:",
    type: "seleccion",
    respuestas: ["Alta", "Media", "Baja"],
    category: categories.recommendations,
  },
  q30: {
    id: "q30",
    text: "Responsable asignado para seguimiento:",
    type: "texto_abierto",
    category: categories.recommendations,
  },
  q31: {
    id: "q31",
    text: "Fecha límite para la siguiente revisión:",
    type: "fecha",
    category: categories.recommendations,
  },

  q32: {
    id: "q32",
    text: "¿La empresa cuenta con políticas documentadas para cumplimiento normativo en TI?",
    type: "seleccion",
    respuestas: ["Sí", "No"],
    category: categories.compliance,
    chartGroup: chartGroups.complianceStatus,
  },
  q33: {
    id: "q33",
    text: "¿Se realizan auditorías internas o externas periódicas en materia TI?",
    type: "seleccion",
    respuestas: ["Sí", "No"],
    category: categories.compliance,
    chartGroup: chartGroups.complianceStatus,
  },
  q34: {
    id: "q34",
    text: "¿Se capacita al personal en temas de seguridad y normativas legales?",
    type: "seleccion",
    respuestas: ["Sí", "No"],
    category: categories.compliance,
    chartGroup: chartGroups.complianceStatus,
  },

  q35: {
    id: "q35",
    text: "Indicadores específicos que la empresa desea monitorear:",
    type: "seleccion_multiple",
    respuestas: [
      "Tiempo de respuesta a incidentes",
      "Disponibilidad de servicios",
      "Satisfacción del usuario",
      "Cumplimiento de SLAs",
      "Costos de TI",
      "Seguridad de la información",
      "Rendimiento de aplicaciones",
      "Capacidad de infraestructura",
    ],
    category: categories.monitoring,
  },
};

// Get array of all question objects
export const questionsArray = Object.values(questionsData);

// Get questions by category
export const getQuestionsByCategory = (category: string) => {
  return questionsArray.filter((q) => q.category === category);
};

// Get questions by chart group
export const getQuestionsByChartGroup = (chartGroup: string) => {
  return questionsArray.filter((q) => q.chartGroup === chartGroup);
};
