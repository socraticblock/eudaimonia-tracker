# Project Structure — Eudaimonia

## What

The folder structure for Eudaimonia follows a **component-based architecture** with **three-tier layering** per component.

## Why

- **Component-based**: Each business domain (philosophers, practices, checkins, streaks) is isolated. Changes to one don't ripple through others.
- **Three-tier layering**: Separates concerns — entry-points (HTTP), domain (business logic), data-access (DB). Makes testing and swapping infrastructure trivial.

## How

```
src/
├── components/           # Business components (autonomous modules)
│   ├── philosophers/    # User/philosopher management
│   ├── practices/       # Habit/practice management
│   ├── checkins/       # Daily check-ins
│   └── streaks/        # Streak calculation
├── layers/              # Three-tier architecture (per component)
│   ├── entry-points/    # Controllers, routes, HTTP handling
│   ├── domain/         # Entities, business logic, ports
│   └── data-access/    # Repositories, DB access, Prisma
└── shared/              # Cross-cutting concerns
    ├── errors/         # Custom error classes
    ├── logger/        # Winston structured logging
    └── middleware/     # Express middleware
```

## Key Decisions

1. **No framework imports in domain layer** — Domain has zero knowledge of Express, Prisma, etc. Pure business logic.
2. **Ports (interfaces) for data access** — Repository interfaces live in domain, implementations in data-access. Swap PostgreSQL for MongoDB = change only the adapter.
3. **Cross-cutting concerns in /shared** — Logger, errors, middleware used everywhere but not tied to any component.

## Related

- [[three-tier-layers]] — Detailed explanation of the three tiers
- [[component-structure]] — More on component-based design
