# PREHSG Contest Hub - Frontend

Modern React + Vite frontend for managing PREHSG contests.

## Features

- ⚡ **Vite** - Lightning-fast build tool and dev server
- ⚛️ **React 18** - Latest React with hooks and concurrent features
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🧩 **shadcn/ui** - High-quality, unstyled component library
- 🎭 **Framer Motion** - Smooth animations and transitions
- 📱 **Responsive** - Mobile-first design
- 🔌 **TypeScript** - Type-safe code
- 🛣️ **React Router** - Client-side routing

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Header.tsx       # Main navigation header
│   ├── Sidebar.tsx      # Year/class sidebar with accordion
│   ├── ContestCard.tsx  # Individual contest display
│   ├── AdminPanel.tsx   # Admin CRUD interface
│   └── Button.tsx       # Custom button component
├── pages/               # Page components
│   ├── HomePage.tsx     # Main page
│   └── AdminPage.tsx    # Admin page
├── lib/                 # Utilities and helpers
│   └── api.ts           # Axios API client
├── App.tsx              # Main app with routing
├── main.tsx             # Entry point
└── index.css            # Global styles

```

## Installation & Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Available Scripts

- `npm run dev` - Start development server (http://localhost:5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Environment Configuration

The app expects the backend API to be available at `http://localhost:8000/api`.

This is configured in `vite.config.ts` with a proxy that rewrites `/api` requests to the backend.

## Features

### Home Page
- Class selection (9, 10, 11, 12)
- Sidebar with year-based accordion
- Contest cards with links
- Smooth animations

### Admin Panel
- Add new contests
- Edit existing contests
- Delete contests
- Table view of all contests
- Form validation
- Error handling

## API Integration

All API calls use the axios client in `src/lib/api.ts`:

```typescript
import { api } from '../lib/api';

// GET all contests
const response = await api.get('/contests');

// POST new contest
await api.post('/contests', contestData);

// PUT update contest
await api.put(`/contests/${id}`, updatedData);

// DELETE contest
await api.delete(`/contests/${id}`);
```

## Styling

Uses Tailwind CSS with custom configuration:
- Inter font family
- #f9fafb background
- Large spacing (gap-6, p-6)
- Smooth animations with Framer Motion
- shadcn/ui component patterns

## Component Hierarchy

```
App
├── HomePage
│   ├── Header
│   └── Sidebar
│       └── ContestCard
└── AdminPage
    └── AdminPanel
        └── Dialog (with form)
```
