# Accessible Recipe View

A small React + TypeScript recipe view built around the review requirements:

- Keyboard operable from start to finish.
- Visual focus is clearly visible on every interactive element.
- No horizontal scrolling at a 320px viewport.
- Serving changes are announced to assistive technology.
- Ingredients and method remain usable on narrow screens.

## Run locally

Requirements: Node.js 18+.

```bash
npm install
npm run dev
```

For a production build:

```bash
npm run build
npm run preview
```

## Accessibility decisions

### Keyboard and focus

The serving controls are native `<button>` and `<input>` elements, so they are naturally keyboard operable. Their DOM order matches their visual order: decrease, serving input, increase, followed by the recipe content.

All interactive controls use `:focus-visible` with a high-contrast outline. A skip link is available as the first focusable element so keyboard users can jump directly to the recipe content.

No custom clickable `<div>` elements are used.

### Quantity announcements

The calculated ingredient values are rendered as normal text, but changing visible text alone is not enough for a reliable screen-reader experience.

The app therefore includes a visually hidden live region:

```html
<div role="status" aria-live="polite" aria-atomic="true">
  Ingredients updated for 6 servings.
</div>
```

Whenever the serving count changes, React updates this live region. Assistive technology can consequently announce the change instead of silently presenting a different number.

The serving `<input>` is also a real number input with a programmatic label and instructions.

### 320px / narrow-screen layout

The desktop layout uses two columns: Ingredients on the left and Method on the right.

At widths below 700px, the two sections become **two independently scrollable panels**, each taking approximately 45vh. They remain in the same visual and DOM order, with Ingredients first and Method second.

This was chosen specifically for the narrow-screen requirement. Instead of making the user scroll through a long Ingredients section before reaching Method, the sections each have their own vertical scroll area. The user can read the complete ingredient list and the complete method without repeatedly scrolling the entire page back and forth.

The panels use `min-width: 0`, `overflow-y: auto`, and no fixed content width. At 320px the content wraps rather than creating horizontal overflow.

### Reduced motion

The interface does not rely on animation or motion, so there is no interaction that depends on motion sensitivity or animation timing.

### Semantic structure

The page uses:

- `<main>` and `<article>` landmarks
- Heading hierarchy
- `<section>` elements with labelled headings
- `<ul>` for ingredients
- `<ol>` for method steps
- Native form controls
- A live status region for dynamic updates

These choices give screen readers meaningful structure without requiring ARIA to recreate native HTML behavior.
