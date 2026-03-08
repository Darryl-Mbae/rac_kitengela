import About from '../components/About'
import FAQs from '../components/FAQs'
import JoinUs from '../components/JoinUs'
import Testimonial from '../components/Testimonial'
import Upcoming from '../components/Upcoming'

function Homepage() {
  return (
    <div>
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