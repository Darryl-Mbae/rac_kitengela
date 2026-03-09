import SEO from '../components/SEO'

function AboutUs() {
  return (
    <div>
      <SEO 
        title="About Us"
        description="Learn about RAC Kitengela's mission, vision, and values. Discover how we're making a difference in our community through service and leadership."
        keywords="RAC Kitengela about, mission, vision, community service, leadership development"
        image="/images/og-about.jpg"
      />
      <div className="py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">About RAC Kitengela</h1>
          <p className="text-lg text-secondary max-w-3xl mx-auto">
            We are a dynamic community organization dedicated to service, fellowship, and leadership development in Kitengela and surrounding areas.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-2xl font-semibold text-primary mb-4">Our Mission</h2>
            <p className="text-secondary mb-6">
              To provide opportunities for young professionals to enhance their leadership skills, 
              network with like-minded individuals, and make a positive impact in our community.
            </p>
            
            <h2 className="text-2xl font-semibold text-primary mb-4">Our Vision</h2>
            <p className="text-secondary">
              To be the leading youth organization in Kitengela, fostering innovation, 
              community development, and creating lasting positive change.
            </p>
          </div>
          
          <div className="bg-secondary rounded-lg p-8">
            <h3 className="text-xl font-semibold text-primary mb-4">Our Values</h3>
            <ul className="space-y-3 text-secondary">
              <li>• <strong>Service:</strong> Commitment to community development</li>
              <li>• <strong>Leadership:</strong> Developing future leaders</li>
              <li>• <strong>Fellowship:</strong> Building lasting relationships</li>
              <li>• <strong>Integrity:</strong> Upholding ethical standards</li>
              <li>• <strong>Innovation:</strong> Embracing creative solutions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs