# Ports and Adapters (Hexagonal Architecture)

## What

Hexagonal Architecture (aka Ports and Adapters) isolates business logic from infrastructure concerns.

**Ports** = Interfaces (abstractions the domain defines)
**Adapters** = Implementations (code that talks to the outside world)

## Why

- Business logic becomes **framework-agnostic**
- Easy to test with in-memory adapters
- Can swap databases, HTTP clients, etc. without touching domain
- Core business rules are protected from external changes

## How in Eudaimonia

```typescript
// Port — defined in domain layer
interface PracticeRepository {
  findById(id: string): Promise<Practice | null>;
  save(practice: Practice): Promise<Practice>;
  // ...
}

// Adapter — implemented in data-access layer
class PrismaPracticeRepository implements PracticeRepository {
  constructor(private prisma: PrismaClient) {}
  
  async findById(id: string): Promise<Practice | null> {
    return this.prisma.practice.findUnique({ where: { id } });
  }
  
  // ...
}

// Adapter — in-memory for testing
class InMemoryPracticeRepository implements PracticeRepository {
  private practices = new Map<string, Practice>();
  
  async findById(id: string): Promise<Practice | null> {
    return this.practices.get(id) ?? null;
  }
  
  // ...
}
```

## Key Insight

The PracticeService doesn't know about Prisma. It only knows it receives a PracticeRepository. This is **dependency injection** — the adapter is injected, not imported.

## Related

- [[three-tier-layers]] — How this fits in the overall architecture
- [[repository-pattern]] — The repository abstraction
- [[dependency-injection]] — How we inject dependencies
