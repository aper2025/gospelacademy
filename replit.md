# Overview

This is a Learning Management System (LMS) focused on biblical education, specifically designed for studying the teachings and ministry of Jesus Christ. The application provides a comprehensive platform for delivering structured learning content including lessons, quizzes, reflection questions, and progress tracking. It features separate interfaces for students and teachers, with role-based access control and authentication.

## Recent Updates (August 24, 2025)
- **Class-Specific Content Management**: Implemented requirement for teachers to select a specific class before making any content changes
- **Enhanced Content Control**: All teaching materials, lesson modifications, quiz changes, and reflection questions are now class-specific rather than global
- **Database Schema Updates**: Added classId fields to lessons, quizzes, reflection questions, and additional resources tables
- **Improved Teacher Interface**: Added class selection banner and validation to ensure content changes apply only to selected class
- **Email-Only Authentication**: Removed Replit OAuth and simplified system to use email/password authentication exclusively
- **Real Course Progress**: Dashboard now displays actual course statistics from database instead of placeholder data

## Previous Updates (August 20, 2025)
- **Chapter 1 Content Integration**: Successfully broke down "The Intertestamental Period - 400 Years of Silence" from the provided textbook into 4 comprehensive lessons
- **Lesson Structure**: Each lesson includes detailed content, learning objectives, key terms, 3 reflection questions, and 3-question quizzes with explanations
- **Database Seeding**: Populated the course database with Unit 1 containing all Chapter 1 lessons, quizzes, and reflection questions
- **Video Resources**: Added YouTube video resource (https://www.youtube.com/watch?v=2_70RbtRO5w&t=166s) covering Chapter 1 content across all lessons
- **Course Enrollment**: Set up automatic enrollment system for students to access the biblical education content

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