# Deskora Website Design Brief

---

## Brand Overview
**Deskora** is an Indian e-commerce brand offering thoughtfully designed desk essentials and workspace accessories, including desk organisers, laptop and mobile stands, and desk mats and mousepads. The visual identity must establish Deskora as a modern, minimal, trustworthy, and premium brand tailored to Indian students, young working professionals, and remote workers.

---

## 1. Colour Palette

| Role | Colour Name | Hex Code | Primary Usage |
| :--- | :--- | :--- | :--- |
| **Primary** | Deep Forest Green | `#24443B` | Header brand elements, primary buttons, major headings, key brand anchors. |
| **Accent** | Warm Terracotta | `#D98A5B` | Primary call-to-action buttons, active badges, highlights, price callouts. |
| **Dark Text** | Charcoal | `#242B29` | Primary body typography, product names, subheadings, interface labels. |
| **Neutral 1** | Warm Off-White | `#F7F5F0` | Main page background, card surfaces, clean whitespace. |
| **Neutral 2** | Soft Beige-Grey | `#E5E1D8` | Component borders, input outlines, table dividers, card hover boundaries. |

> **Palette Rationale:** This warm organic palette balances focused calmness (deep forest green) with earthy warmth (terracotta and soft stone neutrals), elevating Deskora above generic tech stores while conveying calm, organised productivity.

### Contrast & Application Rules
- **Text Readability:** Dark text (`#242B29`) must be placed over Neutral 1 (`#F7F5F0`) or pure white (`#FFFFFF`) to ensure WCAG AA (minimum 4.5:1) contrast.
- **Selective Accent Use:** Accent Warm Terracotta (`#D98A5B`) is reserved strictly for high-priority user actions (e.g., "Add to Cart", "Checkout") and notification badges to maintain strong visual hierarchy without visual clutter.

---

## 2. Typography

The typographic system utilizes two Google Fonts:
- **Headings:** **Manrope** (Modern, geometric, balanced sans-serif with distinct letterforms).
- **Body & Interface:** **Inter** (Highly legible, neutral workhorse sans-serif optimized for small screens and UI elements).

### Typographic Scale

| Level | Desktop Size / Line Height | Mobile Size / Line Height | Font Family | Font Weight | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **H1** | `40px` / `48px` | `28px` / `36px` | Manrope | Bold (700) | Hero page titles, primary section anchors |
| **H2** | `32px` / `40px` | `24px` / `32px` | Manrope | Semi-Bold (600) | Category headings, featured section headers |
| **H3** | `24px` / `32px` | `20px` / `28px` | Manrope | Semi-Bold (600) | Product card titles, sub-section headings |
| **Body** | `16px` / `24px` | `15px` / `22px` | Inter | Regular (400) | Product descriptions, informative paragraphs |
| **Small UI** | `14px` / `20px` | `13px` / `18px` | Inter | Medium (500) | Navigation links, pricing, button labels, specs |
| **Caption** | `12px` / `16px` | `11px` / `16px` | Inter | Regular (400) / Semi-Bold | Badges, image captions, helper notes |

---

## 3. Spacing Scale

A strict 9-step proportional spacing scale guarantees consistent rhythm across layouts, components, and grids:

| Token | Size | Typical Application |
| :--- | :--- | :--- |
| **Space-1** | `4px` | Micro-spacing: Icon-to-text gaps, badge padding. |
| **Space-2** | `8px` | Compact spacing: Input vertical padding, list item gaps, tag margins. |
| **Space-3** | `12px` | Component spacing: Card internal element margins, badge borders. |
| **Space-4** | `16px` | Standard UI padding: Button padding, input horizontal padding, card padding. |
| **Space-5** | `24px` | Structural component padding: Modal inner padding, product grid column gaps. |
| **Space-6** | `32px` | Section sub-groups: Gap between category filters and product grids. |
| **Space-7** | `48px` | Section margins on mobile, between distinct content blocks. |
| **Space-8** | `64px` | Standard page section vertical padding (Desktop). |
| **Space-9** | `80px` | Hero section vertical padding, major page breaks (Desktop). |

---

## 4. Component Styles

### Buttons
All interactive buttons must feature clear, accessible touch targets (minimum height 44px on mobile) and unambiguous hover/active feedback.

- **Primary Button (High-Conversion Action):**
  - **Background:** Accent Terracotta (`#D98A5B`) or Deep Forest Green (`#24443B`).
  - **Text:** White (`#FFFFFF`), `14px` (Small UI), Font Weight: 600 (Semi-Bold), Inter.
  - **Border Radius:** `8px` (Subtle, modern curve).
  - **Padding:** `12px 24px`.
  - **Hover State:** Background darkens by 8% (e.g., `#C27546` or `#1B332C`) with a subtle `transform: translateY(-1px)`.
  - **Active State:** `transform: translateY(0)`.
- **Secondary / Outline Button:**
  - **Background:** Transparent or Neutral 1 (`#F7F5F0`).
  - **Border:** `1px solid #24443B` (or `#E5E1D8`).
  - **Text:** Deep Forest Green (`#24443B`), `14px`, Font Weight: 500 (Medium).
  - **Hover State:** Background fills with `#E5E1D8` or `#24443B` with white text.

### Product Cards
Product cards must be uniformly aligned in grid layouts regardless of variations in title lengths.

- **Card Container:**
  - **Background:** Solid Pure White (`#FFFFFF`) or Warm Off-White (`#F7F5F0`).
  - **Border:** `1px solid #E5E1D8`.
  - **Border Radius:** `12px`.
  - **Shadow:** Rest state `0 2px 4px rgba(36, 43, 41, 0.04)`.
  - **Hover State:** Subtle lift `translateY(-3px)`, shadow increases to `0 8px 16px rgba(36, 43, 41, 0.08)`, border darkens to `#D0CBBF`.
