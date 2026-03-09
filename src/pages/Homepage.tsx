import About from '../components/About'
import FAQs from '../components/FAQs'
import JoinUs from '../components/JoinUs'
import Testimonial from '../components/Testimonial'
import Upcoming from '../components/Upcoming'
import SEO from '../components/SEO'

function Homepage() {
  return (
    <div>
      <SEO 
        title="Home"
        description="Welcome to RAC Kitengela - Building stronger communities through service, fellowship, and leadership development. Join us in making a positive impact in Kitengela and beyond."
        keywords="RAC Kitengela, community service, leadership, fellowship, Kitengela, youth organization"
        image="/images/og-home.jpg"
      />
      {/* <Hero/> */}
      <About/>
      <Upcoming/>
      <JoinUs/>
      <FAQs/>
      <Testimonial/>
    </div>
  )
}

export default Homepage