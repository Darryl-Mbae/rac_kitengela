# RAC Kitengela Website

A modern, responsive website for RAC Kitengela built with React, TypeScript, and Tailwind CSS.

## Features

- ✅ **React Router** - Proper URL routing with browser history
- ✅ **SEO Optimized** - Meta tags, Open Graph, Twitter Cards
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Dark/Light Theme** - System preference detection
- ✅ **Production Ready** - Optimized builds and deployment
- ✅ **Accessibility** - WCAG compliant components
- ✅ **Performance** - Lazy loading and code splitting

## Pages

- **Home** (`/`) - Main landing page with about, events, testimonials
- **Events** (`/events`) - Upcoming events and activities
- **Members** (`/members`) - Team members and leadership
- **About** (`/about`) - Organization mission, vision, values
- **Contact** (`/contact`) - Contact information and form
- **404** (`/*`) - Custom not found page

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **React Router** - Client-side routing
- **React Helmet Async** - SEO meta tags
- **Vite** - Build tool
- **Swiper** - Carousel components

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## SEO & Social Media

The website includes comprehensive SEO optimization:

- Dynamic meta titles and descriptions
- Open Graph tags for social sharing
- Twitter Card support
- Structured data markup
- Sitemap and robots.txt

### Required Images

Place these images in `public/images/`:

- `og-home.jpg` (1200x630px) - Homepage social sharing
- `og-events.jpg` (1200x630px) - Events page sharing
- `og-members.jpg` (1200x630px) - Members page sharing
- `og-about.jpg` (1200x630px) - About page sharing
- `og-contact.jpg` (1200x630px) - Contact page sharing

### Favicon Files

Place these in `public/`:

- `favicon.ico` (32x32px)
- `apple-touch-icon.png` (180x180px)
- `favicon-32x32.png` (32x32px)
- `favicon-16x16.png` (16x16px)

## Deployment

### Netlify (Recommended)

The project is configured for Netlify deployment:

1. Connect your repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. The `netlify.toml` handles SPA routing automatically

### Other Platforms

For other platforms, ensure:
- All routes redirect to `index.html` for SPA routing
- Static files are served with proper cache headers
- HTTPS is enabled for better SEO

## Customization

### Colors

Update the color scheme in `src/index.css`:

```css
:root {
  --primary-cranberry: #DC143C;
  --secondary-lime: #C1FF07;
  /* ... other colors */
}
```

### Content

- Update page content in `src/pages/`
- Modify components in `src/components/`
- Add new routes in `src/App.tsx`

### SEO

Update default SEO values in `src/components/SEO.tsx`:

```tsx
const siteName = "RAC Kitengela"
// Update social media handles, default images, etc.
```

## Performance

- Images are optimized and lazy-loaded
- Code is split by routes
- CSS is purged in production
- Fonts are preloaded

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Progressive enhancement for older browsers

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

© 2026 RAC Kitengela. All rights reserved.