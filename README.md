# Εὐδαιμονία (Eudaimonia)

> *"We suffer more often in imagination than in reality."* — Seneca

---

**Eudaimonia** (εὖ = good, δαίμων = spirit) — "flourishing through virtuous action."

An Ancient Greek themed habit tracker for philosophers seeking to practice (ἄσκησις / *askēsis*) daily disciplines.

---

## Architecture

**Monorepo** with two services:

| Service | Path | Tech | Port |
|---------|------|------|------|
| Backend API | `/` | Node.js, Express, Prisma, PostgreSQL | 3000 |
| Frontend | `/frontend` | React 19, Vite, Tailwind CSS v4 | 5173 |

```
eudaimonia/
├── src/                    # Backend source
│   ├── components/         # Business logic (practices, checkins, streaks)
│   ├── layers/            # 3-tier: entry-points, domain, data-access
│   └── shared/            # Errors, logger, middleware
├── frontend/              # Frontend React app
│   ├── src/
│   │   ├── components/   # UI design system
│   │   ├── pages/        # Route pages
│   │   └── lib/          # Router, utils
│   └── ...
├── prisma/               # Database schema
├── wiki/                 # Learning notes
└── docker-compose.yml    # Full stack
```

---

## Quick Start

### Prerequisites
- Node.js 22+
- Docker + Docker Compose

### Backend Only (Development)
```bash
npm install
npm run dev        # Start backend on :3000
```

### Frontend Only
```bash
cd frontend
npm install
npm run dev        # Start frontend on :5173
```

### Full Stack (Docker)
```bash
docker-compose up -d
# Backend: http://localhost:3000
# Frontend: http://localhost:5173
```

---

## Development

### Backend Scripts
```bash
npm run dev          # Development server
npm run build        # TypeScript build
npm run test         # Run tests
npm run lint         # ESLint
npm run typecheck    # TypeScript check
```

### Frontend Scripts
```bash
cd frontend
npm run dev          # Vite dev server
npm run build        # Production build
npm run lint         # ESLint
```

---

## Project Phases

### Backend (eudaimonia-tracker)
- [x] Phase 0: Foundation
- [x] Phase 1: Architecture + TDD
- [ ] Phase 2: PostgreSQL + Prisma
- [ ] Phase 3: Security (JWT, rate limiting)
- [ ] Phase 4: REST API
- [ ] Phase 5: Docker + CI/CD

### Frontend (eudaimonia-frontend)
- [x] Phase 1: Foundation + Design System
- [ ] Phase 2: API Layer + State (React Query, Zustand)
- [ ] Phase 3: Authentication Flow
- [ ] Phase 4: Practices CRUD
- [ ] Phase 5: Check-In Flow
- [ ] Phase 6: Streak System
- [ ] Phase 7: Reflections
- [ ] Phase 8: PWA + Deployment

---

## Tech Stack

### Backend
- **Runtime:** Node.js 22
- **Language:** TypeScript (strict mode)
- **Framework:** Express
- **ORM:** Prisma
- **Database:** PostgreSQL 16
- **Testing:** Vitest
- **Validation:** Zod

### Frontend
- **Framework:** React 19
- **Build:** Vite 6
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Routing:** React Router v7
- **State:** Zustand + React Query
- **Animation:** Framer Motion
- **Icons:** Lucide React

---

## Greek Domain Model

| English | Greek | Description |
|---------|-------|-------------|
| Philosopher | Φιλόσοφος | User/practitioner |
| Practice | Πρᾶξις | Habit/discipline |
| Check-In | Ἔλεγχος | Daily examination |
| Streak | Ἀλυσίδα | Consistency chain |
| Reflection | Σκέψις | Evening contemplation |
| Dashboard | Στοά | The colonnade |

---

## License

MIT
