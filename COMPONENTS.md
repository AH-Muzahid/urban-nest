# Component Documentation

## Overview
This document provides detailed information about all components in the UrbanNest application.

---

## Shared Components

### Navbar
**Location**: `src/components/shared/Navbar.jsx`

**Description**: A responsive navigation bar with scroll effects, mobile menu, and smooth animations.

**Features**:
- Glassmorphism effect on scroll
- Mobile hamburger menu with slide-down animation
- Animated logo rotation on hover
- Smooth underline effect on nav links
- Login and Contact Us buttons

**Props**: None (standalone component)

**Usage**:
```jsx
import Navbar from '@/components/shared/Navbar';

<Navbar />
```

**State**:
- `isScrolled`: Boolean - Tracks scroll position for styling
- `isMobileMenuOpen`: Boolean - Controls mobile menu visibility

**Animations**:
- Initial slide down from top
- Logo rotation on hover
- Nav link underline expansion
- Button scale effects

---

### Footer
**Location**: `src/components/shared/Footer.jsx`

**Description**: A comprehensive footer with multiple sections, links, and social media icons.

**Features**:
- Four-column layout (Brand, Portfolio, Company, Contact)
- Social media links with hover effects
- Staggered entrance animations
- Responsive grid layout

**Props**: None (standalone component)

**Usage**:
```jsx
import Footer from '@/components/shared/Footer';

<Footer />
```

**Sections**:
1. **Brand**: Logo, description, social links
2. **Portfolio**: Property type links
3. **Company**: About, partners, careers, journal
4. **Contact**: Phone, email, address

**Animations**:
- Staggered children fade-in
- Link hover translate effect
- Social icon scale and border color change

---

## Section Components

### HeroSection
**Location**: `src/components/sections/HeroSection.jsx`

**Description**: Full-screen hero section with background image, headline, and search bar.

**Features**:
- Parallax background effect (slow zoom)
- Advanced property search bar
- Three search inputs (Location, Price, Type)
- Responsive layout (stacks on mobile)

**Props**: None (standalone component)

**Usage**:
```jsx
import HeroSection from '@/components/sections/HeroSection';

<HeroSection />
```

**Search Bar Inputs**:
1. **Location**: Text input with location icon
2. **Price Range**: Text input with payment icon
3. **Property Type**: Select dropdown with home icon

**Animations**:
- Background slow zoom (20s loop)
- Staggered text and search bar entrance
- Icon scale on hover
- Button scale on hover/tap

---

### FeaturedListings
**Location**: `src/components/sections/FeaturedListings.jsx`

**Description**: Grid of featured property cards with details and hover effects.

**Features**:
- 3-column responsive grid
- Property cards with images
- Bed, bath, sqft statistics
- Featured badge for highlighted properties
- "View All Properties" link

**Props**: None (uses internal data array)

**Usage**:
```jsx
import FeaturedListings from '@/components/sections/FeaturedListings';

<FeaturedListings />
```

**Property Data Structure**:
```javascript
{
  id: Number,
  title: String,
  price: String,
  image: String (URL),
  beds: Number,
  baths: Number,
  sqft: String,
  featured: Boolean
}
```

**Animations**:
- Staggered card entrance
- Card lift on hover (-10px)
- Image zoom on hover (scale 1.1)
- Button scale effects

---

### PropertyCategories
**Location**: `src/components/sections/PropertyCategories.jsx`

**Description**: Three category cards (Residential, Commercial, Luxury) with image backgrounds.

**Features**:
- 3-column grid layout
- Full-bleed background images
- Overlay gradient
- Border highlight on hover

**Props**: None (uses internal data array)

**Usage**:
```jsx
import PropertyCategories from '@/components/sections/PropertyCategories';

<PropertyCategories />
```

**Category Data Structure**:
```javascript
{
  id: Number,
  title: String,
  image: String (URL),
  href: String (link)
}
```

**Animations**:
- Staggered card entrance (scale from 0.9)
- Image zoom on hover
- Primary color overlay on hover
- Border fade-in on hover
- Title scale on hover

---

### WhyChooseUs
**Location**: `src/components/sections/WhyChooseUs.jsx`

**Description**: Two-column section showcasing company philosophy with features and image.

**Features**:
- Left: Text content and feature cards
- Right: Large image with stats badge
- 2-column feature grid
- Animated icons

**Props**: None (uses internal data array)

**Usage**:
```jsx
import WhyChooseUs from '@/components/sections/WhyChooseUs';

<WhyChooseUs />
```

