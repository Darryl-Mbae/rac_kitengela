# Social Links System

This directory contains utilities for managing social media links across the application.

## Files

### `socials.ts`
Central configuration for all social media links used throughout the application.

#### Key Features:
- **Centralized Management**: All social links are defined in one place
- **Type Safety**: TypeScript interfaces ensure consistent usage
- **Flexible Filtering**: Helper functions to get specific social platforms
- **Icon Integration**: Each social link includes its corresponding React icon

#### Usage Examples:

```typescript
import { socialLinks, getSocialLink, getFooterSocials } from '../utils/socials'

// Get all social links
const allSocials = socialLinks

// Get a specific social link
const instagram = getSocialLink('Instagram')

// Get filtered social links for footer
const footerSocials = getFooterSocials()
```

### Social Links Configuration

Current social platforms configured:
- **Instagram**: @rotaractkitengela
- **WhatsApp**: Business number for direct contact
- **LinkedIn**: Company page
- **Twitter/X**: @rotaractkitengela  
- **Substack**: Newsletter platform

## Components

### `SocialLinks` Component
Reusable component for displaying social media links with different styling variants.

#### Props:
- `variant`: Styling variant ('default' | 'footer' | 'contact' | 'header')
- `className`: Additional CSS classes
- `iconClassName`: CSS classes for icons
- `showLabels`: Whether to show platform names
- `filterPlatforms`: Array of platform names to display

#### Usage Examples:

```tsx
import SocialLinks from '../components/SocialLinks'

// Footer social links
<SocialLinks 
  variant="footer" 
  filterPlatforms={['Instagram', 'WhatsApp', 'LinkedIn']}
/>

// Contact page social links
<SocialLinks 
  variant="contact"
  filterPlatforms={['Instagram', 'WhatsApp', 'Twitter/X', 'Substack']}
/>

// Header with labels
<SocialLinks 
  variant="header"
  showLabels={true}
/>
```

## Implementation Notes

### Updating Social Links
To update social media URLs:
1. Edit the `socialLinks` array in `src/utils/socials.ts`
2. All components using the social links will automatically update

### Adding New Platforms
1. Add the new platform to the `socialLinks` array
2. Import the appropriate icon from react-icons or lucide-react
3. Update filter functions if needed

### Accessibility
- All social links include proper `aria-label` attributes
- Links open in new tabs with `rel="noopener noreferrer"`
- Hover states and focus indicators are included

### SEO Integration
- Social links are automatically included in JSON-LD structured data
- Twitter meta tags use the centralized Twitter handle
- All links are crawlable by search engines