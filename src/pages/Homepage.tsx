import About from '../components/About'
import FAQs from '../components/FAQs'
import JoinUs from '../components/JoinUs'
import Testimonial from '../components/Testimonial'
import Upcoming from '../components/Upcoming'
import SEO from '../components/SEO'
import Hero from '../components/Hero'
import { socialLinks } from '../utils/socials'
import { getPageSEO } from '../utils/seoConfig'

function Homepage() {
  const pageSEO = getPageSEO('home')
  
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "RAC Kitengela",
    "description": "Building stronger communities through service, fellowship, and leadership development in Kitengela and beyond.",
    "url": "https://rackitengela.org",
    "logo": "https://rackitengela.org/images/logo.png",
    "sameAs": socialLinks.map(social => social.href),
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kitengela",
      "addressCountry": "KE"
    }
  }

  return (
    <div>
      <SEO
        title={pageSEO.title}
        description={pageSEO.description}
        keywords={pageSEO.keywords}
        image={pageSEO.image}
        type={pageSEO.type}
        structuredData={organizationStructuredData}
      />
      <Hero />
      <About />
      <Upcoming />
      <JoinUs />
      <FAQs />
      <Testimonial />
    </div>
  )
}

export default Homepage