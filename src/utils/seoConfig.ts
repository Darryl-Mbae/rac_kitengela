// SEO Configuration for RAC Kitengela Website

export interface PageSEO {
  title: string
  description: string
  keywords: string
  image: string
  type?: string
  structuredData?: object
}

// Default site-wide SEO settings
export const defaultSEO = {
  siteName: "RAC Kitengela",
  defaultTitle: "RAC Kitengela - Building Stronger Communities Through Service",
  defaultDescription: "Welcome to RAC Kitengela - Building stronger communities through service, fellowship, and leadership development. Join us in making a positive impact in Kitengela and beyond.",
  defaultKeywords: "RAC Kitengela, Rotaract Club, community service, leadership development, fellowship, Kitengela, youth organization, volunteer, community impact",
  defaultImage: "https://rotaractkitengela.netlify.app/seo/default-og.jpg", // Main site image for domain sharing
  siteUrl: "https://rackitengela.org",
  twitterHandle: "@rotaractkitengela",
  themeColor: "#DC143C"
}

export const seoConfig: Record<string, PageSEO> = {
  home: {
    title: "Home",
    description: "Welcome to RAC Kitengela - Building stronger communities through service, fellowship, and leadership development. Join us in making a positive impact in Kitengela and beyond.",
    keywords: "RAC Kitengela, Rotaract Club, community service, leadership development, fellowship, Kitengela, youth organization, volunteer, community impact",
    image: "https://rotaractkitengela.netlify.app/seo/home.png",
    type: "website"
  },
  
  about: {
    title: "About Us",
    description: "Learn about RAC Kitengela's mission, vision, and values. Discover how we're making a difference in our community through service, leadership development, and meaningful partnerships.",
    keywords: "RAC Kitengela about, mission, vision, values, community service, leadership development, Rotaract history, club objectives",
    image: "https://rotaractkitengela.netlify.app/seo/about.png",
    type: "website"
  },
  
  events: {
    title: "Events",
    description: "Discover upcoming and past events by RAC Kitengela. Join us for community service projects, networking events, leadership workshops, and social gatherings that make a difference.",
    keywords: "RAC Kitengela events, community service events, networking, leadership workshops, volunteer opportunities, club activities, upcoming events",
    image: "https://rotaractkitengela.netlify.app/seo/events.png",
    type: "website"
  },
  
  members: {
    title: "Members",
    description: "Meet the dedicated members of RAC Kitengela. Get to know our team of passionate individuals committed to community service, leadership, and making a positive impact in Kitengela.",
    keywords: "RAC Kitengela members, team, leadership team, community leaders, volunteers, club members, board members",
    image: "https://rotaractkitengela.netlify.app/seo/members.png",
    type: "website"
  },
  
  contact: {
    title: "Contact Us",
    description: "Get in touch with RAC Kitengela. Contact us for inquiries about membership, events, partnerships, sponsorships, or community service opportunities. We'd love to hear from you.",
    keywords: "RAC Kitengela contact, get in touch, membership inquiries, partnerships, sponsorships, community service, join Rotaract, contact information",
    image: "https://rotaractkitengela.netlify.app/seo/contact.png",
    type: "website"
  },
  
  gallery: {
    title: "Gallery",
    description: "Explore photos from RAC Kitengela's events, community service projects, and memorable moments. See our impact in action through our visual story.",
    keywords: "RAC Kitengela gallery, photos, events photos, community service images, club activities, memories, visual story",
    image: "https://rotaractkitengela.netlify.app/seo/gallery.png",
    type: "website"
  }
}

// SEO Image Requirements and Guidelines
export const seoImageRequirements = {
  // Open Graph and Twitter Card optimal dimensions
  openGraph: {
    width: 1200,
    height: 630,
    aspectRatio: "1.91:1",
    format: "JPG or PNG",
    maxSize: "8MB"
  },
  
  // Favicon requirements
  favicon: {
    sizes: ["16x16", "32x32", "48x48", "180x180"],
    format: "PNG or ICO"
  },
  
  // Logo requirements
  logo: {
    width: 512,
    height: 512,
    format: "PNG with transparent background"
  }
}

// Required SEO images for each page
export const requiredSEOImages = [
  {
    path: "https://rotaractkitengela.netlify.app/seo/default-og.jpg",
    description: "Default site-wide image for domain sharing and fallback",
    dimensions: "1200x630px",
    content: "RAC Kitengela main branding image, should represent the entire organization"
  },
  {
    path: "https://rotaractkitengela.netlify.app/seo/home.png",
    description: "Homepage hero image showing RAC Kitengela members in action or group photo",
    dimensions: "1200x630px",
    content: "Should showcase community service, fellowship, or club activities"
  },
  {
    path: "https://rotaractkitengela.netlify.app/seo/about.png", 
    description: "About page image showing club mission/vision in action",
    dimensions: "1200x630px",
    content: "Team photo, leadership activities, or community impact"
  },
  {
    path: "https://rotaractkitengela.netlify.app/seo/events.png",
    description: "Events page image showing various club events and activities", 
    dimensions: "1200x630px",
    content: "Collage of events, workshops, or community service projects"
  },
  {
    path: "https://rotaractkitengela.netlify.app/seo/members.png",
    description: "Members page image showing team/group photo",
    dimensions: "1200x630px", 
    content: "Professional group photo or members at work"
  },
  {
    path: "https://rotaractkitengela.netlify.app/seo/contact.png",
    description: "Contact page image showing accessibility and openness",
    dimensions: "1200x630px",
    content: "Meeting space, contact information visual, or welcoming image"
  },
  {
    path: "https://rotaractkitengela.netlify.app/seo/gallery.png",
    description: "Gallery page image showing photo collage or highlights",
    dimensions: "1200x630px",
    content: "Collage of best photos or gallery preview"
  },
  {
    path: "/favicon.ico",
    description: "Main favicon for browser tabs",
    dimensions: "32x32px",
    content: "RAC Kitengela logo simplified"
  },
  {
    path: "/apple-touch-icon.png",
    description: "Apple device home screen icon",
    dimensions: "180x180px", 
    content: "RAC Kitengela logo optimized for iOS"
  },
  {
    path: "/favicon-32x32.png",
    description: "Standard favicon PNG",
    dimensions: "32x32px",
    content: "RAC Kitengela logo"
  },
  {
    path: "/favicon-16x16.png", 
    description: "Small favicon PNG",
    dimensions: "16x16px",
    content: "RAC Kitengela logo simplified"
  },
  {
    path: "/site.webmanifest",
    description: "Web app manifest for PWA features",
    dimensions: "N/A",
    content: "JSON file with app metadata"
  }
]

// Helper function to get SEO config for a page
export const getPageSEO = (page: string): PageSEO => {
  return seoConfig[page] || {
    title: defaultSEO.defaultTitle,
    description: defaultSEO.defaultDescription,
    keywords: defaultSEO.defaultKeywords,
    image: defaultSEO.defaultImage,
    type: "website"
  }
}