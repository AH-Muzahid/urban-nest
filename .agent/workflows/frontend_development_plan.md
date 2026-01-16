---
description: Frontend development workflow plan for Urban Nest 
---

# Urban Nest Frontend Development Workflow

This workflow outlines the systematic approach to completing the frontend of the Urban Nest application.

## Phase 1: Foundation & Core Components (Current Status: Mostly Complete)
- [x] Setup Next.js 16 with Tailwind CSS 4
- [x] Configure Design System (Colors, Typography, Shadows)
- [x] specific basic components (Buttons, Inputs, Cards)
- [ ] **Action**: Audit `src/components/ui` for any missing base primitives needed for complex forms (e.g., DatePicker, FileUpload, Select with Search).

## Phase 2: Main Public Pages (Priority: High)
- [x] Homepage (Hero, Featured, Categories, Testimonials)
- [ ] **Property Listing Page (`/properties`)**:
    - [ ] Create robust filter sidebar (Price range, Type, Location, Amenities).
    - [ ] Implement grid/list view toggle.
    - [ ] Add pagination or infinite scroll.
- [ ] **Property Details Page (`/properties/[id]`)**:
    - [ ] Image Gallery (Grid + Lightbox).
    - [ ] Property Info (Bed/Bath/Sqft, Description).
    - [ ] Agent Contact Form (Sidebar).
    - [ ] Similar Properties section.
    - [ ] Map view integration (e.g., Leaflet or Google Maps placeholder).

## Phase 3: Authentication & User Dashboard (Priority: High)
- [ ] **Authentication Pages**:
    - [ ] Login Page (with "Remember Me", Social Auth buttons).
    - [ ] Register Page (Role selection: Buyer/Seller/Agent).
    - [ ] Forgot Password flow.
- [ ] **Dashboard Layout**:
    - [ ] Sidebar navigation (Responsive).
    - [ ] Top bar (User profile, Notifications).
- [ ] **Dashboard Widgets**:
    - [ ] "My Properties" list (CRUD operations UI).
    - [ ] "Saved Homes" / Favorites.
    - [ ] Messages/Inquiries list.
    - [ ] Profile Settings (Edit Info, Change Password).

## Phase 4: Advanced Features (Priority: Medium)
- [ ] **Interactive Map**: Map-based search on the Listings page.
- [ ] **Comparison Tool**: Select up to 3 properties to compare side-by-side.
- [ ] **Virtual Tour**: Embed 3D viewer (e.g., Matterport iframe) support.

## Phase 5: Polish, Optimization & SEO (Priority: Low - Pre-Launch)
- [ ] **SEO**: Ensure dynamic metadata for all property pages.
- [ ] **Performance**: Optimize images, implement code-splitting for heavy components (Maps).
- [ ] **Accessibility**: Audit with Lighthouse/Axe, ensure keyboard nav works key places.

## Execution Workflow
For each task above, follow this micro-loop:
1.  **Check**: Does the component exist in `compnents/ui`? If not, build it.
2.  **Build**: Create the section/page using Tailwind utility classes.
3.  **Animate**: Apply `framer-motion` for entrance/interaction.
4.  **Responsiveness**: Verify mobile/tablet views.
5.  **Clean**: Move reusable parts to `components/shared` or `components/ui`.

---
**Next Immediate Step**: Confirm which Phase to start or if you want to tackle a specific page like `/properties` or `/dashboard`.
