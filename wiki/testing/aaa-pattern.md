# AAA Pattern — Arrange, Act, Assert

## What

A standard structure for writing clear, readable tests:

1. **Arrange** — Set up test data, mocks, and preconditions
2. **Act** — Execute the function being tested
3. **Assert** — Verify the results match expectations

## Why

- Tests are self-documenting
- Clear separation of setup vs. action vs. verification
- Easier to debug — know exactly what failed

## How in Eudaimonia

```typescript
it('creates a practice when given valid input', async () => {
  // ---- Arrange ----
  const input = {
    philosopherId: 'phil-1',
    name: 'Morning Meditation',
    frequency: 'DAILY' as const,
  };

  mockRepository.findByPhilosopherAndName.mockResolvedValue(null);
  mockRepository.save.mockImplementation(async (practice) => practice);

  // ---- Act ----
  const result = await service.createPractice(input);

  // ---- Assert ----
  expect(result.name).toBe('Morning Meditation');
  expect(result.frequency).toBe('DAILY');
  expect(result.isActive).toBe(true);
  expect(mockRepository.save).toHaveBeenCalledTimes(1);
});
```

## Key Points

- Keep sections clearly separated
- One action per test (don't test multiple things)
- Assertions should be specific and descriptive
- Use descriptive test names: "should_return_404_when_philosopher_not_found"

## Related

- [[tdd-cycle]] — The TDD cycle
- [[per-test-data]] — No shared fixtures
- [[five-outcomes]] — Test all outcomes
