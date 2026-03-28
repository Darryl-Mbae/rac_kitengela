import { Helmet } from 'react-helmet-async'

import { getSocialLink } from '../utils/socials'

interface SEOProps {
  title: string
  description: string
  keywords?: string
  image?: string
  url?: string
  type?: string
  noindex?: boolean
  structuredData?: object
}

const SEO = ({ 
  title, 
  description, 
  keywords = "RAC Kitengela, community, events, members, about us",
  image = "/og-image.jpg", // 1200x630px recommended
  url = window.location.href,
  type = "website",
  noindex = false,
  structuredData
}: SEOProps) => {
  const siteName = "RAC Kitengela"
  const fullTitle = `${title} | ${siteName}`
  
  // Convert relative URLs to absolute URLs for social media crawlers
  const baseUrl = window.location.origin
  const absoluteImage = image.startsWith('http') ? image : `${baseUrl}${image}`
  const absoluteUrl = url.startsWith('http') ? url : `${baseUrl}${url}`

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="RAC Kitengela" />
      <link rel="canonical" href={absoluteUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:url" content={absoluteUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />
      <meta name="twitter:site" content={`@${getSocialLink('Twitter/X')?.href.split('/').pop() || 'racKitengela'}`} />

      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />
      <meta name="theme-color" content="#DC143C" />
      
      {/* Structured Data (JSON-LD) */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      
      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    </Helmet>
  )
}

export default SEO