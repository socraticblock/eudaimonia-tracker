# React 19 + Vite Setup

## What

Modern React frontend scaffold with:
- React 19 with TypeScript
- Vite 6 as build tool
- Tailwind CSS v4 for styling
- React Router v7 for routing
- Framer Motion for animations

## Why Vite

- **Fast HMR** — Hot Module Replacement in <100ms
- **ESBuild** — TypeScript compilation is 20-30x faster than tsc
- **Simple config** — No webpack complexity
- **Native ESM** — Direct browser module loading in dev

## Key Learnings

### 1. Tailwind CSS v4 Changes

Tailwind v4 uses a new `@tailwindcss/vite` plugin instead of PostCSS:
```typescript
// vite.config.ts
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

CSS uses `@theme` directive instead of `tailwind.config.js`:
```css
@theme {
  --color-greek-red: #8B2500;
  --font-heading: 'Cinzel', serif;
}
```

### 2. React Router v7

React Router v7 introduced file-based routing and loaders/actions:
```typescript
// Use createBrowserRouter instead of Routes
const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  {
    path: '/stoa',
    element: <AppShell />,
    children: [
      { path: 'practices', element: <PracticesPage /> },
    ],
  },
]);
```

### 3. Framer Motion Variants

Framer Motion variants need `as const` for TypeScript to infer literal types:
```typescript
const variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { type: 'spring' as const, damping: 25 } 
  },
};
```

Without `as const`, TypeScript infers `type: string` instead of `type: 'spring'`, causing type errors.

### 4. Path Aliases

Configure in both `tsconfig.app.json` and `vite.config.ts`:
```json
// tsconfig.app.json
{
  "compilerOptions": {
    "paths": { "@/*": ["./src/*"] },
    "ignoreDeprecations": "6.0"
  }
}
```
Note: `baseUrl` is deprecated in TypeScript 6, but still works. Must add `ignoreDeprecations: "6.0"`.

### 5. React 19 Changes

- `useState` and other hooks work as before
- No significant breaking changes for our use case
- ForwardRef still works but may be deprecated in future

## Common Errors

### "Property 'visible' is incompatible with index signature"
Cause: Framer Motion variant type inference. Fix with `as const` on literal values.

### "Option 'baseUrl' is deprecated"
Cause: TypeScript 6 deprecated `baseUrl`. Fix by adding `"ignoreDeprecations": "6.0"`.

### "'test' does not exist in type 'UserConfigExport'"
Cause: Added `test` config directly in vite.config.ts. Test config belongs in vitest.config.ts.

## Related

- [[tailwind-v4-design-system]] — Design system setup
- [[framer-motion-animations]] — Animation patterns
- [[component-composition]] — React component patterns
