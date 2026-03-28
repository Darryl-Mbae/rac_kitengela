import SEO from '../components/SEO'
import { getPageSEO } from '../utils/seoConfig'

function AboutUs() {
  const pageSEO = getPageSEO('about')
  
  return (
    <div>
      <SEO
        title={pageSEO.title}
        description={pageSEO.description}
        keywords={pageSEO.keywords}
        image={pageSEO.image}
        type={pageSEO.type}
      />
      <div className="py-12">

      </div>
    </div>
  )
}

export default AboutUs