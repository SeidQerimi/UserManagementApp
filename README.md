## User Management App

A modern, responsive React + TypeScript app for managing users. Built as part of the React Internship Challenge. All data is stored in Redux and persisted in localStorage.

## Features

### Users List
- Browse all users in a clean, responsive layout  
- Filter users by name or email  
- Sort users by name or company  

### User Details
- Full information including contact, company, and address  

### Add User
- Form with validation (name and email required)  
- New users added at the top of the list  

### Edit & Delete
- Update existing users  
- Delete users with confirmation  

### Persistence
- State saved in Redux and localStorage  

### Animations
- Smooth transitions using Framer Motion  

### Responsive Design
- Optimized for mobile, tablet, and desktop  

## Tech Stack

- React 18 + TypeScript  
- Redux Toolkit  
- React Router v6  
- React Hook Form  
- Tailwind CSS  
- Framer Motion  
- Vitest + React Testing Library  

## Getting Started

### Prerequisites
- Node.js 18+ and npm  

### Installation
```bash
git clone https://github.com/yourusername/user-management-app.git
cd user-management-app
npm install
npm run dev
Open http://localhost:5173 in your browser.

Available Scripts
npm run dev → Start development server

npm run build → Build for production

npm run preview → Preview production build

npm test → Run tests in watch mode

Reset Data
javascript
Copy code
localStorage.removeItem('users_app_data')
location.reload()
Project Structure
bash
Copy code
src/
├── components/   # Reusable UI components
├── pages/        # Route pages
├── store/        # Redux slices
├── hooks/        # Custom hooks
├── types/        # TypeScript interfaces
├── test/         # Unit tests
└── App.tsx       # Main routes and layout
Testing
Users list renders correctly

Form validation works (name required, valid email)

Redux slice supports add, update, delete

Run tests:

bash
Copy code
npm test
Live Demo & Repository
Live demo:  { Add your deployed link }

GitHub repository: user-management-app-yourname

Notes
Clean, professional design

State persists across reloads

All code written manually for this challenge