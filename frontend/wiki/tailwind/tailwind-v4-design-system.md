# Tailwind CSS v4 — Greek Design System

## What

Custom Tailwind CSS v4 configuration with Greek/ancient theme for Eudaimonia.

## Theme Configuration

### Using @theme Directive

Tailwind v4 uses CSS-first configuration with `@theme`:
```css
@theme {
  /* ---- Colors ---- */
  --color-parchment: #F5F0E8;
  --color-greek-red: #8B2500;
  --color-gold: #B8860B;
  
  /* ---- Typography ---- */
  --font-heading: 'Cinzel', 'Times New Roman', serif;
  --font-body: 'Cormorant Garamond', Georgia, serif;
}
```

### Greek Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| parchment | #F5F0E8 | Main background |
| greek-red | #8B2500 | Primary accent (buttons, links) |
| gold | #B8860B | Streaks, fire, highlights |
| marble | #F0EDE8 | Card backgrounds |
| ink | #2C2416 | Primary text |
| stone | #9B8B7A | Secondary text, muted |

### Google Fonts Integration

```html
<!-- In index.html -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
```

### Key Learnings

#### 1. @theme vs tailwind.config.js

In v4, configuration is in CSS, not JS:
```css
/* v3 - tailwind.config.js */
module.exports = {
  theme: { extend: { colors: { greek-red: '#8B2500' } } }
}

/* v4 - globals.css */
@theme {
  --color-greek-red: #8B2500;
}
```

#### 2. Arbitrary Values

Use square brackets for arbitrary values:
```html
<!-- Instead of custom class -->
<div class="bg-[#8B2500]">

<!-- Or define in @theme -->
<span class="bg-greek-red">
```

#### 3. Extending the Theme

Add new values to existing categories:
```css
@theme {
  --color-greek-red: #8B2500;
  --color-greek-red-dark: #5C1800;
  --color-greek-red-light: #A83200;
}
```

#### 4. Custom Utilities

Create custom utilities with `@apply`:
```css
.meander-border {
  background-image: repeating-linear-gradient(
    90deg,
    var(--color-gold) 0px,
    var(--color-gold) 8px,
    transparent 8px,
    transparent 16px
  );
  background-size: 16px 2px;
  background-repeat: repeat-x;
  background-position: bottom;
  padding-bottom: 0.5rem;
}
```

## Greek Design Patterns

### 1. Greek Key (Meander) Border
```css
.meander-border {
  background-image: repeating-linear-gradient(90deg, var(--color-gold) 0px, var(--color-gold) 8px, transparent 8px, transparent 16px);
  background-size: 16px 2px;
  background-repeat: repeat-x;
}
```

### 2. Marble Effect
```css
.marble-effect {
  background: linear-gradient(135deg, var(--color-marble) 0%, var(--color-cream) 50%, var(--color-marble) 100%);
}
```

### 3. Olympic Flame Animation
```css
@keyframes flame-flicker {
  0%, 100% { opacity: 1; transform: scaleY(1); }
  50% { opacity: 0.9; transform: scaleY(1.05); }
}

.flame-animation {
  animation: flame-flicker 2s ease-in-out infinite;
}
```

## Related

- [[react-19-vite-setup]] — Project setup
- [[component-composition]] — Building components with Tailwind
- [[design-system-principles]] — Design system principles
