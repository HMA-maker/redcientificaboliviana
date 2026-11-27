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
  profileModalTitle: string;
  profileModalSubtitle: string;
  profileTabPersonal: string;
  profileTabAffiliation: string;
  profileTabAcademic: string;
  profileTabLinks: string;
  profileFullNameLabel: string;
  profileTitleLabel: string;
  profileTitlePlaceholder: string;
  profileInstitutionLabel: string;
  profileInstitutionPlaceholder: string;
  profileDepartmentLabel: string;
  profileDepartmentPlaceholder: string;
  profileCityLabel: string;
  profileCityPlaceholder: string;
  profileCountryLabel: string;
  profileBioEsLabel: string;
  profileBioEnLabel: string;
  profileBioPlaceholder: string;
  profileDisciplinesLabel: string;
  profileDisciplinesHint: string;
  profileResearchAreasLabel: string;
  profileResearchAreasHint: string;
  profileResearchAreasPlaceholder: string;
  profileOrcidLabel: string;
  profileOrcidPlaceholder: string;
  profileScholarLabel: string;
  profileScholarPlaceholder: string;
  profileWebsiteLabel: string;
  profileWebsitePlaceholder: string;
  profileAvatarLabel: string;
  profileAvatarPlaceholder: string;
  profilePublicConsentLabel: string;
  profilePublicConsentDesc: string;
  profileModerationStatusLabel: string;
  profileStatusPending: string;
  profileStatusApproved: string;
  profileStatusRejected: string;
  profileStatusArchived: string;
  profileSaveButton: string;
  profileSavingButton: string;
  profileSaveSuccess: string;
  profileSaveError: string;
  publicProfileTitle: string;
  publicProfileBadge: string;
  publicProfileBio: string;
  publicProfileDisciplines: string;
  publicProfileAreas: string;
  publicProfileLinks: string;
  publicProfileShare: string;
  publicProfileShareCopied: string;
  publicProfileContactCta: string;
  publicProfileClose: string;
  viewPublicProfile: string;
  clearFilters: string;
  showingResults: string;
  allDisciplines: string;
  allDepartments: string;
  filterByDiscipline: string;
  filterByDepartment: string;
  institutionModalTitle: string;
  institutionModalSubtitle: string;
  institutionNameLabel: string;
  institutionNamePlaceholder: string;
  institutionTypeLabel: string;
  institutionDeptLabel: string;
  institutionCityLabel: string;
  institutionCityPlaceholder: string;
  institutionWebsiteLabel: string;
  institutionWebsitePlaceholder: string;
  institutionEmailLabel: string;
  institutionEmailPlaceholder: string;
  institutionLogoLabel: string;
  institutionLogoPlaceholder: string;
  institutionDescEsLabel: string;
  institutionDescEnLabel: string;
  institutionDescPlaceholder: string;
  institutionRegisterButton: string;
  institutionRegistering: string;
  institutionRegisterSuccess: string;
  institutionRegisterError: string;
  institutionCta: string;
  publicInstitutionTitle: string;
  publicInstitutionBadge: string;
  publicInstitutionAbout: string;
  publicInstitutionAffiliatedTitle: string;
  publicInstitutionAffiliatedEmpty: string;
  publicInstitutionWebsite: string;
  publicInstitutionContact: string;
  publicInstitutionShare: string;
  publicInstitutionClose: string;
  viewInstitutionProfile: string;
}

