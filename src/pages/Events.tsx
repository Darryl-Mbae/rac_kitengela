import SEO from '../components/SEO'
import Upcoming from '../components/Upcoming'

function Events() {
  return (
    <div>
      <SEO 
        title="Events"
        description="Discover upcoming events and activities at RAC Kitengela. Join us for community service projects, networking events, and leadership development programs."
        keywords="RAC Kitengela events, community events, service projects, networking, leadership programs"
        image="/images/og-events.jpg"
      />
      <div className="py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Our Events</h1>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            Stay connected with our community through various events, service projects, and networking opportunities.
          </p>
        </div>
        <Upcoming />
      </div>
    </div>
  )
}

export default Events