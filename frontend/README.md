# XPLAY5 Admin Portal - Frontend Setup

This is a production-quality frontend clone of the XPLAY5 Admin login interface built from scratch.

## Tech Stack
- **Core:** React 19 + TypeScript
- **Tooling:** Vite 8
- **Styling:** Tailwind CSS v4.0
- **Routing:** React Router v6
- **Icons:** Lucide React

## Project Structure
```text
frontend/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   └── Logo.tsx       # Reusable SVG XPLAY5 logo with custom stylized 'A'
│   │   ├── forms/
│   │   │   └── LoginForm.tsx  # Controlled inputs and mock loading animation
│   │   └── ui/
│   │       ├── Button.tsx     # Accessible button with spinner loading states
│   │       └── Input.tsx      # Accessible visually hidden label inputs
│   ├── layouts/
│   │   └── AuthLayout.tsx     # Fullscreen vertical blue gradient wrapper
│   ├── pages/
│   │   └── auth/
│   │       └── Login.tsx      # Centers the Sign In card layout
│   ├── routes/
│   │   └── AppRoutes.tsx      # Maps routing endpoints for /admin & /admin/login
│   ├── services/
│   │   └── api.ts             # Mock API login layer for backend coupling
│   ├── types/
│   │   └── auth.ts            # Strongly typed credentials and user objects
│   ├── index.css              # Custom CSS theme variables and layout resets
│   ├── main.tsx
│   └── App.tsx
├── .env.example
├── tsconfig.json
└── vite.config.ts
```

## Running the Application Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/admin` or `http://localhost:5173/admin/login` in your browser.

3. **Check build output / TypeScript compilation:**
   ```bash
   npm run build
   ```
