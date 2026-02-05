# Omniversify Design System & Style Guide

This document defines the visual language and design tokens for Omniversify brand, following the **Omniversify** UI philosophy. It is designed to be framework-agnostic and can be implemented in web (CSS), mobile (Flutter, Jetpack Compose), or any other environment.

---

## 🎨 Color Palette

### Primary Colors
- **Gold**: `#C2B067`
    - Use for: Headings, borders, primary actions, highlights.
- **Pure Black**: `#000000` (OLED compatible)
    - Use for: Backgrounds in "Space Mode".
- **Pure White**: `#FFFFFF`
    - Use for: Main body text on dark backgrounds.

#### 🌌 Space Mode (OLED)
The default and only theme, designed for maximum contrast and battery saving on OLED screens.
- **Background**: `#000000`
- **Surface**: `#000000`
- **Primary Text (Heading)**: Gold (`#C2B067`)
- **Secondary Text (Body)**: White (`#FFFFFF`)
- **Muted Text**: Gold at 70% opacity (`#C2B067B3`)

### Gradients
- **Gold Fade Gradient**:
    - **Direction**: Left to Right
    - **Colors**: Transparent → Gold (`#C2B067`) → Gold (`#C2B067`) → Transparent
    - **Stops**: 0%, 5%, 20%, 80%, 95%, 100%

---

## 🏛 Typography

### Headings
- **Font Family**: `Cinzel` (Serif, Decorative)
- **Styles**:
    - **Large Heading**: 32px | Bold | Gold (`#C2B067`)
    - **Medium Heading**: 24px | Bold | Gold (`#C2B067`)
    - **Small Heading (AppBar)**: 20px | Bold | Gold (`#C2B067`) | Letter Spacing: 1.2px

### Body Text
- **Font Family**: `Source Sans 3` (Sans-Serif)
- **Styles**:
    - **Body Large**: 16px | White (`#FFFFFF`)
    - **Body Medium**: 14px | White at 70% opacity (`#FFFFFFB3`)
    - **Body Small**: 12px | Gold at 70% opacity (`#C2B067B3`)

---

## 🧱 Component Specifications

### Cards & Surfaces
- **Border Radius**: 8px
- **Border Width**: 1.0px
- **Border Color**: Gold (`#C2B067`)
- **Elevation**: 0 (Flat design)
- **Margins**: 16px horizontal, 8px vertical

### Input Fields
- **Background**: Surface Color (based on theme)
- **Border Radius**: 8px
- **Inactive Border**: Gold (`#C2B067`) | Width: 0.5px
- **Active/Focused Border**: Gold (`#C2B067`) | Width: 1.0px
- **Label Color**: Gold (`#C2B067`)
- **Hint Color**: White at 15% opacity (`#FFFFFF26`)

### Dialogs & Modals
- **Background**: Surface Color (based on theme)
- **Border Radius**: 12px
- **Border**: Gold (`#C2B067`) | Width: 1.0px
- **Title**: Cinzel | 20px | Bold | Gold (`#C2B067`)
- **Content**: Source Sans 3 | 14px | White (70%)

---

## 📐 Spacing & Layout
- **Container Max Width**: Recommended 3xl (approx 768px) to 5xl (approx 1024px) for readability.
- **Horizontal Padding**: 16px to 24px on mobile, increasing on desktop.
