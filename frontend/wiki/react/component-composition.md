# Component Composition Patterns

## What

Patterns for building reusable React components with TypeScript and Tailwind CSS.

## Forward Ref Pattern

When a component needs to expose a DOM ref (for focus management, animations):

```typescript
interface GreekButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  isLoading?: boolean;
}

export const GreekButton = forwardRef<HTMLButtonElement, GreekButtonProps>(
  ({ variant = 'primary', isLoading, children, className, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn('rounded-lg font-heading', className)}
        {...props}
      >
        {isLoading ? <Spinner /> : children}
      </button>
    );
  }
);

GreekButton.displayName = 'GreekButton';
```

Key: Always set `displayName` for better debugging.

## Compound Components Pattern

When a component has multiple sub-components that need shared state:

```typescript
// GreekCard.tsx
export function GreekCard({ children, className }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('rounded-xl bg-marble', className)}>{children}</div>;
}

GreekCard.Header = function GreekCardHeader({ title, subtitle }: HeaderProps) {
  return (
    <div>
      <h3>{title}</h3>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
};

GreekCard.Footer = function GreekCardFooter({ children }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('border-t', className)}>{children}</div>;
};
```

Usage:
```tsx
<GreekCard>
  <GreekCard.Header title="Practice Name" subtitle="Daily discipline" />
  <p>Content here</p>
  <GreekCard.Footer>
    <GreekButton>Complete</GreekButton>
  </GreekCard.Footer>
</GreekCard>
```

## Controlled vs Uncontrolled Components

### Controlled
```typescript
function GreekInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return <input value={value} onChange={(e) => onChange(e.target.value)} />;
}
```

### Uncontrolled
```typescript
function GreekInput({ name }: { name: string }) {
  return <input name={name} />;
}
```

## Optional Props with Defaults

Use default parameter values or destructuring defaults:
```typescript
interface GreekCardProps {
  variant?: 'default' | 'elevated' | 'outlined';  // Optional with default
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function GreekCard({ variant = 'default', padding = 'md', children, className }: GreekCardProps) {
  return <div className={cn(variantStyles[variant], paddingStyles[padding], className)}>{children}</div>;
}
```

## TypeScript Patterns

### Extending HTML Elements
```typescript
// Extend native HTML attributes
interface GreekInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}
```

### Generic Components
```typescript
interface SelectOption<T extends string> {
  value: T;
  label: string;
}

function GreekSelect<T extends string>({
  options,
  value,
  onChange
}: {
  options: SelectOption<T>[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (/* ... */);
}
```

### Null-Safe Access with Optional Chaining
```typescript
// Instead of
{user && user.profile && user.profile.name}

// Use
{user?.profile?.name}
```

## Barrel Exports

Create an index.ts that re-exports everything:
```typescript
// components/ui/index.ts
export { GreekButton } from './GreekButton';
export { GreekInput } from './GreekInput';
export { GreekCard, GreekCardHeader, GreekCardFooter } from './GreekCard';
```

Now consumers can import from one place:
```typescript
import { GreekButton, GreekCard } from '@/components/ui';
```

## Related

- [[react-19-vite-setup]] — Project setup
- [[tailwind-v4-design-system]] — Styling patterns
- [[typescript-patterns]] — TypeScript patterns