export const SITE_CONFIG = {
  contactEmail: 'redcientificaboliviana@gmail.com',
  talkFormUrl: 'https://forms.gle/9yzwQuFtNvyenh7y7',
  calendarEmbedUrl:
    'https://calendar.google.com/calendar/embed?src=redcientificaboliviana%40gmail.com&ctz=America%2FLa_Paz',
  profileEditorWebappUrl:
    'https://script.google.com/macros/s/AKfycbxSDKfVQdHkJM0NZHeMaKJ1BVtx7J7rk1U8htf0cmd3DBphYrmFfW8lJHovCOLcYxzkcg/exec',
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
    heroEyebrow: 'Ciencia, colaboración y Bolivia', heroTitle: 'Un mosaico de experiencias para enriquecer la ciencia boliviana.', heroText: 'Conectamos a investigadoras, investigadores, estudiantes e instituciones en Bolivia y en el mundo para colaborar en lo que el país necesita.', joinCta: 'Únete a la red', talkCta: 'Propón una charla',
    aboutEyebrow: 'Quiénes somos', aboutTitle: 'Un punto de encuentro para la investigación.', missionText: 'La Red Científica Boliviana (RCB) es una plataforma de articulación científica que conecta a investigadores bolivianos, dentro y fuera del país, con científicos de instituciones de todo el mundo que investigan sobre Bolivia. Queremos visibilizar el potencial científico de Bolivia a nivel internacional y construir canales de colaboración estables.', objectivesTitle: 'Objetivos', participateTitle: '¿Quiénes pueden participar?', participateText: 'Investigadores, estudiantes de posgrado, profesionales, instituciones y toda persona con interés en la ciencia y la investigación relacionadas con Bolivia.',
    objectives: [
      'Articular una comunidad científica interdisciplinar que conecte a investigadores bolivianos con científicos de todo el mundo.',
      'Reducir las barreras de acceso mediante una red de contactos, recursos compartidos y colaboración directa entre instituciones.',
      'Organizar seminarios periódicos que difundan la investigación boliviana dentro y fuera del país y acercarla a la sociedad.',
      'Posicionar a Bolivia como escenario de investigación de referencia en el espacio iberoamericano.',
      'Generar un ecosistema de conocimiento para formar nuevos investigadores y transferir resultados a la sociedad.',
    ],
    activitiesEyebrow: 'Actividades y Seminarios', activitiesTitle: 'Conversaciones que acercan el conocimiento.',
    activities: [{ title: 'Charlas científicas', text: 'Encuentros periódicos para conocer investigaciones, preguntas y perspectivas.' }, { title: 'Seminario mensual', text: 'Cada mes, una persona de la red presenta su investigación en línea y responde preguntas.' }, { title: 'Conexiones para colaborar', text: 'Oportunidades para acercar a personas e instituciones interesadas en investigar sobre Bolivia.' }],
    activitiesListEyebrow: 'Calendario', activitiesListTitle: 'Próximas actividades confirmadas', noActivitiesTitle: 'Aún no hay actividades publicadas.', noActivitiesText: 'Consulta las próximas actividades confirmadas de la Red Científica Boliviana y participa en nuestros encuentros científicos y formativos.', upcoming: 'Próximas actividades', past: 'Seminarios anteriores', recording: 'Grabación disponible', calendarPrevious: 'Mes anterior', calendarNext: 'Mes siguiente', calendarViewDetails: 'Ver detalles', calendarRegistration: 'Inscripción', calendarPast: 'Actividad pasada', calendarOnline: 'En línea', activityTypes: { seminar: 'Seminario', talk: 'Charla', workshop: 'Taller', meeting: 'Encuentro', other: 'Otra actividad' },
    coordinatorsEyebrow: 'La red', coordinatorsTitle: 'Coordinación y fundadores', coordinatorsText: 'Las personas que impulsan la red, de forma voluntaria, desde Bolivia y desde el exterior.', coordinatorRole: 'Coordinación y fundación',
    joinEyebrow: 'Únete', joinTitle: 'Sé parte de la conversación.', joinText: 'Comparte tu perfil para que el equipo pueda revisarlo de forma privada antes de cualquier publicación.', joinUnavailable: 'El formulario de adhesión estará disponible próximamente.',
    formSpanishNotice: 'Este formulario está disponible actualmente en español. Una versión en inglés estará disponible pronto.', formSpanishLink: 'Abrir formulario en español',
    recordsEyebrow: 'Directorio público', recordsTitle: 'Personas, instituciones e iniciativas aprobadas.', recordsText: 'Este directorio muestra únicamente información revisada y autorizada para publicación.', directoryFilters: 'Filtros del directorio', searchLabel: 'Buscar registros', searchPlaceholder: 'Buscar por nombre, tema o disciplina', filterType: 'Tipo de registro', filterDiscipline: 'Disciplina', filterDepartment: 'Departamento', filterStatus: 'Estado', all: 'Todos', noRecordsTitle: 'No hay registros para estos filtros.', noRecordsText: 'Prueba otra búsqueda o vuelve a ver todos los registros aprobados.', details: 'Ver detalles', person: 'Personas y colaboradores', institution: 'Instituciones', problem: 'Problemas y necesidades', project: 'Proyectos', resource: 'Recursos y contribuciones', publicDatasetNote: 'Registros públicos aprobados y datos institucionales de demostración.',
    recordLabels: { disciplines: 'Disciplinas', researchAreas: 'Áreas de investigación', location: 'Ubicación pública', status: 'Estado', institution: 'Institución', role: 'Rol', related: 'Relacionado con', contact: 'Contacto público', external: 'Enlace externo', professionalLinks: 'Enlaces profesionales' },
    mapEyebrow: 'Mapa público', mapTitle: 'Iniciativas aprobadas en Bolivia.', mapText: 'Las ubicaciones se muestran solo a nivel departamental o regional aprobado. No se muestran ubicaciones personales ni sensibles.', mapList: 'Vista de lista', mapLegend: 'Leyenda', mapProblems: 'Problemas', mapProjects: 'Proyectos', mapInstitutions: 'Instituciones', mapResources: 'Recursos institucionales', mapNoMarkers: 'No hay ubicaciones aprobadas para estos filtros.',
    recordSubmitEyebrow: 'Enviar un registro', recordSubmitTitle: 'Propón un problema, proyecto, institución o recurso.', recordSubmitText: 'Las propuestas se revisan de forma privada antes de incorporarse al conjunto público aprobado.', recordSubmitCta: 'Enviar un registro',
    submitEyebrow: 'Proponer una charla', submitTitle: 'Comparte una investigación, una idea o un tema.', submitText: 'Usa el formulario para proponer una charla o tema de investigación para una actividad futura.', submitCta: 'Enviar propuesta',
    contactTitle: 'Contacto', footerNavigate: 'Navegar', footerText: 'Una red abierta para la ciencia relacionada con Bolivia.', footerRights: 'Todos los derechos reservados.',
    loginNav: 'Ingresar', loginTitle: 'Acceso a la Red', loginSubtitle: 'Ingresa para administrar tu perfil de investigación y contribuciones.', emailLabel: 'Correo electrónico', passwordLabel: 'Contraseña', loginButton: 'Iniciar Sesión', loginWithGoogle: 'Continuar con Google', noAccountPrompt: '¿Aún no tienes cuenta?', registerHere: 'Regístrate aquí', forgotPasswordPrompt: '¿Olvidaste tu contraseña?',
    registerTitle: 'Registro de Investigador', registerSubtitle: 'Crea tu cuenta para formar parte del directorio de la comunidad científica.', fullNameLabel: 'Nombre y Apellidos', confirmPasswordLabel: 'Confirmar Contraseña', registerButton: 'Crear Cuenta', haveAccountPrompt: '¿Ya tienes una cuenta?', loginHere: 'Inicia sesión aquí',
    resetTitle: 'Recuperar Contraseña', resetSubtitle: 'Ingresa tu correo para recibir las instrucciones de restablecimiento.', resetButton: 'Enviar enlace', backToLogin: 'Volver al inicio de sesión', resetSentSuccess: 'Si el correo está registrado, recibirás un enlace de recuperación en breve.', passwordsDontMatch: 'Las contraseñas no coinciden.', authErrorGeneric: 'Ocurrió un error en la autenticación. Por favor intenta nuevamente.', logoutButton: 'Cerrar Sesión', myProfileNav: 'Mi Perfil',
    profileModalTitle: 'Perfil de Investigador',
    profileModalSubtitle: 'Administra tus datos académicos, áreas de investigación y visibilidad en la Red Científica Boliviana.',
    profileTabPersonal: 'Datos Personales',
    profileTabAffiliation: 'Filiación y Ubicación',
    profileTabAcademic: 'Investigación',
    profileTabLinks: 'Enlaces y Visibilidad',
    profileFullNameLabel: 'Nombre y Apellidos completos',
    profileTitleLabel: 'Título profesional / Cargo',
    profileTitlePlaceholder: 'Ej. PhD en Biología Molecular, Investigador Asociado...',
    profileInstitutionLabel: 'Institución de afiliación principal',
    profileInstitutionPlaceholder: 'Ej. Universidad Mayor de San Simón (UMSS)',
    profileDepartmentLabel: 'Departamento en Bolivia',
    profileDepartmentPlaceholder: 'Selecciona un departamento o exterior',
    profileCityLabel: 'Ciudad / Localidad',
    profileCityPlaceholder: 'Ej. Cochabamba, La Paz, Barcelona...',
    profileCountryLabel: 'País de residencia',
    profileBioEsLabel: 'Biografía académica (Español)',
    profileBioEnLabel: 'Biografía académica (Inglés)',
    profileBioPlaceholder: 'Describe tu trayectoria científica, líneas de trabajo y contribuciones principales...',
    profileDisciplinesLabel: 'Disciplinas científicas',
    profileDisciplinesHint: 'Selecciona una o más disciplinas principales:',
    profileResearchAreasLabel: 'Áreas específicas de investigación',
    profileResearchAreasHint: 'Escribe un área y presiona Enter o separa por comas.',
    profileResearchAreasPlaceholder: 'Ej. Nanotecnología, Epidemiología, Inteligencia Artificial...',
    profileOrcidLabel: 'ID o URL de ORCID',
    profileOrcidPlaceholder: 'https://orcid.org/0000-0000-0000-0000',
    profileScholarLabel: 'URL de Google Scholar',
    profileScholarPlaceholder: 'https://scholar.google.com/citations?user=...',
    profileWebsiteLabel: 'Sitio Web personal o de laboratorio',
    profileWebsitePlaceholder: 'https://...',
    profileAvatarLabel: 'URL de imagen de perfil / Avatar',
    profileAvatarPlaceholder: 'https://... (enlace a tu fotografía)',
    profilePublicConsentLabel: 'Hacer público mi perfil en el Directorio',
    profilePublicConsentDesc: 'Al activar esta casilla, autorizas que tus datos profesionales revisados sean visibles públicamente en la plataforma.',
    profileModerationStatusLabel: 'Estado de verificación:',
    profileStatusPending: 'Pendiente de revisión',
    profileStatusApproved: 'Aprobado y publicado',
    profileStatusRejected: 'Requiere ajustes',
    profileStatusArchived: 'Archivado',
    profileSaveButton: 'Guardar Cambios',
    profileSavingButton: 'Guardando...',
    profileSaveSuccess: '¡Perfil actualizado con éxito!',
    profileSaveError: 'No se pudo guardar el perfil. Por favor intenta nuevamente.',
    publicProfileTitle: 'Perfil del Investigador',
    publicProfileBadge: 'Investigador Verificado',
    publicProfileBio: 'Biografía Académica',
    publicProfileDisciplines: 'Disciplinas Científicas',
    publicProfileAreas: 'Áreas de Especialidad',
    publicProfileLinks: 'Perfiles y Enlaces Oficiales',
    publicProfileShare: 'Compartir Perfil',
    publicProfileShareCopied: '¡Enlace copiado al portapapeles!',
    publicProfileContactCta: '¿Te interesa colaborar o invitar a este investigador a una actividad?',
    publicProfileClose: 'Cerrar',
    viewPublicProfile: 'Ver perfil completo',
    clearFilters: 'Limpiar filtros',
    showingResults: 'Mostrando',
    allDisciplines: 'Todas las disciplinas',
    allDepartments: 'Todos los departamentos',
    filterByDiscipline: 'Disciplina',
    filterByDepartment: 'Ubicación',
    institutionModalTitle: 'Registro y Administración de Institución',
    institutionModalSubtitle: 'Vincula una universidad, centro de investigación o laboratorio a la Red Científica Boliviana.',
    institutionNameLabel: 'Nombre oficial de la Institución',
    institutionNamePlaceholder: 'Ej. Universidad Mayor de San Simón (UMSS)',
    institutionTypeLabel: 'Tipo de Entidad',
    institutionDeptLabel: 'Departamento en Bolivia',
    institutionCityLabel: 'Ciudad / Sede',
    institutionCityPlaceholder: 'Ej. Cochabamba, La Paz...',
    institutionWebsiteLabel: 'Sitio Web oficial',
    institutionWebsitePlaceholder: 'https://...',
    institutionEmailLabel: 'Correo de contacto / enlace institucional',
    institutionEmailPlaceholder: 'contacto@institucion.edu.bo',
    institutionLogoLabel: 'URL del Logotipo oficial',
    institutionLogoPlaceholder: 'https://... (enlace al logo de la institución)',
    institutionDescEsLabel: 'Descripción y líneas de investigación (Español)',
    institutionDescEnLabel: 'Descripción y líneas de investigación (Inglés)',
    institutionDescPlaceholder: 'Describe la misión científica, centros adscritos o áreas prioritarias de investigación...',
    institutionRegisterButton: 'Registrar Institución',
    institutionRegistering: 'Guardando registro...',
    institutionRegisterSuccess: '¡Institución enviada con éxito! Quedará visible tras la revisión de coordinación.',
    institutionRegisterError: 'Ocurrió un error al registrar la institución. Intenta nuevamente.',
    institutionCta: 'Registrar Institución Aliada',
    publicInstitutionTitle: 'Perfil Institucional',
    publicInstitutionBadge: 'Institución Vinculada',
    publicInstitutionAbout: 'Acerca de la Institución',
    publicInstitutionAffiliatedTitle: 'Investigadores Vinculados',
    publicInstitutionAffiliatedEmpty: 'Aún no hay investigadores vinculados registrados para esta institución.',
    publicInstitutionWebsite: 'Sitio Web Oficial',
    publicInstitutionContact: 'Contacto Institucional',
    publicInstitutionShare: 'Compartir Perfil Institucional',
    publicInstitutionClose: 'Cerrar',
    viewInstitutionProfile: 'Ver perfil institucional',
  },
  en: {
    metaDescription: 'Red Científica Boliviana: an open network connecting people interested in science and research related to Bolivia.',
    skipToContent: 'Skip to content', openMenu: 'Open menu', closeMenu: 'Close menu', mainNavigation: 'Main navigation', languageLabel: 'Language',
    navHome: 'Home', navAbout: 'The network', navActivities: 'Activities', navDirectory: 'Directory', navMap: 'Map', navContact: 'Contact',
    heroEyebrow: 'Science, collaboration, and Bolivia', heroTitle: 'A mosaic of experiences to enrich Bolivian science.', heroText: 'We connect researchers, students and institutions in Bolivia and around the world to collaborate on what the country needs.', joinCta: 'Join the network', talkCta: 'Propose a talk',
    aboutEyebrow: 'Who we are', aboutTitle: 'A meeting point for research.', missionText: "Red Científica Boliviana (RCB) is a platform for scientific collaboration that connects Bolivian researchers, at home and abroad, with scientists at institutions worldwide who research Bolivia. We want to make Bolivia's scientific potential visible internationally and build lasting channels for collaboration.", objectivesTitle: 'Goals', participateTitle: 'Who can take part?', participateText: 'Researchers, graduate students, professionals, institutions, and anyone interested in science and research related to Bolivia.',
    objectives: [
      'Build an interdisciplinary scientific community connecting Bolivian researchers with scientists worldwide.',
      'Lower the barriers to access through a network of contacts, shared resources and direct institutional collaboration.',
      'Hold regular seminars that share Bolivian research at home and abroad and bring it to society.',
      'Position Bolivia as a reference research setting in the Ibero-American space.',
      'Grow a knowledge ecosystem to train new researchers and transfer results to society.',
    ],
    activitiesEyebrow: 'Activities & Seminars', activitiesTitle: 'Conversations that bring knowledge closer.',
    activities: [{ title: 'Scientific talks', text: 'Regular gatherings to explore research, questions, and perspectives.' }, { title: 'Monthly seminar', text: 'Every month, a network member presents their research online and takes questions.' }, { title: 'Connections for collaboration', text: 'Opportunities to bring together people and institutions interested in research on Bolivia.' }],
    activitiesListEyebrow: 'Calendar', activitiesListTitle: 'Upcoming confirmed activities', noActivitiesTitle: 'No activities have been published yet.', noActivitiesText: 'See the next confirmed Red Científica Boliviana activities and join our scientific and learning events.', upcoming: 'Upcoming activities', past: 'Past seminars', recording: 'Recording available', calendarPrevious: 'Previous month', calendarNext: 'Next month', calendarViewDetails: 'View details', calendarRegistration: 'Registration', calendarPast: 'Past activity', calendarOnline: 'Online', activityTypes: { seminar: 'Seminar', talk: 'Talk', workshop: 'Workshop', meeting: 'Gathering', other: 'Other activity' },
    coordinatorsEyebrow: 'The network', coordinatorsTitle: 'Coordinators and founders', coordinatorsText: 'The people who drive the network, as volunteers, from Bolivia and abroad.', coordinatorRole: 'Coordinator & founder',
    joinEyebrow: 'Join', joinTitle: 'Be part of the conversation.', joinText: 'Share your profile so the team can review it privately before any publication.', joinUnavailable: 'The membership form will be available soon.',
    formSpanishNotice: 'This form is currently available in Spanish. An English version will be available soon.', formSpanishLink: 'Open the Spanish form',
    recordsEyebrow: 'Public directory', recordsTitle: 'Approved people, institutions, and initiatives.', recordsText: 'This directory shows only information reviewed and approved for publication.', directoryFilters: 'Directory filters', searchLabel: 'Search records', searchPlaceholder: 'Search by name, theme, or discipline', filterType: 'Record type', filterDiscipline: 'Discipline', filterDepartment: 'Department', filterStatus: 'Status', all: 'All', noRecordsTitle: 'No records match these filters.', noRecordsText: 'Try a different search or return to all approved records.', details: 'View details', person: 'People and collaborators', institution: 'Institutions', problem: 'Problems and needs', project: 'Projects', resource: 'Resources and contributions', publicDatasetNote: 'Approved public records and institutional demonstration data.',
    recordLabels: { disciplines: 'Disciplines', researchAreas: 'Research areas', location: 'Public location', status: 'Status', institution: 'Institution', role: 'Role', related: 'Related to', contact: 'Public contact', external: 'External link', professionalLinks: 'Professional links' },
    mapEyebrow: 'Public map', mapTitle: 'Approved initiatives in Bolivia.', mapText: 'Locations are shown only at an approved department or regional level. Personal and sensitive locations are not shown.', mapList: 'List view', mapLegend: 'Legend', mapProblems: 'Problems', mapProjects: 'Projects', mapInstitutions: 'Institutions', mapResources: 'Institutional resources', mapNoMarkers: 'No approved locations match these filters.',
    recordSubmitEyebrow: 'Submit a record', recordSubmitTitle: 'Propose a problem, project, institution, or resource.', recordSubmitText: 'Submissions are reviewed privately before being added to the approved public dataset.', recordSubmitCta: 'Submit a record',
    submitEyebrow: 'Propose a talk', submitTitle: 'Share research, an idea, or a topic.', submitText: 'Use the form to propose a talk or research topic for a future activity.', submitCta: 'Submit proposal',
    contactTitle: 'Contact', footerNavigate: 'Explore', footerText: 'An open network for science related to Bolivia.', footerRights: 'All rights reserved.',
    loginNav: 'Sign In', loginTitle: 'Network Sign In', loginSubtitle: 'Sign in to manage your researcher profile and contributions.', emailLabel: 'Email address', passwordLabel: 'Password', loginButton: 'Sign In', loginWithGoogle: 'Continue with Google', noAccountPrompt: "Don't have an account?", registerHere: 'Sign up here', forgotPasswordPrompt: 'Forgot your password?',
    registerTitle: 'Researcher Registration', registerSubtitle: 'Create your account to become part of the scientific community directory.', fullNameLabel: 'Full Name', confirmPasswordLabel: 'Confirm Password', registerButton: 'Create Account', haveAccountPrompt: 'Already have an account?', loginHere: 'Sign in here',
    resetTitle: 'Reset Password', resetSubtitle: 'Enter your email to receive password reset instructions.', resetButton: 'Send reset link', backToLogin: 'Back to sign in', resetSentSuccess: 'If the email is registered, you will receive a reset link shortly.', passwordsDontMatch: 'Passwords do not match.', authErrorGeneric: 'An authentication error occurred. Please try again.', logoutButton: 'Sign Out', myProfileNav: 'My Profile',
    profileModalTitle: 'Researcher Profile',
    profileModalSubtitle: 'Manage your academic credentials, research areas, and visibility on Red Científica Boliviana.',
    profileTabPersonal: 'Personal Info',
    profileTabAffiliation: 'Affiliation & Location',
    profileTabAcademic: 'Research',
    profileTabLinks: 'Links & Visibility',
    profileFullNameLabel: 'Full Name',
    profileTitleLabel: 'Professional Title / Role',
    profileTitlePlaceholder: 'E.g. PhD in Molecular Biology, Research Associate...',
    profileInstitutionLabel: 'Main Affiliated Institution',
    profileInstitutionPlaceholder: 'E.g. Universidad Mayor de San Simón (UMSS)',
    profileDepartmentLabel: 'Department in Bolivia',
    profileDepartmentPlaceholder: 'Select department or abroad',
    profileCityLabel: 'City / Locality',
    profileCityPlaceholder: 'E.g. Cochabamba, La Paz, Barcelona...',
    profileCountryLabel: 'Country of Residence',
    profileBioEsLabel: 'Academic Bio (Spanish)',
    profileBioEnLabel: 'Academic Bio (English)',
    profileBioPlaceholder: 'Describe your scientific trajectory, research lines, and key contributions...',
    profileDisciplinesLabel: 'Scientific Disciplines',
    profileDisciplinesHint: 'Select one or more primary disciplines:',
    profileResearchAreasLabel: 'Specific Research Areas',
    profileResearchAreasHint: 'Type an area and press Enter or separate with commas.',
    profileResearchAreasPlaceholder: 'E.g. Nanotechnology, Epidemiology, Artificial Intelligence...',
    profileOrcidLabel: 'ORCID ID or URL',
    profileOrcidPlaceholder: 'https://orcid.org/0000-0000-0000-0000',
    profileScholarLabel: 'Google Scholar URL',
    profileScholarPlaceholder: 'https://scholar.google.com/citations?user=...',
    profileWebsiteLabel: 'Personal or Lab Website',
    profileWebsitePlaceholder: 'https://...',
    profileAvatarLabel: 'Profile Picture / Avatar URL',
    profileAvatarPlaceholder: 'https://... (link to your photo)',
    profilePublicConsentLabel: 'Make my profile public in the Directory',
    profilePublicConsentDesc: 'By checking this box, you authorize your verified professional details to be publicly visible on the platform.',
    profileModerationStatusLabel: 'Verification Status:',
    profileStatusPending: 'Pending review',
    profileStatusApproved: 'Approved and published',
    profileStatusRejected: 'Requires revisions',
    profileStatusArchived: 'Archived',
    profileSaveButton: 'Save Changes',
    profileSavingButton: 'Saving...',
    profileSaveSuccess: 'Profile updated successfully!',
    profileSaveError: 'Failed to save profile. Please try again.',
    publicProfileTitle: 'Researcher Profile',
    publicProfileBadge: 'Verified Researcher',
    publicProfileBio: 'Academic Biography',
    publicProfileDisciplines: 'Scientific Disciplines',
    publicProfileAreas: 'Specialization Areas',
    publicProfileLinks: 'Official Profiles & Links',
    publicProfileShare: 'Share Profile',
    publicProfileShareCopied: 'Link copied to clipboard!',
    publicProfileContactCta: 'Interested in collaborating or inviting this researcher to an event?',
    publicProfileClose: 'Close',
    viewPublicProfile: 'View full profile',
    clearFilters: 'Clear filters',
    showingResults: 'Showing',
    allDisciplines: 'All disciplines',
    allDepartments: 'All departments',
    filterByDiscipline: 'Discipline',
    filterByDepartment: 'Location',
    institutionModalTitle: 'Institution Registration & Administration',
    institutionModalSubtitle: 'Link a university, research center or laboratory to Red Científica Boliviana.',
    institutionNameLabel: 'Official Institution Name',
    institutionNamePlaceholder: 'E.g. Universidad Mayor de San Simón (UMSS)',
    institutionTypeLabel: 'Entity Type',
    institutionDeptLabel: 'Department in Bolivia',
    institutionCityLabel: 'City / Headquarters',
    institutionCityPlaceholder: 'E.g. Cochabamba, La Paz...',
    institutionWebsiteLabel: 'Official Website',
    institutionWebsitePlaceholder: 'https://...',
    institutionEmailLabel: 'Contact Email / Institutional Liaison',
    institutionEmailPlaceholder: 'contact@institution.edu.bo',
    institutionLogoLabel: 'Official Logo URL',
    institutionLogoPlaceholder: 'https://... (link to institution logo)',
    institutionDescEsLabel: 'Description and Research Lines (Spanish)',
    institutionDescEnLabel: 'Description and Research Lines (English)',
    institutionDescPlaceholder: 'Describe the scientific mission, research centers or priority research areas...',
    institutionRegisterButton: 'Register Institution',
    institutionRegistering: 'Saving record...',
    institutionRegisterSuccess: 'Institution submitted successfully! It will become visible following coordinator review.',
    institutionRegisterError: 'An error occurred while registering the institution. Please try again.',
    institutionCta: 'Register Partner Institution',
    publicInstitutionTitle: 'Institutional Profile',
    publicInstitutionBadge: 'Affiliated Institution',
    publicInstitutionAbout: 'About the Institution',
    publicInstitutionAffiliatedTitle: 'Affiliated Researchers',
    publicInstitutionAffiliatedEmpty: 'No affiliated researchers registered for this institution yet.',
    publicInstitutionWebsite: 'Official Website',
    publicInstitutionContact: 'Institutional Contact',
    publicInstitutionShare: 'Share Institutional Profile',
    publicInstitutionClose: 'Close',
    viewInstitutionProfile: 'View institution profile',
  },
};

