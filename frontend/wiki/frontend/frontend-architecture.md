# Frontend Architecture — Eudaimonia

## Overview

React 19 frontend with component-based architecture, following these principles:
- **Separation of concerns** — UI components are dumb, pages are smart
- **Type safety** — Full TypeScript, no `any`
- **Composition** — Small, reusable components
- **Animation** — Framer Motion for transitions
- **Routing** — React Router v7 with nested layouts

## Folder Structure

```
src/
├── components/
│   ├── ui/                    # Design system components
│   │   ├── GreekButton.tsx    # Button with variants
│   │   ├── GreekCard.tsx      # Card with compound components
│   │   ├── GreekInput.tsx     # Form input with validation
│   │   ├── GreekBadge.tsx     # Badges (streak, frequency)
│   │   ├── GreekAvatar.tsx    # User avatar
│   │   ├── GreekModal.tsx     # Modal dialog
│   │   └── index.ts           # Barrel export
│   │
│   ├── layout/                # Layout components
│   │   ├── AppShell.tsx       # Main layout wrapper
│   │   └── TheStoa.tsx        # Sidebar navigation
│   │
│   └── features/             # Feature-specific components (future)
│
├── pages/                     # Route pages
│   ├── HomePage.tsx          # Landing page
│   ├── LoginPage.tsx         # Auth page
│   ├── DashboardPage.tsx     # Main dashboard
│   ├── PracticesPage.tsx      # Practice list
│   └── ...                   # Other pages
│
├── hooks/                     # Custom React hooks (future)
├── lib/                       # Utilities
│   ├── router.tsx            # React Router config
│   └── utils.ts              # cn(), helpers
│
├── store/                     # Zustand store (future)
├── api/                       # API client (future)
├── types/                     # Shared types (future)
└── styles/
    └── globals.css           # Tailwind + custom CSS
```

## Design System

### Greek Theme

Colors inspired by Greek pottery and architecture:
- **Greek Red (#8B2500)** — Terracotta, used for primary actions
- **Gold (#B8860B)** — Olympic fire, used for streaks
- **Marble (#F0EDE8)** — Pentelic marble, used for cards
- **Parchment (#F5F0E8)** — Ancient manuscripts, background

Typography:
- **Cinzel** — Classical Roman/Greek capitals for headings
- **Cormorant Garamond** — Elegant serif for body text
- **JetBrains Mono** — Monospace for code/stats

### UI Component Variants

| Component | Variants |
|-----------|----------|
| GreekButton | primary, secondary, ghost, danger |
| GreekCard | default, elevated, outlined, parchment |
| GreekBadge | default, streak, success, warning, error, greek-red |
| GreekAvatar | sm, md, lg, xl |
| GreekInput | text, email, password, etc. (HTML input types) |

## Routing Structure

```
/                          → HomePage (public)
/auth/login               → LoginPage (public)
/auth/register            → RegisterPage (public)

/stoa                     → AppShell (protected)
  /stoa/                  → DashboardPage
  /stoa/practices         → PracticesPage
  /stoa/practices/:id     → PracticeDetailPage
  /stoa/checkin           → CheckInPage
  /stoa/reflections       → ReflectionsPage
  /stoa/profile           → ProfilePage
  /stoa/settings          → SettingsPage
```

## Key Learnings

### 1. Layout Components vs Page Components

Layout components (AppShell, TheStoa) wrap page content via React Router's `<Outlet />`:
```tsx
// AppShell renders <Outlet /> which displays the current page
function AppShell() {
  return (
    <>
      <TheStoa />  {/* Sidebar */}
      <main>
        <Outlet />  {/* Current page renders here */}
      </main>
    </>
  );
}
```

### 2. Mobile-First Responsive

```tsx
<div className="
  flex-col          // Mobile: stacked
  lg:flex-row       // Desktop: side by side
">
```

### 3. Animation with Framer Motion

Staggered list animations:
```tsx
<AnimatePresence>
  {items.map((item, i) => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.05 }}
    />
  ))}
</AnimatePresence>
```

### 4. CSS Custom Properties in Tailwind

Use `var(--color-name)` in CSS, then reference as Tailwind classes:
```css
@theme {
  --color-greek-red: #8B2500;
}

.element {
  background-color: var(--color-greek-red);
  /* OR */
  bg-greek-red  /* Tailwind generates this from @theme */
}
```

## State Management (Planned)

| State Type | Solution | When |
|-----------|----------|------|
| Server state | React Query | API data, caching |
| Global UI | Zustand | Sidebar open, theme |
| Form state | React Hook Form | Form inputs, validation |
| URL state | React Router | Current route, params |

## Testing Strategy (Planned)

| Type | Tool | Target |
|------|------|--------|
| Unit | Vitest | Hooks, utils |
| Component | Testing Library | UI components |
| Integration | Testing Library + MSW | API flows |
| E2E | Playwright | Critical paths |

## Related

- [[react-19-vite-setup]] — Project setup details
- [[tailwind-v4-design-system]] — Design system
- [[component-composition]] — Component patterns
- [[frontend-phase-2-plan]] — Next phase plans
