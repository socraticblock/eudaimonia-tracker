# Εὐδαιμονία (Eudaimonia)

> *"ἓν οἶδα ὅτι οὐδὲν οἶδα"* — I know that I know nothing.
> — Socrates (Σωκράτης)

---

**Eudaimonia** (εὖ = good, δαίμων = spirit) — "flourishing through virtuous action."

An Ancient Greek themed habit tracker for philosophers seeking to practice (ἄσκησις / *askēsis*) daily disciplines. Built with clean architecture, TDD, and the Stoic principles of consistency and self-examination.

---

## The Philosophy

The Ancient Greeks understood that excellence is not a gift, but a habit. The philosopher who practices daily — whether meditation, journaling, or physical training — builds an unbreakable chain (ἀλυσίδα / *alysida*) of virtue.

**Eudaimonia** is your companion on the path of *askēsis* — the daily practice that leads to flourishing.

### Key Concepts

| Greek | Transliteration | Meaning |
|-------|----------------|---------|
| Εὐδαιμονία | Eudaimonia | Flourishing through virtuous practice |
| ἄσκησις | *askēsis* | Training, discipline, practice |
| Φιλόσοφος | *philosophos* | Lover of wisdom (you) |
| στοά | *stoa* | The colonnade (Zeno's school) |
| Πρᾶξις | *praxis* | Practice, action |
| Ἔλεγχος | *elegchos* | Examination (daily check-in) |
| Ἀλυσίδα | *alysida* | Chain (streak) |
| Σκέψις | *skepsis* | Contemplation (evening review) |

---

## Features

- **The Practices** (Πρᾶξις) — Create daily habits with Greek/Stoic names
- **The Stoa** (stoá) — Dashboard showing your progress across all practices
- **The Olympic Fire** (Ἀλυσίδα) — Streak tracking for consistency
- **The Examination** (Ἔλεγχος) — Daily check-ins with optional notes
- **The Library** (Βιβλιοθήκη) — Wiki notes for learning
- **Evening Review** (Σκέψις) — Marcus Aurelius-style daily reflection

---

## Tech Stack

- **TypeScript** — Type-safe JavaScript
- **Node.js 22** — Runtime
- **Express** — HTTP framework
- **Prisma** — PostgreSQL ORM
- **Vitest** — Testing (TDD)
- **Docker** — Containerization
- **GitHub Actions** — CI/CD

---

## Getting Started

### Prerequisites

- Node.js 22+
- Docker + Docker Compose
- PostgreSQL 16+ (or use Docker)

### Installation

```bash
# Clone the repository
git clone https://github.com/socraticblock/eudaimonia-tracker.git
cd eudaimonia-tracker

# Install dependencies
npm ci

# Set up environment
cp .env.example .env
# Edit .env with your values

# Start PostgreSQL
docker-compose up -d postgres

# Run migrations
npx prisma migrate dev

# Start development server
npm run dev
```

### Using Docker (Full Stack)

```bash
# Start everything
docker-compose up -d

# View logs
docker-compose logs -f app
```

---

## Development

### Architecture

```
src/
├── components/           # Business components (autonomous)
│   ├── philosophers/    # User management
│   ├── practices/       # Habit management
│   ├── checkins/        # Daily check-ins
│   └── streaks/         # Streak calculation
├── layers/              # Three-tier architecture
│   ├── entry-points/    # Controllers, routes
│   ├── domain/          # Entities, business logic
│   └── data-access/     # Repositories, DB access
└── shared/              # Cross-cutting concerns
    ├── errors/          # Custom error classes
    ├── logger/          # Winston structured logging
    └── middleware/       # Express middleware
```

### Testing (TDD)

```bash
# Run tests
npm run test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage
```

### Code Quality

```bash
# Lint
npm run lint

# Fix auto-fixable issues
npm run lint:fix

# Type check
npm run typecheck
```

---

## Project Phases

This project is built following a systematic mastery roadmap:

- [x] Phase 0: Foundation (scaffold, Greek domain model)
- [ ] Phase 1: Architecture (3-tier layers, repository pattern)
- [ ] Phase 2: Testing (TDD, AAA pattern, per-test data)
- [ ] Phase 3: PostgreSQL (schema, indexes, Prisma)
- [ ] Phase 4: Security (JWT, bcrypt, rate limiting, OWASP)
- [ ] Phase 5: REST API (full CRUD, error handling, OpenAPI)
- [ ] Phase 6: Performance (health checks, logging, observability)
- [ ] Phase 7: Docker + CI/CD (multi-stage build, GitHub Actions)
- [ ] Phase 8: Wiki (learning notes for every concept)

---

## The Daily Practice

The Stoic philosopher begins each day with discipline:

```
┌─────────────────────────────────────────────────────────┐
│                    THE STOA OPENS                         │
│                                                          │
│   Morning Practice (Ἀκροάσις)                            │
│   ☀️ "Have I meditated on what is in my control?"        │
│                                                          │
│   Daily Check-In (Ἔλεγχος)                              │
│   ✅ "Did I practice my disciplines today?"               │
│                                                          │
│   Evening Review (Σκέψις)                                │
│   🌙 "What did I do well? What could I improve?"         │
│                                                          │
│   The Olympic Fire burns bright.                          │
│   Your streak: 7 days. The chain grows stronger.          │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## License

MIT

---

*"We suffer more often in imagination than in reality."*
— Seneca (Σενέκας)