export interface CoordinatorItem {
  id: string;
  name: string;
  roleKey: string;
  photo: string;
}

export const COORDINATORS: CoordinatorItem[] = [
  { id: 'julio-chavez', name: 'Julio Chávez, PhD', roleKey: 'coordinatorRole', photo: '/assets/people/Julio_Chavez.jpg' },
  { id: 'kenji-shoji', name: 'Kenji Shoji, PhD', roleKey: 'coordinatorRole', photo: '/assets/people/Kenji_Shoji.jpeg' },
  { id: 'natalia-machaca', name: 'Natalia Machaca, PhD', roleKey: 'coordinatorRole', photo: '/assets/people/Natalia_Machaca.jpeg' },
  { id: 'natalia-montellano', name: 'Natalia Montellano, PhD', roleKey: 'coordinatorRole', photo: '/assets/people/Natalia_Montellano.jpeg' },
  { id: 'erna-jungstein', name: 'Erna Jungstein, MSc', roleKey: 'coordinatorRole', photo: '/assets/people/Erna_Jungstein.jpeg' },
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

export const ACTIVITIES: Activity[] = [
  {
    id: 'talk-2026-11-15',
    published: true,
    date: '2026-11-15',
    type: 'meeting',
    title_es: 'Encuentro de la Red Científica Boliviana',
    title_en: 'Red Científica Boliviana gathering',
    description_es: 'De 18:00 a 19:00, hora de Bolivia (UTC−4).',
    description_en: '6:00–7:00 pm Bolivia time (UTC−4).',
  },
  {
    id: 'talk-2026-12-15',
    published: true,
    date: '2026-12-15',
    type: 'talk',
    title_es: 'El impacto de la IA en la enseñanza',
    title_en: 'The impact of AI on teaching',
    description_es: 'Una charla sobre el impacto de la inteligencia artificial en la enseñanza.',
    description_en: 'A talk about the impact of artificial intelligence on teaching.',
  },
];
