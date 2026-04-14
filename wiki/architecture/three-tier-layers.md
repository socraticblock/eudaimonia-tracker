# Three-Tier Layers

## What

A layered architecture pattern where each component has three distinct layers:

1. **Entry Points** — HTTP handlers, controllers, routes
2. **Domain** — Business logic, entities, ports (interfaces)
3. **Data Access** — Database operations, repositories

## Why

- **Separation of concerns** — Each layer has a single responsibility
- **Testability** — Domain logic can be tested without HTTP or DB
- **Flexibility** — Swap PostgreSQL for MongoDB by changing only data-access
- **Clarity** — Developers know exactly where to put code

## How

```
component/
├── entry-points/
│   └── PracticeController.ts   # HTTP handling
├── domain/
│   ├── Practice.ts             # Entity
│   ├── PracticeService.ts     # Business logic
│   └── PracticeRepository.ts  # Port (interface)
└── data-access/
    └── PrismaPracticeRepository.ts  # Adapter (implementation)
```

## Key Rules

1. **Domain has NO framework imports** — No Express, no Prisma
2. **Dependencies point inward** — Entry points → Domain → Data access
3. **Ports are in Domain** — Interfaces defined where they're consumed
4. **Adapters are in Data Access** — Implementations of ports

## Related

- [[ports-and-adapters]] — The hexagonal architecture pattern
- [[component-structure]] — Component-based design
- [[repository-pattern]] — The repository abstraction
