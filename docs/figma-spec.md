# NovaTech Design Specifications

Design documentation for the NovaTech Solutions website.

## Brand Colors

### Primary (Blue)
| Token | Hex | Usage |
|-------|-----|-------|
| primary-600 | `#2563eb` | Main brand color, CTAs |
| primary-700 | `#1d4ed8` | Hover states |
| primary-800 | `#1e40af` | Dark accents |

### Secondary (Slate)
| Token | Hex | Usage |
|-------|-----|-------|
| secondary-50 | `#f8fafc` | Page background |
| secondary-600 | `#475569` | Body text |
| secondary-800 | `#1e293b` | Headings |
| secondary-900 | `#0f172a` | Footer background |

### Semantic
| Token | Hex | Usage |
|-------|-----|-------|
| success-500 | `#22c55e` | Success states |
| warning-500 | `#f59e0b` | Warning states |
| error-500 | `#ef4444` | Error states |

## Typography

### Font Stack
```css
font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

### Scale
| Name | Size | Usage |
|------|------|-------|
| xs | 12px | Labels, captions |
| sm | 14px | Secondary text |
| base | 16px | Body text |
| lg | 18px | Lead paragraphs |
| xl | 20px | H4, card titles |
| 2xl | 24px | H3 |
| 3xl | 30px | H2 |
| 4xl | 36px | H1 |
| 5xl | 48px | Hero titles |

## Spacing

Based on 4px grid:

| Token | Value |
|-------|-------|
| spacing-1 | 4px |
| spacing-2 | 8px |
| spacing-3 | 12px |
| spacing-4 | 16px |
| spacing-6 | 24px |
| spacing-8 | 32px |
| spacing-12 | 48px |
| spacing-16 | 64px |

## Components

### Buttons
- Primary: Blue background, white text
- Secondary: Transparent, blue border
- Padding: 12px 24px (default), 16px 32px (large)
- Border radius: 6px

### Cards
- Background: White
- Shadow: `0 4px 6px -1px rgb(0 0 0 / 0.1)`
- Border radius: 8px
- Padding: 24px

### Forms
- Input padding: 12px 16px
- Border: 1px solid #cbd5e1
- Focus ring: 3px blue outline
- Error state: Red border

## Layout

### Container
- Max width: 1200px
- Padding: 16px (mobile), 24px (desktop)

### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## Figma Links

> Placeholder references for course demo

- Design System: `figma.com/file/novatech-design-system`
- Homepage: `figma.com/file/novatech-homepage`
- Components: `figma.com/file/novatech-components`
