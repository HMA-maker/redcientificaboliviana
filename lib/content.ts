export interface SiteContent {
  metaDescription: string;
  skipToContent: string;
  openMenu: string;
  closeMenu: string;
  mainNavigation: string;
  languageLabel: string;
  navHome: string;
  navAbout: string;
  navActivities: string;
  navDirectory: string;
  navMap: string;
  navContact: string;
  heroEyebrow: string;
  heroTitle: string;
  heroText: string;
  joinCta: string;
  talkCta: string;
  aboutEyebrow: string;
  aboutTitle: string;
  missionText: string;
  objectivesTitle: string;
  participateTitle: string;
  participateText: string;
  objectives: string[];
  activitiesEyebrow: string;
  activitiesTitle: string;
  activities: { title: string; text: string }[];
  activitiesListEyebrow: string;
  activitiesListTitle: string;
  noActivitiesTitle: string;
  noActivitiesText: string;
  upcoming: string;
  past: string;
  recording: string;
  calendarPrevious: string;
  calendarNext: string;
  calendarViewDetails: string;
  calendarRegistration: string;
  calendarPast: string;
  calendarOnline: string;
  activityTypes: Record<string, string>;
  coordinatorsEyebrow: string;
  coordinatorsTitle: string;
  coordinatorsText: string;
  coordinatorRole: string;
  joinEyebrow: string;
  joinTitle: string;
  joinText: string;
  joinUnavailable: string;
  formSpanishNotice: string;
  formSpanishLink: string;
  recordsEyebrow: string;
  recordsTitle: string;
  recordsText: string;
  directoryFilters: string;
  searchLabel: string;
  searchPlaceholder: string;
  filterType: string;
  filterDiscipline: string;
  filterDepartment: string;
  filterStatus: string;
  all: string;
  noRecordsTitle: string;
  noRecordsText: string;
  details: string;
  person: string;
  institution: string;
  problem: string;
  project: string;
  resource: string;
  publicDatasetNote: string;
  recordLabels: Record<string, string>;
  mapEyebrow: string;
  mapTitle: string;
  mapText: string;
  mapList: string;
  mapLegend: string;
  mapProblems: string;
  mapProjects: string;
  mapInstitutions: string;
  mapResources: string;
  mapNoMarkers: string;
  recordSubmitEyebrow: string;
  recordSubmitTitle: string;
  recordSubmitText: string;
  recordSubmitCta: string;
  submitEyebrow: string;
  submitTitle: string;
  submitText: string;
  submitCta: string;
  contactTitle: string;
  footerNavigate: string;
  footerText: string;
  footerRights: string;
  loginNav: string;
  loginTitle: string;
  loginSubtitle: string;
  emailLabel: string;
  passwordLabel: string;
  loginButton: string;
  loginWithGoogle: string;
  noAccountPrompt: string;
  registerHere: string;
  forgotPasswordPrompt: string;
  registerTitle: string;
  registerSubtitle: string;
  fullNameLabel: string;
  confirmPasswordLabel: string;
  registerButton: string;
  haveAccountPrompt: string;
  loginHere: string;
  resetTitle: string;
  resetSubtitle: string;
  resetButton: string;
  backToLogin: string;
  resetSentSuccess: string;
  passwordsDontMatch: string;
  authErrorGeneric: string;
  logoutButton: string;
  myProfileNav: string;
}

export const SITE_CONFIG = {
  contactEmail: 'redcientificaboliviana@gmail.com',
  talkFormUrl: 'https://forms.gle/9yzwQuFtNvyenh7y7',
  forms: {
    join: { es: 'https://forms.gle/78z4KXUd22RLJPcg7', en: null },
    submit: { es: 'https://forms.gle/2RrBAQgNgHHPqehM6', en: null },
  },
};

