# UrbanNest - Luxury Real Estate Platform

A modern, premium real estate platform built with Next.js 16, featuring stunning animations, responsive design, and a curated luxury property showcase.

![UrbanNest](https://img.shields.io/badge/Next.js-16.1.1-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🌟 Features

### Design & UI
- **Premium Aesthetics**: Luxury-focused design with gold accents and sophisticated color palette
- **Smooth Animations**: Powered by Framer Motion for fluid, professional animations
- **Responsive Design**: Fully responsive across all devices (mobile, tablet, desktop)
- **Dark Mode Ready**: Built-in dark mode support with smooth transitions
- **Custom Scrollbar**: Branded scrollbar matching the primary color scheme

### Components
- **Hero Section**: Full-screen hero with parallax background and advanced search bar
- **Featured Listings**: Property cards with hover effects and detailed information
- **Property Categories**: Interactive category cards with image overlays
- **Why Choose Us**: Feature showcase with animated icons and statistics
- **Testimonials**: Carousel with smooth transitions and pagination
- **Newsletter**: Email subscription with form validation and toast notifications

### Technical Features
- **Next.js 16**: Latest Next.js with App Router and Turbopack
- **TypeScript Ready**: Configured for TypeScript support
- **SEO Optimized**: Proper meta tags, semantic HTML, and structured data
- **Performance**: Optimized images, lazy loading, and code splitting
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd urban-nest
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
urban-nest/
├── src/
│   ├── app/
│   │   ├── (auth)/              # Authentication pages
│   │   ├── dashboard/           # Dashboard pages
│   │   ├── properties/          # Property listing pages
│   │   ├── layout.js            # Root layout with fonts and metadata
│   │   ├── page.js              # Home page
│   │   └── globals.css          # Global styles and Tailwind config
│   ├── components/
│   │   ├── sections/            # Landing page sections
│   │   │   ├── HeroSection.jsx
│   │   │   ├── FeaturedListings.jsx
│   │   │   ├── PropertyCategories.jsx
│   │   │   ├── WhyChooseUs.jsx
│   │   │   ├── Testimonials.jsx
│   │   │   └── Newsletter.jsx
│   │   ├── shared/              # Shared components
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── property/            # Property-specific components
│   │   └── ui/                  # Reusable UI components
│   ├── hooks/                   # Custom React hooks
│   ├── lib/                     # Utility functions
│   └── services/                # API services
├── public/                      # Static assets
├── tailwind.config.js           # Tailwind configuration
├── next.config.mjs              # Next.js configuration
└── package.json                 # Dependencies and scripts
```

## 🎨 Design System

### Colors
- **Primary**: `#d4af35` (Luxury Gold)
- **Charcoal**: `#1f2937` (Dark Background)
- **Background Light**: `#ffffff`
- **Background Dark**: `#1f2937`

### Typography
- **Font Family**: Manrope (Google Fonts)
- **Weights**: 200, 300, 400, 500, 600, 700, 800

### Animations
- **Framer Motion**: Page transitions, hover effects, scroll animations
- **Custom Keyframes**: Blob, gradient, fade-in, fade-in-up
- **Stagger Children**: Sequential component animations

## 📦 Key Dependencies

### Core
- **next**: ^16.1.1 - React framework
- **react**: ^19.2.3 - UI library
- **react-dom**: ^19.2.3 - React DOM renderer

### Styling
- **tailwindcss**: ^4 - Utility-first CSS framework
- **tailwindcss-animate**: ^1.0.7 - Animation utilities
- **framer-motion**: ^12.26.2 - Animation library

### UI & Icons
- **lucide-react**: ^0.562.0 - Icon library
- **react-icons**: Latest - Additional icons
- **class-variance-authority**: ^0.7.1 - Component variants
- **clsx**: ^2.1.1 - Conditional classes
- **tailwind-merge**: ^3.4.0 - Merge Tailwind classes

### Forms & Validation
- **react-hook-form**: ^7.71.0 - Form management
- **zod**: ^4.3.5 - Schema validation

### Notifications
- **react-hot-toast**: ^2.6.0 - Toast notifications

### HTTP Client
- **axios**: ^1.13.2 - API requests

## 🔧 Configuration

### Tailwind Configuration
Custom colors, fonts, and animations are configured in `tailwind.config.js`:
- Primary brand colors
- Manrope font family
- Custom animations (blob, gradient, fade-in)

### Next.js Configuration
- Turbopack enabled for faster development
- Image optimization
- Font optimization with Google Fonts

## 🎯 Component Usage

### Navbar
```jsx
import Navbar from '@/components/shared/Navbar';

<Navbar />
```

### Hero Section
```jsx
import HeroSection from '@/components/sections/HeroSection';

<HeroSection />
```

### Featured Listings
```jsx
import FeaturedListings from '@/components/sections/FeaturedListings';

<FeaturedListings />
```

## 🌐 SEO & Metadata

The application includes comprehensive SEO optimization:
- **Title**: UrbanNest | Luxury Real Estate
- **Description**: Curated luxury properties in desirable locations
- **Keywords**: luxury real estate, premium properties, penthouses, villas
- **Open Graph**: Social media sharing optimization
- **Semantic HTML**: Proper heading hierarchy and structure

## 🎨 Customization

### Changing Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: "#your-color",
  charcoal: "#your-dark-color",
}
```

### Adding New Sections
1. Create component in `src/components/sections/`
2. Import in `src/app/page.js`
3. Add to the page layout

### Modifying Animations
Edit animation settings in component files or add new animations in `tailwind.config.js`

## 🚧 Development Notes

### CSS Lint Warnings
The CSS lint warnings for `@plugin`, `@custom-variant`, `@theme`, and `@apply` are expected and safe to ignore. These are Tailwind CSS v4 directives that are properly processed during build.

### Font Loading
Fonts are optimized using Next.js font optimization with the `next/font/google` package.

### Image Optimization
All images should be placed in the `public` folder and referenced using Next.js `Image` component for automatic optimization.

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px
- **Large Desktop**: > 1280px

## 🔐 Environment Variables

Create a `.env.local` file for environment-specific variables:
```env
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_SITE_URL=your_site_url
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Design inspiration from luxury real estate platforms
- Icons from Lucide React and React Icons
- Fonts from Google Fonts (Manrope)
- Animations powered by Framer Motion

## 📞 Support

For support, email support@urbannest.com or open an issue in the repository.

---

**Built with ❤️ using Next.js and Tailwind CSS**
