import SEO from '../components/SEO'
import Members from '../components/Members'
import { getPageSEO } from '../utils/seoConfig'

function MembersPage() {
  const pageSEO = getPageSEO('members')
  
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
        <Members />
      </div>
    </div>
  )
}

export default MembersPage