export const SITE_CONTENT: Record<'es' | 'en', SiteContent> = {
  es: {
    metaDescription: 'Red Científica Boliviana: una red abierta para conectar a personas interesadas en la ciencia y la investigación relacionadas con Bolivia.',
    skipToContent: 'Saltar al contenido', openMenu: 'Abrir menú', closeMenu: 'Cerrar menú', mainNavigation: 'Navegación principal', languageLabel: 'Idioma',
    navHome: 'Inicio', navAbout: 'La red', navActivities: 'Actividades', navDirectory: 'Directorio', navMap: 'Mapa', navContact: 'Contacto',
    heroEyebrow: 'Ciencia, colaboración y Bolivia', heroTitle: 'Conectamos a quienes hacen y acompañan la ciencia relacionada con Bolivia.', heroText: 'La Red Científica Boliviana es un espacio abierto para compartir conocimiento, impulsar conversaciones y acercar a personas interesadas en la investigación.', joinCta: 'Únete a la red', talkCta: 'Propón una charla',
    aboutEyebrow: 'Sobre la red', aboutTitle: 'Un punto de encuentro para la investigación.', missionText: 'Nuestra misión es fortalecer los vínculos entre personas y comunidades que investigan, comunican o se interesan por temas científicos relacionados con Bolivia.', objectivesTitle: 'Objetivos', participateTitle: '¿Quiénes pueden participar?', participateText: 'Investigadores, estudiantes de posgrado, profesionales, instituciones y toda persona con interés en la ciencia y la investigación relacionadas con Bolivia.',
    objectives: ['Facilitar el intercambio de conocimiento y experiencias.', 'Dar visibilidad a conversaciones sobre investigación relacionada con Bolivia.', 'Promover conexiones entre personas con intereses científicos afines.'],
    activitiesEyebrow: 'Actividades', activitiesTitle: 'Conversaciones que acercan el conocimiento.',
    activities: [{ title: 'Charlas científicas', text: 'Encuentros periódicos para conocer investigaciones, preguntas y perspectivas.' }, { title: 'Comunicación de la investigación', text: 'Espacios para compartir conocimiento científico de manera clara y accesible.' }, { title: 'Conexiones para colaborar', text: 'Oportunidades para acercar a personas interesadas en temas de investigación.' }],
    activitiesListEyebrow: 'Programa', activitiesListTitle: 'Charlas, seminarios y encuentros de la red.', noActivitiesTitle: 'Aún no hay actividades publicadas.', noActivitiesText: 'Las próximas actividades y los materiales de sesiones anteriores se publicarán aquí.', upcoming: 'Próximas actividades', past: 'Actividades pasadas', recording: 'Grabación disponible', calendarPrevious: 'Mes anterior', calendarNext: 'Mes siguiente', calendarViewDetails: 'Ver detalles', calendarRegistration: 'Inscripción', calendarPast: 'Actividad pasada', calendarOnline: 'En línea', activityTypes: { seminar: 'Seminario', talk: 'Charla', workshop: 'Taller', meeting: 'Reunión', other: 'Otra actividad' },
    coordinatorsEyebrow: 'La red', coordinatorsTitle: 'Coordinadores y fundadores', coordinatorsText: 'Personas que impulsan la Red Científica Boliviana.', coordinatorRole: 'Coordinador y fundador',
    joinEyebrow: 'Únete', joinTitle: 'Sé parte de la conversación.', joinText: 'Comparte tu perfil para que el equipo pueda revisarlo de forma privada antes de cualquier publicación.', joinUnavailable: 'El formulario de adhesión estará disponible próximamente.',
    formSpanishNotice: 'Este formulario está disponible actualmente en español. Una versión en inglés estará disponible pronto.', formSpanishLink: 'Abrir formulario en español',
    recordsEyebrow: 'Directorio público', recordsTitle: 'Personas, instituciones e iniciativas aprobadas.', recordsText: 'Este directorio muestra únicamente información revisada y autorizada para publicación.', directoryFilters: 'Filtros del directorio', searchLabel: 'Buscar registros', searchPlaceholder: 'Buscar por nombre, tema o disciplina', filterType: 'Tipo de registro', filterDiscipline: 'Disciplina', filterDepartment: 'Departamento', filterStatus: 'Estado', all: 'Todos', noRecordsTitle: 'No hay registros para estos filtros.', noRecordsText: 'Prueba otra búsqueda o vuelve a ver todos los registros aprobados.', details: 'Ver detalles', person: 'Personas y colaboradores', institution: 'Instituciones', problem: 'Problemas y necesidades', project: 'Proyectos', resource: 'Recursos y contribuciones', publicDatasetNote: 'Datos de demostración sintéticos. Los registros reales se publican solo tras revisión y consentimiento.',
    recordLabels: { disciplines: 'Disciplinas', researchAreas: 'Áreas de investigación', location: 'Ubicación pública', status: 'Estado', institution: 'Institución', role: 'Rol', related: 'Relacionado con', contact: 'Contacto público', external: 'Enlace externo', professionalLinks: 'Enlaces profesionales' },
    mapEyebrow: 'Mapa público', mapTitle: 'Iniciativas aprobadas en Bolivia.', mapText: 'Las ubicaciones se muestran solo a nivel departamental o regional aprobado. No se muestran ubicaciones personales ni sensibles.', mapList: 'Vista de lista', mapLegend: 'Leyenda', mapProblems: 'Problemas', mapProjects: 'Proyectos', mapInstitutions: 'Instituciones', mapResources: 'Recursos institucionales', mapNoMarkers: 'No hay ubicaciones aprobadas para estos filtros.',
    recordSubmitEyebrow: 'Enviar un registro', recordSubmitTitle: 'Propón un problema, proyecto, institución o recurso.', recordSubmitText: 'Las propuestas se revisan de forma privada antes de incorporarse al conjunto público aprobado.', recordSubmitCta: 'Enviar un registro',
    submitEyebrow: 'Proponer una charla', submitTitle: 'Comparte una investigación, una idea o un tema.', submitText: 'Usa el formulario para proponer una charla o tema de investigación para una actividad futura.', submitCta: 'Enviar propuesta',
    contactTitle: 'Contacto', footerNavigate: 'Navegar', footerText: 'Una red abierta para la ciencia relacionada con Bolivia.', footerRights: 'Todos los derechos reservados.',
    loginNav: 'Ingresar', loginTitle: 'Acceso a la Red', loginSubtitle: 'Ingresa para administrar tu perfil de investigación y contribuciones.', emailLabel: 'Correo electrónico', passwordLabel: 'Contraseña', loginButton: 'Iniciar Sesión', loginWithGoogle: 'Continuar con Google', noAccountPrompt: '¿Aún no tienes cuenta?', registerHere: 'Regístrate aquí', forgotPasswordPrompt: '¿Olvidaste tu contraseña?',
    registerTitle: 'Registro de Investigador', registerSubtitle: 'Crea tu cuenta para formar parte del directorio de la comunidad científica.', fullNameLabel: 'Nombre y Apellidos', confirmPasswordLabel: 'Confirmar Contraseña', registerButton: 'Crear Cuenta', haveAccountPrompt: '¿Ya tienes una cuenta?', loginHere: 'Inicia sesión aquí',
    resetTitle: 'Recuperar Contraseña', resetSubtitle: 'Ingresa tu correo para recibir las instrucciones de restablecimiento.', resetButton: 'Enviar enlace', backToLogin: 'Volver al inicio de sesión', resetSentSuccess: 'Si el correo está registrado, recibirás un enlace de recuperación en breve.', passwordsDontMatch: 'Las contraseñas no coinciden.', authErrorGeneric: 'Ocurrió un error en la autenticación. Por favor intenta nuevamente.', logoutButton: 'Cerrar Sesión', myProfileNav: 'Mi Perfil',
  },
  en: {
    metaDescription: 'Red Científica Boliviana: an open network connecting people interested in science and research related to Bolivia.',
    skipToContent: 'Skip to content', openMenu: 'Open menu', closeMenu: 'Close menu', mainNavigation: 'Main navigation', languageLabel: 'Language',
    navHome: 'Home', navAbout: 'The network', navActivities: 'Activities', navDirectory: 'Directory', navMap: 'Map', navContact: 'Contact',
    heroEyebrow: 'Science, collaboration, and Bolivia', heroTitle: 'Connecting people who conduct and support science related to Bolivia.', heroText: 'Red Científica Boliviana is an open space for sharing knowledge, fostering conversations, and bringing together people interested in research.', joinCta: 'Join the network', talkCta: 'Propose a talk',
    aboutEyebrow: 'About the network', aboutTitle: 'A meeting point for research.', missionText: 'Our mission is to strengthen connections among people and communities who conduct research, communicate science, or are interested in scientific topics related to Bolivia.', objectivesTitle: 'Objectives', participateTitle: 'Who can take part?', participateText: 'Researchers, graduate students, professionals, institutions, and anyone interested in science and research related to Bolivia.',
    objectives: ['Facilitate the exchange of knowledge and experience.', 'Give visibility to conversations on research related to Bolivia.', 'Encourage connections among people with shared scientific interests.'],
    activitiesEyebrow: 'Activities', activitiesTitle: 'Conversations that bring knowledge closer.',
    activities: [{ title: 'Scientific talks', text: 'Regular gatherings to explore research, questions, and perspectives.' }, { title: 'Research communication', text: 'Spaces for sharing scientific knowledge clearly and accessibly.' }, { title: 'Connections for collaboration', text: 'Opportunities to bring together people interested in research topics.' }],
    activitiesListEyebrow: 'Programme', activitiesListTitle: 'Talks, seminars, and network gatherings.', noActivitiesTitle: 'No activities have been published yet.', noActivitiesText: 'Upcoming activities and material from past sessions will be published here.', upcoming: 'Upcoming activities', past: 'Past activities', recording: 'Recording available', calendarPrevious: 'Previous month', calendarNext: 'Next month', calendarViewDetails: 'View details', calendarRegistration: 'Registration', calendarPast: 'Past activity', calendarOnline: 'Online', activityTypes: { seminar: 'Seminar', talk: 'Talk', workshop: 'Workshop', meeting: 'Meeting', other: 'Other activity' },
    coordinatorsEyebrow: 'The network', coordinatorsTitle: 'Coordinators and founders', coordinatorsText: 'People helping to lead Red Científica Boliviana.', coordinatorRole: 'Coordinator and founder',
    joinEyebrow: 'Join', joinTitle: 'Be part of the conversation.', joinText: 'Share your profile so the team can review it privately before any publication.', joinUnavailable: 'The membership form will be available soon.',
    formSpanishNotice: 'This form is currently available in Spanish. An English version will be available soon.', formSpanishLink: 'Open the Spanish form',
    recordsEyebrow: 'Public directory', recordsTitle: 'Approved people, institutions, and initiatives.', recordsText: 'This directory shows only information reviewed and approved for publication.', directoryFilters: 'Directory filters', searchLabel: 'Search records', searchPlaceholder: 'Search by name, theme, or discipline', filterType: 'Record type', filterDiscipline: 'Discipline', filterDepartment: 'Department', filterStatus: 'Status', all: 'All', noRecordsTitle: 'No records match these filters.', noRecordsText: 'Try a different search or return to all approved records.', details: 'View details', person: 'People and collaborators', institution: 'Institutions', problem: 'Problems and needs', project: 'Projects', resource: 'Resources and contributions', publicDatasetNote: 'Synthetic demonstration data. Real records are published only after review and consent.',
    recordLabels: { disciplines: 'Disciplines', researchAreas: 'Research areas', location: 'Public location', status: 'Status', institution: 'Institution', role: 'Role', related: 'Related to', contact: 'Public contact', external: 'External link', professionalLinks: 'Professional links' },
    mapEyebrow: 'Public map', mapTitle: 'Approved initiatives in Bolivia.', mapText: 'Locations are shown only at an approved department or regional level. Personal and sensitive locations are not shown.', mapList: 'List view', mapLegend: 'Legend', mapProblems: 'Problems', mapProjects: 'Projects', mapInstitutions: 'Institutions', mapResources: 'Institutional resources', mapNoMarkers: 'No approved locations match these filters.',
    recordSubmitEyebrow: 'Submit a record', recordSubmitTitle: 'Propose a problem, project, institution, or resource.', recordSubmitText: 'Submissions are reviewed privately before being added to the approved public dataset.', recordSubmitCta: 'Submit a record',
    submitEyebrow: 'Propose a talk', submitTitle: 'Share research, an idea, or a topic.', submitText: 'Use the form to propose a talk or research topic for a future activity.', submitCta: 'Submit proposal',
    contactTitle: 'Contact', footerNavigate: 'Explore', footerText: 'An open network for science related to Bolivia.', footerRights: 'All rights reserved.',
    loginNav: 'Sign In', loginTitle: 'Network Sign In', loginSubtitle: 'Sign in to manage your researcher profile and contributions.', emailLabel: 'Email address', passwordLabel: 'Password', loginButton: 'Sign In', loginWithGoogle: 'Continue with Google', noAccountPrompt: "Don't have an account?", registerHere: 'Sign up here', forgotPasswordPrompt: 'Forgot your password?',
    registerTitle: 'Researcher Registration', registerSubtitle: 'Create your account to become part of the scientific community directory.', fullNameLabel: 'Full Name', confirmPasswordLabel: 'Confirm Password', registerButton: 'Create Account', haveAccountPrompt: 'Already have an account?', loginHere: 'Sign in here',
    resetTitle: 'Reset Password', resetSubtitle: 'Enter your email to receive password reset instructions.', resetButton: 'Send reset link', backToLogin: 'Back to sign in', resetSentSuccess: 'If the email is registered, you will receive a reset link shortly.', passwordsDontMatch: 'Passwords do not match.', authErrorGeneric: 'An authentication error occurred. Please try again.', logoutButton: 'Sign Out', myProfileNav: 'My Profile',
  },
};

export const COORDINATORS = [
  { id: 'julio-chavez', name: 'Julio Chávez', roleKey: 'coordinatorRole' },
  { id: 'kenji-shoji', name: 'Kenji Shoji', roleKey: 'coordinatorRole' },
  { id: 'natalia-machaca', name: 'Natalia Machaca', roleKey: 'coordinatorRole' },
];

export interface Activity {
  id: string;
  published: boolean;
  date: string;
  type: string;
  title_es: string;
  title_en: string;
  description_es: string;
  description_en: string;
  registration_url?: string;
  recording_url?: string;
}

export const ACTIVITIES: Activity[] = [];
