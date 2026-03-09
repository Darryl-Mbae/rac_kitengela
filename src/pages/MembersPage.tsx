import SEO from '../components/SEO'
import Members from '../components/Members'

function MembersPage() {
  return (
    <div>
      <SEO 
        title="Members"
        description="Meet the dedicated members of RAC Kitengela. Get to know our team of passionate individuals committed to community service and leadership."
        keywords="RAC Kitengela members, team, leadership, community leaders, volunteers"
        image="/images/og-members.jpg"
      />
      <div className="py-12">
        <Members />
      </div>
    </div>
  )
}

export default MembersPage