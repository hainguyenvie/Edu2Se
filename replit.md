# AitheduConnect - Online Tutoring Marketplace

## Overview

AitheduConnect is a Vietnamese online tutoring marketplace that connects students (9th-12th grade) with qualified tutors. The platform emphasizes speed (3-second registration), marketplace choice, viral growth features, scalability, and student freedom. It's built as a full-stack web application with a React frontend and Express.js backend.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Architecture Pattern**: Feature-based modular architecture
- **Routing**: Wouter for client-side routing
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens optimized for Vietnamese market
- **State Management**: TanStack Query (React Query) for server state management
- **Build Tool**: Vite for fast development and optimized builds
- **Code Organization**: Feature-driven development with barrel exports and custom hooks

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Storage**: In-memory storage with interface for future database integration
- **API Design**: RESTful API with proper error handling and logging
- **Development**: Hot reload with Vite integration

### Data Storage Solutions
- **Current**: In-memory storage using Maps for development
- **Future Ready**: Drizzle ORM configured for PostgreSQL with Neon Database
- **Schema**: Comprehensive database schema defined with proper relationships
- **Migrations**: Drizzle Kit for database migrations

### Code Architecture (Refactored - January 2025)
- **Feature-Based Organization**: Components organized by business features rather than technical concerns
- **Type Safety**: Comprehensive type system with shared types and proper schema validation
- **Constants Management**: Centralized configuration and constants for maintainability
- **Custom Hooks**: Business logic extracted into reusable custom hooks
- **Component Modularization**: Large components broken down into focused, single-responsibility components
- **Utility Functions**: Common operations centralized in utility modules

## Key Components

### 1. User Management
- **Users Table**: Stores user accounts with roles (student, tutor, admin)
- **Authentication**: Basic structure in place for future implementation
- **Authorization**: Role-based access control ready

### 2. Tutor Marketplace
- **Tutor Profiles**: Comprehensive tutor information including subjects, grades, education, experience
- **Search & Filtering**: Advanced filtering by subject, price range, time slots, course type
- **Rating System**: Built-in rating and review system
- **Status Management**: Online/offline/busy status tracking

### 3. Subject Management
- **Multilingual Support**: Vietnamese and English subject names
- **Visual Design**: Color-coded subjects with custom icons
- **Categorization**: Organized by academic subjects and special services

### 4. Video Content
- **Tutor Videos**: Video content system for tutor showcases
- **Carousel Display**: Instagram-story-like video presentation
- **Content Management**: Structured video metadata and thumbnails

### 5. Community Features
- **Study-With-Me Rooms**: Virtual study sessions
- **Q&A Forum**: Community-driven question and answer platform
- **Leaderboards**: Gamification elements for engagement

### 6. Vietnamese Market Optimization
- **UI/UX**: Designed specifically for Vietnamese users
- **Language**: Full Vietnamese localization support
- **Cultural Adaptation**: Colors, imagery, and patterns suited for Vietnamese preferences
- **Mobile-First**: Optimized for high mobile usage in Vietnam

## Data Flow

1. **Client Request**: React components make API calls through TanStack Query
2. **API Layer**: Express.js routes handle requests with proper validation
3. **Business Logic**: Storage interface abstracts data operations
4. **Data Storage**: Currently in-memory, designed for easy database migration
5. **Response**: JSON responses with proper error handling
6. **Client Update**: TanStack Query manages cache and UI updates

## External Dependencies

### Core Technologies
- **@tanstack/react-query**: Server state management and caching
- **drizzle-orm**: Type-safe database ORM
- **@neondatabase/serverless**: PostgreSQL database connection
- **zod**: Runtime type validation
- **wouter**: Lightweight React router

### UI Framework
- **@radix-ui/***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Icon library

### Development Tools
- **vite**: Build tool and development server
- **typescript**: Type safety and developer experience
- **eslint**: Code quality and consistency

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with hot reload
- **Database**: In-memory storage for quick iteration
- **Error Handling**: Runtime error overlay for debugging

### Production Build
- **Frontend**: Vite build with optimized bundles
- **Backend**: esbuild for Node.js bundle optimization
- **Static Assets**: Served through Express with proper caching

### Database Migration
- **Current**: Memory storage with sample data initialization
- **Migration Path**: Drizzle ORM ready for PostgreSQL deployment
- **Schema Management**: Version-controlled database schema

### Scalability Considerations
- **Stateless Design**: No server-side sessions, ready for horizontal scaling
- **CDN Ready**: Static assets optimized for CDN deployment
- **Database Ready**: Prepared for production database integration
- **Monitoring**: Request logging and error tracking built-in

## Recent Changes (January 2025)

### Major Refactoring Completed
- **Feature-Based Architecture**: Restructured codebase from flat component organization to feature-based modules
- **Virtual Classroom Modularization**: Broke down 350+ line component into focused, reusable components
- **Type System Overhaul**: Created comprehensive type definitions and resolved schema inconsistencies
- **Constants Management**: Centralized configuration system for API endpoints, routes, and UI constants
- **Custom Hooks Implementation**: Extracted business logic into reusable hooks for better maintainability
- **Component Optimization**: Created modular components with proper separation of concerns
- **Utility Functions**: Added formatting, storage, and common operation utilities
- **Barrel Exports**: Implemented clean import patterns for better developer experience

### Architecture Benefits
- **Maintainability**: Clear separation of concerns and single responsibility principle
- **Scalability**: Feature-based structure allows for easy team scaling and parallel development
- **Developer Experience**: Better IntelliSense, type safety, and clear project structure
- **Performance**: Smaller component bundles and better tree-shaking opportunities

The architecture prioritizes rapid development while maintaining production readiness, with special attention to Vietnamese market requirements and mobile-first design principles. The recent refactoring establishes a solid foundation for future feature development and team collaboration.