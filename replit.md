# Learning Management System

## Overview

This is a modern Learning Management System built with Next.js 15, featuring a comprehensive course management platform for both instructors and students. The application provides course browsing, instructor dashboards for content creation, and Firebase integration for data persistence. The system is designed with a component-based architecture using React, TypeScript, and Material-UI for the user interface.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: Next.js 15 with App Router for modern React development and server-side rendering
- **UI Components**: Material-UI (@mui/material) for consistent design system and pre-built components
- **Icons**: Mix of Material-UI icons (@mui/icons-material) and Lucide React icons for comprehensive iconography
- **Styling**: Tailwind CSS for utility-first styling with custom theme extensions
- **Typography**: Geist font family (sans and mono) for modern, readable text
- **State Management**: React hooks (useState, useEffect) for local component state
- **Client-Side Routing**: Next.js App Router with dynamic routes for courses and user pages

### Backend Architecture
- **API Routes**: Next.js API routes in `/app/api/` following RESTful conventions
- **Data Models**: TypeScript interfaces for Course, Lesson, Assignment, and related entities
- **Request Handling**: Separate routes for CRUD operations (GET, POST, PUT, DELETE)
- **Validation**: Server-side input validation for all API endpoints
- **Error Handling**: Structured error responses with appropriate HTTP status codes

### Data Storage Solutions
- **Primary Database**: Firebase Firestore for document-based data storage
- **Collections**: Separate collections for courses, lessons, and assignments
- **Data Relationships**: Course-to-lessons and course-to-assignments relationships via courseId references
- **Timestamps**: Server-side timestamps for created/updated tracking
- **Real-time Capabilities**: Firestore's real-time listeners for live data updates

### Authentication and Authorization
- **Auth Provider**: Firebase Authentication for user management
- **Storage**: Firebase Storage for file uploads and media content
- **Analytics**: Firebase Analytics for usage tracking and insights
- **Security**: Firestore security rules and authenticated API endpoints (planned)

### Component Structure
- **Page Components**: Route-specific components in `/app/` directory
- **Reusable Components**: Shared UI components in `/components/` directory
- **Form Components**: Specialized forms for course, lesson, and assignment creation
- **Layout Components**: Navbar and layout wrappers for consistent page structure
- **Card Components**: Reusable course cards for listing and display

## External Dependencies

### Core Framework Dependencies
- **Next.js 15.5.2**: React framework for production applications
- **React 19.1.0 & React DOM 19.1.0**: Latest React library for component rendering
- **TypeScript**: Static type checking for enhanced development experience

### UI and Styling
- **Material-UI v7.3.2**: Comprehensive React component library with theme support
- **@emotion/react & @emotion/styled**: CSS-in-JS library powering Material-UI styling
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Lucide React**: Modern icon library for additional iconography

### Backend Services
- **Firebase 12.2.1**: Complete backend-as-a-service platform including:
  - Firestore for NoSQL database
  - Authentication for user management
  - Storage for file uploads
  - Analytics for usage tracking

### Development Tools
- **ESLint**: Code linting for consistent code quality
- **PostCSS & Autoprefixer**: CSS post-processing for browser compatibility
- **TypeScript Compiler**: Static type checking and compilation

### Configuration Considerations
- **Replit Optimization**: Custom headers configuration for iframe compatibility
- **Font Optimization**: Next.js font optimization for Geist typography
- **Image Optimization**: Next.js Image component for performance-optimized images
- **Environment Configuration**: Firebase configuration through environment variables