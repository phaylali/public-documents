# Omniversify File Explorer

A premium, OLED-optimized file explorer built with **Hono** and **Bun**.


## Features
- **OLED Dark Mode**: Pure black background with Gold accents (#C2B067).
- **File Exploration**: Browse files in the `/files` directory.
- **PDF Viewer**: Built-in preview with print and download support.
- **Image Viewer**: High-contrast preview for all common image formats.
- **Text Viewer**: Code-highlighted (escaped) preview for text and source files.
- **Fallback Support**: Clean download interface for unsupported formats.
- **Reusable UI Library**: Decoupled design system for use in other projects.

## Tech Stack
- **Bun**: Runtime & Build Tool
- **Hono**: Web Framework
- **Cinzel & Source Sans 3**: Premium Typography

## Project Structure
```
├── index.ts              # Main application (business logic)
├── ui/
│   └── omniversify.ts    # Reusable UI library (design system)
└── files/                # Files to be displayed
```

## Getting Started

1.  **Install dependencies**:
    ```bash
    bun install
    ```

2.  **Add files**:
    Place your files in the `/files` directory.

3.  **Run the server**:
    ```bash
    bun run index.ts
    ```
    The website will be available at `http://localhost:3000`.

## Using the UI Library

The `ui/omniversify.ts` library can be reused in other Hono/Bun applications:

```typescript
import { createLayout, createButton, OmniversifyTheme } from './ui/omniversify';

// Use the design tokens
const myColor = OmniversifyTheme.colors.gold;

// Create UI components
const myButton = createButton({ text: 'Click Me', href: '/action' });
const myPage = createLayout({ title: 'My App', content: myButton });
```

## Design Guidelines
This project follows the **Omniversify Design System** & **Style Guide**.
- **Heading Font**: Cinzel
- **Body Font**: Source Sans 3
- **Primary Color**: Gold (#C2B067)
- **Background**: OLED Black (#000000)
