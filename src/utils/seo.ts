// SEO configuration for different pages
export const SEO_CONFIG = {
  home: {
    title: "Rotaract Club of Kitengela - Building Leaders, Creating Impact",
    description:
      "Join a community of young leaders dedicated to service, leadership development, and creating positive change in Kitengela, Kenya.",
    canonical: "https://rotaractkitengela.org/",
    ogImage: "/images/logo-wheel.png",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Rotaract Club of Kitengela",
      "description": "Join a community of young leaders dedicated to service and social impact.",
      "url": "https://rotaractkitengela.org/",
      "image": "https://rotaractkitengela.org/images/logo-wheel.png",
    },
  },
  about: {
    title: "About Us - Rotaract Club of Kitengela",
    description:
      "Learn about Rotaract Club of Kitengela, our mission, values, and impact in the community.",
    canonical: "https://rotaractkitengela.org/about",
    ogImage: "/images/About.JPEG",
    schema: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About Rotaract Club of Kitengela",
      "description": "Learn about our mission, values, and community impact.",
      "url": "https://rotaractkitengela.org/about",
    },
  },
  projects: {
    title: "Our Projects - Rotaract Club of Kitengela",
    description:
      "Explore our signature projects including WASH initiatives, mental health support, and community development programs in Kitengela.",
    canonical: "https://rotaractkitengela.org/projects",
    ogImage: "/images/projects-thumbnails.png",
    keywords: "projects, community service, WASH, mental health, development",
    schema: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Our Projects",
      "description": "Collection of community service projects",
      "url": "https://rotaractkitengela.org/projects",
    },
  },
  events: {
    title: "Events - Rotaract Club of Kitengela",
    description:
      "Discover upcoming and past events organized by Rotaract Club of Kitengela.",
    canonical: "https://rotaractkitengela.org/events",
    ogImage: "/images/events.jpg",
    keywords: "events, rotaract, community events, kitengela",
    schema: {
      "@context": "https://schema.org",
      "@type": "EventSeries",
      "name": "Rotaract Club Events",
      "description": "Events organized by Rotaract Club of Kitengela",
      "url": "https://rotaractkitengela.org/events",
    },
  },
  leadership: {
    title: "Leadership - Rotaract Club of Kitengela",
    description:
      "Meet the board members, past presidents, and committee leaders of Rotaract Club of Kitengela.",
    canonical: "https://rotaractkitengela.org/leadership",
    ogImage: "/images/board-thumbnail.png",
    keywords: "leadership, board, team, rotaract",
    schema: {
      "@context": "https://schema.org",
      "@type": "TeamPage",
      "name": "Leadership Team",
      "description": "Meet our leadership team and committees",
      "url": "https://rotaractkitengela.org/leadership",
    },
  },
  membership: {
    title: "Membership - Rotaract Club of Kitengela",
    description:
      "Learn about membership options and benefits of joining Rotaract Club of Kitengela.",
    canonical: "https://rotaractkitengela.org/membership",
    ogImage: "/images/MEMBERSHIP.jpeg",
    keywords: "membership, join, rotaract",
    schema: {
      "@context": "https://schema.org",
      "@type": "JoinAction",
      "name": "Join Rotaract",
      "description": "Become a member of Rotaract Club of Kitengela",
      "url": "https://rotaractkitengela.org/membership",
    },
  },
  join: {
    title: "Get Involved - Rotaract Club of Kitengela",
    description: "Join our community and become part of the movement for positive change.",
    canonical: "https://rotaractkitengela.org/join",
    ogImage: "/images/JOIN/join1.jpeg",
    keywords: "join, get involved, volunteer, membership",
    schema: {
      "@context": "https://schema.org",
      "@type": "JoinAction",
      "name": "Get Involved with Rotaract",
      "description": "Join and get involved with Rotaract Club of Kitengela",
      "url": "https://rotaractkitengela.org/join",
    },
  },
};

export interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  keywords?: string;
  schema?: object;
}

export const getPageSEO = (page: keyof typeof SEO_CONFIG): SEOProps => {
  return SEO_CONFIG[page] || SEO_CONFIG.home;
};
