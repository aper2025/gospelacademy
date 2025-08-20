# Overview

This is a Learning Management System (LMS) focused on biblical education, specifically designed for studying the teachings and ministry of Jesus Christ. The application provides a comprehensive platform for delivering structured learning content including lessons, quizzes, reflection questions, and progress tracking. It features separate interfaces for students and teachers, with role-based access control and authentication.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The frontend is built using React with TypeScript in a single-page application (SPA) architecture. Key design decisions include:

- **UI Framework**: Uses shadcn/ui components built on Radix UI primitives for consistent, accessible interface elements
- **Styling**: Tailwind CSS with custom CSS variables for theming and responsive design
- **State Management**: React Query (TanStack Query) for server state management and caching, with React hooks for local state
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for fast development and optimized production builds

## Backend Architecture
The backend follows a RESTful API design with Express.js:

- **Runtime**: Node.js with TypeScript using ESM modules
- **Framework**: Express.js for HTTP server and API routes
- **Development**: Hot reloading with tsx for development workflow
- **Authentication**: OpenID Connect (OIDC) integration with Replit's authentication system using Passport.js
- **Session Management**: Express sessions with PostgreSQL session store

## Database Design
Uses PostgreSQL with Drizzle ORM for type-safe database operations:

- **ORM**: Drizzle for schema definition and query building with full TypeScript support
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Schema Management**: Drizzle Kit for migrations and schema synchronization
- **Connection**: Connection pooling with @neondatabase/serverless

The database schema includes:
- User management with role-based access (student/teacher)
- Course structure with units and lessons
- Quiz system with questions and attempt tracking
- Progress tracking and enrollment management
- Reflection questions and responses
- Additional learning resources

## Authentication & Authorization
Implements enterprise-grade authentication:

- **Provider**: Replit OIDC for seamless integration with Replit environment
- **Strategy**: Passport.js with OpenID Connect strategy
- **Session Storage**: PostgreSQL-backed sessions for persistence
- **Role-Based Access**: Distinguishes between student and teacher roles
- **Security**: HTTP-only cookies with secure session management

## File Upload & Storage
Integrates cloud storage for learning materials:

- **Provider**: Google Cloud Storage for scalable file storage
- **Upload Interface**: Uppy.js for drag-and-drop file uploads with progress tracking
- **File Types**: Supports various educational content formats (videos, documents, images)

# External Dependencies

## Core Framework Dependencies
- **React 18**: Frontend framework with hooks and concurrent features
- **Express.js**: Backend web framework for API routes
- **TypeScript**: Type safety across frontend and backend
- **Vite**: Build tool and development server

## Database & ORM
- **PostgreSQL**: Primary database (via Neon Database)
- **Drizzle ORM**: Type-safe database operations
- **@neondatabase/serverless**: Serverless PostgreSQL client

## UI & Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **shadcn/ui**: Pre-built component library
- **Lucide React**: Icon library

## Authentication
- **Passport.js**: Authentication middleware
- **openid-client**: OpenID Connect client implementation
- **express-session**: Session management
- **connect-pg-simple**: PostgreSQL session store

## State Management & Data Fetching
- **TanStack React Query**: Server state management and caching
- **React Hook Form**: Form state management with validation
- **Zod**: Schema validation

## File Upload & Storage
- **Google Cloud Storage**: Cloud file storage service
- **Uppy**: File upload library with multiple plugins

## Development Tools
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript bundler for production
- **PostCSS**: CSS processing with Autoprefixer