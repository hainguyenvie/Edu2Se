# AitheduConnect

> Vietnamese Online Tutoring Marketplace - Connecting Students with Qualified Tutors

![AitheduConnect](https://img.shields.io/badge/AitheduConnect-Vietnamese%20Tutoring-blue)
![React](https://img.shields.io/badge/React-18-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6)
![Node.js](https://img.shields.io/badge/Node.js-20-339933)

Deploy-Link: https://edu2se.replit.app/

## 🌟 Overview

AitheduConnect is a comprehensive online tutoring marketplace designed specifically for the Vietnamese education market. The platform connects 9th-12th grade students with qualified tutors, emphasizing speed (3-second registration), marketplace choice, viral growth features, and student freedom.

## ✨ Key Features

### 🎓 For Students
- **Quick Registration**: 3-second sign-up process
- **Advanced Search**: Filter tutors by subject, price, time slots, and course type
- **Video Previews**: Watch tutor introduction videos before booking
- **Real-time Messaging**: Chat with tutors instantly
- **Virtual Classroom**: Interactive online learning environment
- **Dashboard**: Track learning progress and manage bookings

### 👨‍🏫 For Tutors
- **Comprehensive Profiles**: Showcase education, experience, and teaching style
- **Schedule Management**: Set availability and manage time slots
- **Statistics Dashboard**: Track earnings, student count, and reviews
- **Virtual Teaching Tools**: Whiteboard, drawing tools, and screen sharing
- **Real-time Communication**: Chat and video capabilities

### 🏫 Virtual Classroom
- **Lessonspace-style Interface**: Professional online teaching environment
- **Interactive Whiteboard**: Drawing tools, shapes, text, and annotations
- **Real-time Chat**: Student-teacher communication during lessons
- **Media Controls**: Camera, microphone, and screen sharing
- **Multi-tab Navigation**: Mathematics, Documents, and specialized tools

## 🚀 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and builds
- **Wouter** for lightweight routing
- **TanStack Query** for server state management
- **shadcn/ui** components built on Radix UI
- **Tailwind CSS** with Vietnamese market optimizations

### Backend
- **Node.js** with Express.js
- **TypeScript** with ES modules
- **In-memory storage** (development) / **PostgreSQL** (production)
- **Drizzle ORM** for type-safe database operations
- **Zod** for runtime validation

### Architecture
- **Feature-based organization** for scalability
- **Type-safe APIs** with comprehensive validation
- **Custom hooks** for business logic
- **Modular components** with single responsibilities

## 📁 Project Structure

```
├── client/                     # Frontend React application
│   ├── src/
│   │   ├── components/         # Shared UI components
│   │   ├── features/           # Feature-based modules
│   │   │   ├── virtual-classroom/
│   │   │   ├── meeting-room/
│   │   │   ├── tutors/
│   │   │   └── common/
│   │   ├── pages/              # Route components
│   │   ├── config/             # Constants and configuration
│   │   ├── utils/              # Utility functions
│   │   └── lib/                # Core libraries
├── server/                     # Backend Express application
│   ├── index.ts                # Server entry point
│   ├── routes.ts               # API routes
│   ├── storage.ts              # Data storage layer
│   └── vite.ts                 # Vite integration
├── shared/                     # Shared types and schemas
│   ├── types.ts                # Type definitions
│   └── schema.ts               # Database schema
└── docs/                       # Documentation
    ├── REFACTORING.md          # Refactoring documentation
    └── README.md               # This file
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 20+ 
- npm or yarn

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd aitheduconnect
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5000
   ```

### Environment Variables

Create a `.env` file in the root directory:

```env
# Development
NODE_ENV=development

# Database (for production)
DATABASE_URL=postgresql://username:password@localhost:5432/aitheduconnect

# Optional: External services
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
```

## 🗺️ Navigation Guide

### Main Routes
- `/` - Homepage with tutor discovery
- `/tutor/:id` - Individual tutor profiles
- `/dashboard` - Student/tutor dashboard
- `/virtual-classroom` - Interactive online classroom
- `/messages` - Real-time messaging
- `/favorites` - Saved tutors
- `/my-profile` - Profile management

### Key Features to Explore

1. **Browse Tutors**: Start on homepage to explore available tutors
2. **Video Previews**: Click video thumbnails to see tutor introductions
3. **Advanced Filtering**: Use sidebar filters to find specific tutors
4. **Virtual Meeting**: Click "Meet" buttons to join virtual classrooms
5. **Real-time Chat**: Test messaging functionality
6. **Tutor Dashboard**: View comprehensive analytics and management tools

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Database
npm run db:push      # Push schema changes
npm run db:studio    # Open Drizzle Studio
npm run db:migrate   # Run migrations

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

### Code Organization

#### Feature-Based Architecture
Each feature is self-contained with its own:
- Components
- Hooks
- Types
- Data/Constants

#### Component Structure
```typescript
// Standard component pattern
export function ComponentName({ props }: Props) {
  const { state, handlers } = useCustomHook();
  
  return (
    <div>
      {/* Component JSX */}
    </div>
  );
}
```

#### Custom Hooks
```typescript
// Business logic extraction
export function useFeature() {
  const [state, setState] = useState();
  
  const handleAction = () => {
    // Business logic
  };
  
  return { state, handleAction };
}
```

## 🌐 Vietnamese Market Optimization

### UI/UX Considerations
- **Mobile-first design** for high mobile usage
- **Vietnamese typography** and reading patterns
- **Cultural color preferences** and visual hierarchy
- **Local payment methods** integration ready
- **Vietnamese educational system** alignment

### Localization
- Full Vietnamese language support
- Subject names in Vietnamese and English
- Cultural adaptation for Vietnamese students
- Local time zones and currency formatting

## 🔒 Security & Privacy

### Data Protection
- Type-safe APIs prevent injection attacks
- Input validation with Zod schemas
- Secure session management
- CORS configuration for production

### Privacy Features
- Student data protection
- Tutor verification system
- Secure video communications
- Privacy controls for profiles

## 📈 Performance

### Optimization Features
- **Vite** for fast builds and HMR
- **Tree-shaking** for minimal bundle size
- **Code splitting** by features
- **Image optimization** for Vietnamese market
- **TanStack Query** for efficient data fetching

### Metrics
- ~3 second registration time
- Optimized for Vietnamese internet speeds
- Mobile-responsive design
- Efficient state management

## 🤝 Contributing

### Development Workflow

1. **Create feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Follow code standards**
   - Use TypeScript for type safety
   - Follow feature-based organization
   - Write tests for business logic
   - Update documentation

3. **Test thoroughly**
   ```bash
   npm run dev
   npm run type-check
   ```

4. **Submit pull request**
   - Clear description of changes
   - Include screenshots for UI changes
   - Update documentation if needed

### Code Standards

- **TypeScript**: Strict mode enabled
- **ESLint**: Airbnb configuration
- **Prettier**: Consistent formatting
- **Component patterns**: Follow established patterns
- **Feature organization**: Keep features self-contained

## 📚 Documentation

### Additional Resources
- [Refactoring Guide](./REFACTORING.md) - Recent architectural improvements
- [replit.md](./replit.md) - Technical architecture details
- [API Documentation](./docs/api.md) - Backend API reference
- [Component Library](./docs/components.md) - UI component guide

### Learning Resources
- [React 18 Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TanStack Query](https://tanstack.com/query/latest)
- [shadcn/ui Components](https://ui.shadcn.com/)

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Environment Setup
1. Set up PostgreSQL database
2. Configure environment variables
3. Run database migrations
4. Deploy to hosting platform

### Recommended Platforms
- **Vercel** for frontend
- **Railway** for backend and database
- **Neon** for PostgreSQL database
- **Cloudflare** for CDN

## 🐛 Troubleshooting

### Common Issues

**Development server won't start**
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**TypeScript errors**
```bash
# Run type checking
npm run type-check
```

**Database connection issues**
```bash
# Check environment variables
cat .env
```

### Getting Help

1. Check the [issues page](./issues) for known problems
2. Review [documentation](./docs/) for guidance
3. Contact development team for support

## 📄 License

This project is proprietary software developed for the Vietnamese education market.

## 👥 Team

**Development Team**
- Architecture & Backend Development
- Frontend Development & UI/UX
- Vietnamese Market Research & Localization
- Quality Assurance & Testing

---

**Built with ❤️ for Vietnamese Education**

*Empowering students and tutors through innovative online learning technology*
