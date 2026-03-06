import About from '../components/About'
import FAQs from '../components/FAQs'
import JoinUs from '../components/JoinUs'
import Testimonial from '../components/Testimonial'
import Upcoming from '../components/Upcoming'

type Props = {}

function Homepage({}: Props) {
  return (
    <div>
        <About/>
        <Upcoming/>
        <JoinUs/>
        <FAQs/>
        <Testimonial/>
    </div>
  )
}

export default Homepage