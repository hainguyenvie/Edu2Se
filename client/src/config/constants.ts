// Application Constants

// API Endpoints
export const API_ENDPOINTS = {
  TUTORS: '/api/tutors',
  SUBJECTS: '/api/subjects',
  VIDEOS: '/api/videos',
  USERS: '/api/users',
} as const;

// Route Paths
export const ROUTES = {
  HOME: '/',
  TUTOR_DETAIL: '/tutor/:id',
  MY_PROFILE: '/my-profile',
  FAVORITES: '/favorites',
  DASHBOARD: '/dashboard',
  MESSAGES: '/messages',
  VIRTUAL_CLASSROOM: '/virtual-classroom',
} as const;

// Virtual Classroom Constants
export const VIRTUAL_CLASSROOM = {
  ZOOM_LEVELS: [25, 50, 75, 100, 125, 150, 200],
  DEFAULT_ZOOM: 100,
  TOOLS: {
    POINTER: 'pointer',
    PEN: 'pen',
    HIGHLIGHTER: 'highlighter',
    SHAPES: 'shapes',
    TEXT: 'text',
    ERASER: 'eraser',
  },
  TABS: {
    MAIN_ROOM: 'Main Room',
    TOUR: 'Tour',
    MATHEMATICS: 'Mathematics',
    LANGUAGE: 'Language',
    DOCUMENTS: 'Documents',
    FORMULAS_GRAPHS: 'Formulas & Graphs',
    LINES: 'Lines',
    CODE: 'Code',
  },
} as const;

// UI Constants
export const UI = {
  BREAKPOINTS: {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
  },
  ANIMATION_DURATION: {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500,
  },
} as const;

// Vietnamese Localization
export const VIETNAMESE_LABELS = {
  WELCOME: 'Chào mừng',
  JOIN_CLASS: 'Vào lớp học',
  LEAVE_CLASS: 'Rời lớp',
  CAMERA: 'Camera',
  MICROPHONE: 'Microphone',
  CHAT: 'Chat',
  SETTINGS: 'Cài đặt',
  CONNECTING: 'Đang kết nối',
  CONNECTED: 'Đã kết nối',
  RAISE_HAND: 'Giơ tay',
  SHARE_SCREEN: 'Chia sẻ màn hình',
  SEND_MESSAGE: 'Gửi tin nhắn',
  ENTER_MESSAGE: 'Nhập tin nhắn...',
} as const;

// Meeting Room Constants
export const MEETING_ROOM = {
  CONNECTION_TIMEOUT: 5,
  VIDEO_CONSTRAINTS: {
    width: { ideal: 1280 },
    height: { ideal: 720 },
    frameRate: { ideal: 30 },
  },
  AUDIO_CONSTRAINTS: {
    echoCancellation: true,
    noiseSuppression: true,
    autoGainControl: true,
  },
} as const;

// Status Types
export const STATUS = {
  TUTOR: {
    ONLINE: 'online',
    OFFLINE: 'offline',
    BUSY: 'busy',
  },
  USER_ROLES: {
    STUDENT: 'student',
    TUTOR: 'tutor',
    ADMIN: 'admin',
  },
} as const;

// Price and Currency
export const CURRENCY = {
  VND: 'VND',
  FORMAT: new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }),
} as const;

// Time Slots
export const TIME_SLOTS = {
  MORNING: 'morning',
  AFTERNOON: 'afternoon',
  EVENING: 'evening',
} as const;

// Subject Colors and Icons (Vietnamese Market Optimized)
export const SUBJECT_COLORS = {
  MATH: 'hsl(207, 90%, 54%)',
  LITERATURE: 'hsl(142, 71%, 45%)',
  PHYSICS: 'hsl(16, 89%, 58%)',
  CHEMISTRY: 'hsl(340, 82%, 52%)',
  BIOLOGY: 'hsl(120, 61%, 50%)',
  ENGLISH: 'hsl(262, 83%, 58%)',
  FRENCH: 'hsl(221, 83%, 53%)',
  RUSSIAN: 'hsl(0, 72%, 51%)',
  TEST_PREP: 'hsl(45, 93%, 47%)',
  ADVANCED: 'hsl(291, 64%, 42%)',
  CONSULTATION: 'hsl(173, 58%, 39%)',
  CAREER_GUIDANCE: 'hsl(25, 95%, 53%)',
} as const;