- **Image Presentation:**
  - **Aspect Ratio:** Fixed `4:3` or `1:1` square container with `object-fit: cover`.
  - **Background:** Neutral studio backdrop (`#F2EFE9`).
  - **Corner Radius:** Top corners clipped to match card (`12px 12px 0 0`).
- **Card Content Layout:**
  - **Padding:** `16px`.
  - **Category/Tag:** `12px` uppercase caption in `#24443B` or `#D98A5B`.
  - **Product Name:** `16px` Manrope Semi-Bold, limited to 2 lines with consistent min-height.
  - **Price:** Clear, prominent Indian Rupee pricing (`₹X,XXX`) in `18px` Bold `#242B29`.
  - **Call to Action:** Compact "View Details" or "Add to Cart" button anchored to the bottom.

### Form Fields
Form inputs must be immediately identifiable, easy to tap on mobile, and display clear validation feedback.

- **Input Shell:**
  - **Background:** Pure White (`#FFFFFF`).
  - **Border:** `1px solid #E5E1D8`.
  - **Border Radius:** `8px`.
  - **Padding:** `12px 16px`.
  - **Typography:** `15px` Inter Regular in `#242B29`.
- **Labels & Placeholders:**
  - **Label:** `13px` Inter Medium in `#242B29`, positioned directly above the input with a `6px` bottom margin.
  - **Placeholder:** Inter Regular in `#8C887B` (clear, readable, non-distracting).
- **Focus & Error States:**
  - **Focus State:** Border changes to Deep Forest Green (`#24443B`) with a `2px` soft outer glow `box-shadow: 0 0 0 3px rgba(36, 68, 59, 0.15)`.
  - **Error State:** Border changes to Crimson `#C53030` with helper text displayed in `12px` red directly below the field.

---

## 5. Mobile-First Responsive Breakpoints

All layouts must be authored mobile-first with progressive enhancement across standard viewport tiers:

```
[ Mobile: < 480px ] ➔ [ Tablet: 768px ] ➔ [ Small Desktop: 1024px ] ➔ [ Large Desktop: 1280px+ ]
```

### 1. Mobile (`< 480px` – Base Styles)
- **Navigation:** Compact sticky header with brand wordmark, quick-access cart icon with counter, and a clean slide-out navigation drawer.
- **Product Grids:** Single column (or tight 2-column with reduced padding for small cards).
- **Spacing:** Reduced section padding (`Space-7: 48px`), page gutter `16px`.
- **Typography:** H1 capped at `28px`, H2 at `24px`, body text at `15px`.
- **Buttons:** Full-width buttons for checkout and cart actions to facilitate one-thumb interaction.

### 2. Tablet (`768px`)
- **Navigation:** Horizontal category pills or expandable navigation menu; search bar prominently displayed.
- **Product Grids:** Structured 2-column or 3-column product grid with `24px` gutters.
- **Spacing:** Section padding increases to `Space-8: 64px`, page gutter `24px`.
- **Typography:** H1 scales to `34px`, H2 to `28px`.
- **Buttons:** Natural auto-width buttons with standard `24px` horizontal padding.

### 3. Small Desktop (`1024px`)
- **Navigation:** Full horizontal desktop navbar with direct links to all six primary pages, search bar, and cart drawer trigger.
- **Product Grids:** 3-column or 4-column product grid.
- **Layout:** Two-column split layouts for product details (gallery on left, product specs and purchase actions on right).
- **Spacing:** Page gutters expand to `32px`.

### 4. Large Desktop (`1280px` and above)
- **Container Max-Width:** Constrained to `1200px` or `1280px` centered with auto margins to preserve optical line-length readability.
- **Product Grids:** Generous 4-column layout with `24px`–`32px` grid gaps.
- **Typography:** Full desktop typographic scale (H1: `40px`, H2: `32px`).
- **Spacing:** Generous vertical whitespace (`Space-9: 80px`) between primary sections.

---

## 6. Overall Design Direction & Standards

1. **Consistent Visual Identity Across All Six Pages:**
   - Every page (Home, Shop, Desk Organisers, Laptop & Mobile Stands, Desk Mats & Mousepads, About Deskora) must share the identical header, footer, color tokens, and card styling.
   - Header must provide transparent access to all main categories and cart status.
2. **Product Photography & Image Consistency:**
   - Maintain uniform lighting, neutral desk backgrounds, and consistent aspect ratios across all product imagery.
   - Showcase products in clean workspace contexts (minimalist wooden desks, laptops, and notebooks) to help customers visualize scale and aesthetic fit.
3. **Friction-Free Shopping Journeys:**
   - Minimize steps between discovering a product and reviewing it in the cart.
   - Pricing must always be visible in Indian Rupees (`₹`), with transparent specifications (dimensions, materials, weight capacity) clearly formatted in tables or bullet points.
4. **Accessibility & Readability:**
   - Ensure all text passes WCAG 2.1 AA color contrast standards.
   - Use semantic HTML tags (`<nav>`, `<main>`, `<article>`, `<button>`) and meaningful image `alt` attributes.
   - Form inputs must have persistent visual labels, not just placeholders.
5. **Restraint & Anti-Patterns:**
   - Avoid aggressive countdown timers, flashing promotional banners, intrusive spin wheels, or unprompted pop-ups.
   - Avoid excessive animations; transitions should be limited to smooth, subtle `0.2s` opacity and transform shifts on hover.
