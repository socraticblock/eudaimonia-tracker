# TDD Cycle — Red, Green, Refactor

## What

Test-Driven Development follows a strict cycle:

1. **Red** — Write a failing test
2. **Green** — Write minimal code to pass
3. **Refactor** — Clean up code while keeping tests passing

## Why

- Forces clarity about what the code should do BEFORE writing it
- Tests become documentation of intent
- Confidence to refactor — if tests pass, nothing broke
- Catches bugs immediately, not in production

## The Eudaimonia Way

### Step 1: Red
```typescript
// Write the test BEFORE the service exists
describe('PracticeService', () => {
  it('creates a practice when given valid input', async () => {
    const service = new PracticeService(mockRepo);
    const result = await service.createPractice({
      philosopherId: 'phil-1',
      name: 'Morning Meditation',
      frequency: 'DAILY',
    });
    expect(result.name).toBe('Morning Meditation');
  });
});
// Run test — it FAILS because PracticeService doesn't exist yet
```

### Step 2: Green
```typescript
// Write MINIMAL code to pass
export class PracticeService {
  async createPractice(input: any): Promise<any> {
    return { name: input.name }; // Just enough to pass
  }
}
// Run test — it PASSES
```

### Step 3: Refactor
```typescript
// Add validation, proper types, error handling
export class PracticeService {
  constructor(private repo: PracticeRepository) {}
  
  async createPractice(input: CreatePracticeInput): Promise<Practice> {
    if (!input.name?.trim()) {
      throw new ValidationError('Name is required');
    }
    // More complete implementation
  }
}
// Run tests — still passing, but now robust
```

## Rules

1. **Never write implementation before the failing test**
2. **Write only enough code to pass the test**
3. **Refactor AFTER tests pass**
4. **If it's hard to test, the design might be wrong**

## Related

- [[aaa-pattern]] — How to structure tests
- [[per-test-data]] — No shared test fixtures
- [[five-outcomes]] — Test all possible outcomes
