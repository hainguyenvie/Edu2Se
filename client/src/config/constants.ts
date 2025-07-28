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
  Calculator: 'hsl(207, 90%, 54%)', // Math - Blue
  Book: 'hsl(142, 71%, 45%)', // Literature - Green  
  Zap: 'hsl(16, 89%, 58%)', // Physics - Orange
  Beaker: 'hsl(340, 82%, 52%)', // Chemistry - Pink
  Leaf: 'hsl(120, 61%, 50%)', // Biology - Green
  Languages: 'hsl(262, 83%, 58%)', // English - Purple
  Globe: 'hsl(221, 83%, 53%)', // French - Blue
  GlobeEurope: 'hsl(0, 72%, 51%)', // Russian - Red
  Star: 'hsl(45, 93%, 47%)', // Test Prep - Yellow
  GraduationCap: 'hsl(291, 64%, 42%)', // Advanced - Purple
  MessageCircle: 'hsl(173, 58%, 39%)', // Consultation - Teal
  Compass: 'hsl(25, 95%, 53%)', // Career Guidance - Orange
} as const;

// Banner Configuration
export const BANNER_CONFIG = {
  AUTO_ROTATE_INTERVAL: 4000, // 4 seconds
  BANNERS: [
    {
      id: 'special-offer',
      title: '🎉 KHUYẾN MÃI ĐẶC BIỆT',
      subtitle: 'Học thử 15 phút miễn phí cho học viên mới • Giảm 50% khóa học đầu tiên',
      gradient: 'from-purple-400 to-pink-400',
      textColor: 'text-white',
      subtitleColor: 'text-purple-100'
    },
    {
      id: 'quality-tutors',
      title: '⭐ GIA SƯ CHẤT LƯỢNG CAO',
      subtitle: 'Hơn 1000+ gia sư được xác minh • Tỷ lệ hài lòng 98%',
      gradient: 'from-blue-500 to-indigo-600',
      textColor: 'text-white',
      subtitleColor: 'text-blue-100'
    },
    {
      id: 'flexible-learning',
      title: '📚 HỌC MỌI LÚC MỌI NƠI',
      subtitle: 'Lớp học trực tuyến linh hoạt • Thiết bị hỗ trợ đa dạng',
      gradient: 'from-green-500 to-teal-600',
      textColor: 'text-white',
      subtitleColor: 'text-green-100'
    }
  ]
} as const;

// Quick Search Categories (reordered for better logic)
export const QUICK_SEARCH_CATEGORIES = [
  { name: 'Toán', nameVi: 'TOÁN', icon: 'Calculator', color: SUBJECT_COLORS.Calculator, popular: true },
  { name: 'Văn', nameVi: 'VĂN', icon: 'Book', color: SUBJECT_COLORS.Book, popular: true },
  { name: 'Anh', nameVi: 'ANH', icon: 'Languages', color: SUBJECT_COLORS.Languages, popular: true },
  { name: 'Lý', nameVi: 'LÝ', icon: 'Zap', color: SUBJECT_COLORS.Zap, popular: false },
  { name: 'Hóa', nameVi: 'HÓA', icon: 'Beaker', color: SUBJECT_COLORS.Beaker, popular: false },
  { name: 'Sinh', nameVi: 'SINH', icon: 'Leaf', color: SUBJECT_COLORS.Leaf, popular: false },
] as const;