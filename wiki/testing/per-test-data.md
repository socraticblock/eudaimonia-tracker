# Per-Test Data — No Shared Fixtures

## What

Each test sets up its own data. No shared `beforeAll` fixtures that persist state between tests.

## Why

- **No test interdependency** — One test can't affect another
- **No flaky tests** — Shared state causes race conditions
- **Clear intent** — Each test is self-contained
- **Parallel execution** — Tests can run in any order

## Anti-Pattern (Don't Do This)

```typescript
describe('PracticeService', () => {
  let service: PracticeService;
  let mockRepo: jest.Mocked<PracticeRepository>;

  // BAD: Shared across ALL tests
  beforeAll(() => {
    mockRepo = createMockRepo();
    service = new PracticeService(mockRepo);
    mockRepo.findById.mockResolvedValue({ id: 'p-1', ... });
  });

  it('returns a practice', () => {
    // Uses shared mock — could be affected by other tests
  });
});
```

## Eudaimonia Pattern (Do This)

```typescript
describe('PracticeService', () => {
  let service: PracticeService;
  let mockRepo: jest.Mocked<PracticeRepository>;

  // GOOD: Fresh for EACH test
  beforeEach(() => {
    mockRepo = {
      findById: vi.fn(),
      findByPhilosopher: vi.fn(),
      // ... all methods recreated fresh
    };
    service = new PracticeService(mockRepo);
  });

  it('returns a practice when found', () => {
    // Arrange — local to THIS test
    const practice = { id: 'p-1', name: 'Meditation', ... };
    mockRepo.findById.mockResolvedValue(practice);

    // Act
    const result = service.getPracticeById('p-1');

    // Assert
    expect(result).toEqual(practice);
  });

  it('throws NotFoundError when not found', () => {
    // Arrange — different data for THIS test
    mockRepo.findById.mockResolvedValue(null);

    // Act & Assert
    expect(service.getPracticeById('nonexistent')).rejects.toThrow(NotFoundError);
  });
});
```

## For In-Memory Repository

```typescript
describe('InMemoryPracticeRepository', () => {
  let repo: InMemoryPracticeRepository;

  beforeEach(() => {
    repo = new InMemoryPracticeRepository(); // Fresh instance
  });

  afterEach(() => {
    repo.clear(); // Clean up after each test
  });

  it('saves and retrieves a practice', async () => {
    const practice = { id: 'p-1', name: 'Test', ... };
    await repo.save(practice);
    const result = await repo.findById('p-1');
    expect(result).toEqual(practice);
  });
});
```

## Related

- [[tdd-cycle]] — TDD cycle
- [[aaa-pattern]] — AAA pattern
- [[five-outcomes]] — 5 outcomes to test