**Feature Data Structure**:
```javascript
{
  icon: Component (React Icon),
  title: String,
  description: String
}
```

**Animations**:
- Left content slides in from left
- Right content slides in from right
- Feature cards fade in with delay
- Icon rotation on hover
- Image scale on hover
- Stats badge scale entrance

---

### Testimonials
**Location**: `src/components/sections/Testimonials.jsx`

**Description**: Testimonial carousel with pagination dots.

**Features**:
- Single testimonial display
- Smooth transitions between testimonials
- Pagination dots for navigation
- Auto-height container

**Props**: None (uses internal data array)

**Usage**:
```jsx
import Testimonials from '@/components/sections/Testimonials';

<Testimonials />
```

**State**:
- `activeIndex`: Number - Current testimonial index

**Testimonial Data Structure**:
```javascript
{
  id: Number,
  quote: String,
  author: String,
  position: String
}
```

**Animations**:
- Quote icon scale entrance
- Testimonial fade and slide transition
- Pagination dot scale on hover
- Active dot width expansion

**Interaction**:
- Click pagination dots to change testimonial
- Smooth AnimatePresence transitions

---

### Newsletter
**Location**: `src/components/sections/Newsletter.jsx`

**Description**: Email subscription form with validation and toast notifications.

**Features**:
- Email input with validation
- Submit button with loading state
- Toast notifications (success/error)
- Responsive layout

**Props**: None (standalone component)

**Usage**:
```jsx
import Newsletter from '@/components/sections/Newsletter';

<Newsletter />
```

**State**:
- `email`: String - Email input value
- `isLoading`: Boolean - Form submission state

**Validation**:
- Required field check
- Email format validation (regex)
- Error toast for invalid input
- Success toast on submission

**Animations**:
- Section fade-in on scroll
- Input scale on focus
- Button scale on hover/tap
- Disabled state styling

---

## Animation Patterns

### Framer Motion Variants

**Container Variants** (Stagger Children):
```javascript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};
```

**Item Variants** (Fade In Up):
```javascript
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
```

**Card Variants** (Scale In):
```javascript
const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6 },
  },
};
```

### Common Hover Effects

**Scale**:
```jsx
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
```

**Lift**:
```jsx
whileHover={{ y: -10 }}
```

**Rotate**:
```jsx
whileHover={{ rotate: 360 }}
transition={{ duration: 0.6 }}
```

---

## Styling Conventions

### Tailwind Classes
- **Spacing**: Use consistent spacing scale (4, 6, 8, 10, 12, 16, 20, 24)
- **Colors**: Use defined color variables (primary, charcoal)
- **Typography**: Use font-display for Manrope font
- **Responsive**: Mobile-first approach (base → md → lg)

### Dark Mode
All components support dark mode with `dark:` prefix:
```jsx
className="bg-white dark:bg-charcoal text-charcoal dark:text-white"
```

### Hover States
Consistent hover transitions:
```jsx
className="transition-all duration-300 hover:text-primary"
```

---

## Best Practices

### Component Structure
1. Import statements
2. Component function
3. State declarations
4. Event handlers
5. Return JSX
6. Export default

### Animation Guidelines
- Use `viewport={{ once: true }}` for scroll animations
- Keep animation durations between 0.3s - 0.8s
- Use stagger for multiple items (0.1s - 0.2s delay)
- Add loading states for async operations

### Accessibility
- Use semantic HTML elements
- Add ARIA labels to buttons and links
- Ensure keyboard navigation works
- Maintain color contrast ratios

### Performance
- Lazy load images
- Use Next.js Image component
- Minimize re-renders with proper state management
- Use CSS transforms for animations (not position)

---

## Future Enhancements

### Planned Components
- Property detail modal
- Advanced filter sidebar
- Interactive map view
- Virtual tour viewer
- Comparison tool
- Saved properties list

### Planned Features
- User authentication
- Favorite properties
- Property search with filters
- Agent contact form
- Virtual tour integration
- 3D property viewer

---

## Troubleshooting

### Common Issues

**Animations not working**:
- Check Framer Motion is installed
- Verify `initial`, `animate`, `whileInView` props
- Ensure viewport observer is enabled

**Styles not applying**:
- Check Tailwind config includes component paths
- Verify custom colors are defined
- Clear `.next` cache and rebuild

**Images not loading**:
- Verify image URLs are accessible
- Check Next.js Image component configuration
- Ensure proper CORS headers for external images

---

**Last Updated**: January 2026
