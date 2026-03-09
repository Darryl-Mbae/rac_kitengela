import SEO from '../components/SEO'

function Contact() {
  return (
    <div>
      <SEO 
        title="Contact Us"
        description="Get in touch with RAC Kitengela. Contact us for inquiries about membership, events, partnerships, or community service opportunities."
        keywords="RAC Kitengela contact, get in touch, membership inquiries, partnerships, community service"
        image="/images/og-contact.jpg"
      />
      <div className="py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Contact Us</h1>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            Ready to join us or have questions? We'd love to hear from you.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div>
            <h2 className="text-2xl font-semibold text-primary mb-6">Get In Touch</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-primary mb-2">Email</h3>
                <p className="text-secondary">info@rackitengela.org</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-primary mb-2">Phone</h3>
                <p className="text-secondary">+254 XXX XXX XXX</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-primary mb-2">Address</h3>
                <p className="text-secondary">
                  Kitengela, Kajiado County<br />
                  Kenya
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-primary mb-2">Follow Us</h3>
                <div className="flex gap-4">
                  <a href="#" className="text-cranberry hover:text-primary transition-colors">
                    Instagram
                  </a>
                  <a href="#" className="text-cranberry hover:text-primary transition-colors">
                    Substack
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-secondary rounded-lg p-8">
            <h3 className="text-xl font-semibold text-primary mb-6">Send us a Message</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-primary mb-2">Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border border-default rounded-lg focus:outline-none focus:ring-2 focus:ring-cranberry"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-primary mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-2 border border-default rounded-lg focus:outline-none focus:ring-2 focus:ring-cranberry"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-primary mb-2">Message</label>
                <textarea 
                  rows={4}
                  className="w-full px-4 py-2 border border-default rounded-lg focus:outline-none focus:ring-2 focus:ring-cranberry"
                  placeholder="Your message..."
                />
              </div>
              
              <button 
                type="submit"
                className="w-full bg-cranberry text-white py-2 px-4 rounded-lg hover:bg-primary-cranberry-dark transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact