# Five Outcomes — Test Everything

## What

For every feature, test these 5 outcomes:

1. **Happy Path** — Normal, successful execution
2. **Invalid Input** — Null, empty, malformed data
3. **Unauthorized Access** — Missing/invalid authentication
4. **Permission Error** — Authenticated but not allowed
5. **Edge Cases** — Boundary conditions, concurrent access

## Why

Comprehensive coverage prevents bugs from slipping through.

## Example: createPractice

### 1. Happy Path
```typescript
it('creates a practice when given valid input', async () => {
  // Valid input, everything works
});
```

### 2. Invalid Input
```typescript
it('throws ValidationError when name is empty', async () => {
  const input = { philosopherId: 'phil-1', name: '', frequency: 'DAILY' };
  await expect(service.createPractice(input)).rejects.toThrow(ValidationError);
});

it('throws ValidationError when frequency is invalid', async () => {
  const input = { philosopherId: 'phil-1', name: 'Test', frequency: 'INVALID' };
  await expect(service.createPractice(input)).rejects.toThrow(ValidationError);
});
```

### 3. Unauthorized Access
```typescript
it('throws UnauthorizedError when philosopherId is missing', async () => {
  const input = { philosopherId: '', name: 'Test', frequency: 'DAILY' };
  await expect(service.createPractice(input)).rejects.toThrow(UnauthorizedError);
});
```

### 4. Permission Error (Conflict)
```typescript
it('throws ConflictError when practice name already exists', async () => {
  mockRepo.findByPhilosopherAndName.mockResolvedValue(existingPractice);
  const input = { philosopherId: 'phil-1', name: 'Meditation', frequency: 'DAILY' };
  await expect(service.createPractice(input)).rejects.toThrow(ConflictError);
});
```

### 5. Edge Cases
```typescript
it('trims whitespace from name', async () => {
  const input = { philosopherId: 'phil-1', name: '  Meditation  ', frequency: 'DAILY' };
  const result = await service.createPractice(input);
  expect(result.name).toBe('Meditation'); // Trimmed
});

it('allows Greek characters in name', async () => {
  const input = { philosopherId: 'phil-1', name: 'Πρωινὸς διαλογισμός', frequency: 'DAILY' };
  const result = await service.createPractice(input);
  expect(result.name).toBe('Πρωινὸς διαλογισμός');
});
```

## Checklist

For each function, ask:
- [ ] What happens with valid input?
- [ ] What happens with null/undefined?
- [ ] What happens with empty strings?
- [ ] What happens with invalid enums/values?
- [ ] What happens with unauthorized requests?
- [ ] What happens with permission denied?
- [ ] What happens at boundaries (0, -1, MAX_INT)?
- [ ] What happens with concurrent access?

## Related

- [[tdd-cycle]] — TDD cycle
- [[aaa-pattern]] — AAA pattern
- [[per-test-data]] — Per-test data
