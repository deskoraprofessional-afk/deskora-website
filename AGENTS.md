# AGENTS.md

This document defines the core specification, brand identity, target audience, technical constraints, design standards, and working rules for the **Deskora** e-commerce workspace. All future tasks and agents operating in this workspace must strictly follow these instructions.

---

## 1. Project Overview

Deskora is an online retail brand specialising in desk essentials and workspace accessories. The brand aims to help students and working professionals create organised, functional, and aesthetically pleasing workspaces.

- **Brand Name:** Deskora
- **Brand Tagline:** "Upgrade Your Workspace."
- **Product Range:**
  - Desk organisers
  - Laptop stands
  - Mobile & tablet stands
  - Desk mats & mousepads
  - Cable organisers
  - Stationery holders
  - Curated workspace setup kits
- **Brand Presentation:** The website must present Deskora as a premium, modern, and trustworthy Indian e-commerce brand.

---

## 2. Target Audience

The primary audience includes:
- College and university students, including MBA students.
- Young working professionals.
- Remote and work-from-home employees.
- Freelancers and content creators.
- Individuals interested in productivity, desk organisation, and aesthetic workspace setups.

**Target Market:** Customers across India seeking practical, attractive, and affordable workspace accessories.

**Customer Experience Expectation:** Customers must be able to discover products seamlessly, understand their features and dimensions, compare prices, and make informed purchase decisions.

---

## 3. Primary Goal

The primary conversion goal of the website is to generate completed product purchases.

Every page should guide visitors towards exploring products and making a purchase through clear, prominent calls to action (CTAs).

The website must support a smooth, reliable shopping experience, including:
- Product browsing and category navigation.
- Individual product details, high-quality images, specifications, and pricing.
- Add-to-cart functionality with real-time feedback.
- Cart review, item removal, and quantity updates.
- A clear, transparent, and functional checkout process.
- Order confirmation and relevant customer information.
- **Integrity Rule:** Do not create fake payment confirmations or pretend that an order has been placed. Any payment and order functionality must be implemented genuinely or clearly identified as awaiting payment gateway integration.

---

## 4. Technology Rules

- **Stack:** Plain HTML, CSS, and JavaScript only.
- **Zero Frameworks:** No React, Vue, Angular, or any front-end frameworks.
- **Zero Build Tools:** No npm/Node build steps, bundlers, transpilations, or task runners.
- **Zero External UI Libraries:** No Bootstrap, Tailwind, jQuery, or component libraries.
- **Single Shared Stylesheet:** Maintain exactly one shared `style.css` across the site.
- **Single Shared Script:** Maintain exactly one shared `script.js` across the site.
- **Mobile-First Responsive CSS:** Write base CSS for mobile viewports first, using progressive enhancement and media queries for tablets and desktops.
- **Semantic HTML5:** Use clean, standard semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`, `<figure>`, `<form>`, `<label>`, `<input>`, `<button>`).
- **Code Quality:** Keep the code clean, organised, modular, reusable, and easy to maintain.
- **Compatibility:** Ensure full compatibility across modern desktop and mobile browsers.

---

## 5. Design and User Experience

- **Aesthetic:** Create a premium, modern, and professional e-commerce design.
- **Brand Consistency:** Maintain a consistent brand identity, typography, colour palette, and proportional spacing throughout.
- **Imagery:** Use high-quality, relevant product and desk setup photography.
- **Layout & Navigation:** Maintain a clean layout with intuitive, friction-free navigation.
- **Product Cards:** Make product cards visually engaging, featuring clear pricing, badges, ratings, and essential product details.
- **Responsiveness:** Ensure that all pages, drawers, modals, and elements are responsive and easy to navigate on both touchscreens and pointer devices.
- **Anti-Pattern Guard:** Avoid generic templates and basic student-project styling.
- **Conversion Focus:** Prioritise usability, trust signals, and conversion at every touchpoint.

---

## 6. Working Rules

1. **Build one page or feature at a time:** Maintain focus on the single approved task before proceeding.
2. **Never create files that were not requested:** Only create files explicitly requested or strictly necessary for the approved task.
3. **Explain proposed structural changes:** Before making major structural modifications, explain the proposal to the user first.
4. **Preserve existing work:** Do not remove or overwrite existing work without checking first.
5. **Ensure functional completeness:** Ensure navigation links, buttons, product interactions, and forms actually work.
6. **No placeholder deception:** Do not use placeholder functionality while presenting it as a completed feature.
7. **Explain changes after each task:** Provide a clear, concise summary of all changes, additions, or modifications upon task completion.
8. **Ask before writing when needed:** Ask any necessary clarifying questions before writing or modifying files if requirements are ambiguous.
9. **Consistency:** Follow the existing project structure and these instructions for all future tasks.
