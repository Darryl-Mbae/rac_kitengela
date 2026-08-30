import { useState } from 'react';
import { Heart, Mail, MapPin, Send, CheckCircle } from 'lucide-react';
import { usePageImages } from '../hooks/usePageImages';
import SEO from '../components/SEO';
import { getPageSEO } from '../utils/seo';

export default function Join() {
  // Preload images for this page
  usePageImages([]);

  const seo = getPageSEO("join");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    occupation: '',
    message: '',
    interest: 'member',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        age: '',
        occupation: '',
        message: '',
        interest: 'member',
      });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="w-full bg-white ">
      {/* SEO */}
      <SEO
        title={seo.title}
        description={seo.description}
        canonical={seo.canonical}
        ogImage={seo.ogImage}
        schema={seo.schema}
      />
      {/* Premium Header Banner */}
      <div className="relative bg-gradient-to-br from-primary via-primary to-secondary py-20 px-[5%] text-white overflow-hidden mb-12">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/10 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />
        
        <div className="relative max-w-6xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/20 text-accent text-xs font-semibold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5" /> Join Us Today
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
            Get Involved
          </h1>
          <p className="text-sm md:text-base font-light text-white/85 max-w-2xl leading-relaxed">
            Take the first step toward a more fulfilling journey of service, professional growth, 
            and meaningful friendships. We're excited to meet you!
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 pb-20">
        
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          
          {/* Left Column - Why Join */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-display text-secondary mb-4">
                Why Join Rotaract Kitengela?
              </h2>
              <p className="text-gray-600 font-light leading-relaxed">
                We're more than just a club—we're a movement of young leaders committed to creating 
                meaningful change in our community and beyond.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: "🚀",
                  title: "Service Above Self",
                  desc: "Make a real difference through our signature projects serving 400+ students and vulnerable communities.",
                },
                {
                  icon: "💼",
                  title: "Professional Growth",
                  desc: "Develop leadership skills, expand your network, and accelerate your career through mentorship.",
                },
                {
                  icon: "🤝",
                  title: "Lifelong Friendships",
                  desc: "Build deep connections with 35+ young professionals who share your values and ambitions.",
                },
                {
                  icon: "🌍",
                  title: "Global Community",
                  desc: "Connect with Rotaractors across East Africa and 200+ countries worldwide.",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-2xl border border-gray-100 hover:bg-gray-50 transition-all duration-200">
                  <span className="text-3xl shrink-0">{item.icon}</span>
                  <div>
                    <h4 className="font-semibold text-secondary text-sm">{item.title}</h4>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed font-light">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Impact Stats */}
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-6">
              <h4 className="font-semibold text-secondary mb-4">Our Impact</h4>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-2xl font-display text-primary font-bold">35+</div>
                  <p className="text-xs text-gray-600 mt-1 font-light">Active Members</p>
                </div>
                <div>
                  <div className="text-2xl font-display text-secondary font-bold">10+</div>
                  <p className="text-xs text-gray-600 mt-1 font-light">Projects Delivered</p>
                </div>
                <div>
                  <div className="text-2xl font-display text-accent font-bold">400+</div>
                  <p className="text-xs text-gray-600 mt-1 font-light">Lives Impacted</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-gradient-to-br from-slate-50 to-white border border-gray-100 rounded-3xl p-8 shadow-lg">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-display text-secondary">Thank You!</h3>
                <p className="text-center text-gray-600 font-light text-sm">
                  We've received your inquiry. We'll be in touch within 24 hours to discuss next steps.
                </p>
                <p className="text-center text-gray-500 text-xs font-light">
                  Follow us on social media for updates in the meantime!
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-display text-secondary mb-6">Express Interest</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary focus:outline-none transition-colors duration-200 text-sm"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary focus:outline-none transition-colors duration-200 text-sm"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+254 7XX XXX XXX"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary focus:outline-none transition-colors duration-200 text-sm"
                    />
                  </div>

                  {/* Age */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Age *</label>
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                        placeholder="e.g., 24"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary focus:outline-none transition-colors duration-200 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Occupation *</label>
                      <select
                        name="interest"
                        value={formData.interest}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary focus:outline-none transition-colors duration-200 text-sm"
                      >
                        <option value="student">Student</option>
                        <option value="professional">Professional</option>
                        <option value="entrepreneur">Entrepreneur</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Why do you want to join?</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your interests and what you hope to gain..."
                      rows={4}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary focus:outline-none transition-colors duration-200 text-sm resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    <span>Send My Interest</span>
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </button>

                  <p className="text-xs text-gray-500 text-center font-light">
                    We respect your privacy. Your information will only be used for club-related communications.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-semibold text-secondary mb-2">Email</h4>
            <p className="text-sm text-gray-600 font-light">
              <a href="mailto:rackitengela@rotaractdistrict9216.org" className="hover:text-primary transition-colors">
                rackitengela@rotaractdistrict9216.org
              </a>
            </p>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-semibold text-secondary mb-2">Location</h4>
            <p className="text-sm text-gray-600 font-light">
              Kitengela, Kajiado County<br />Kenya
            </p>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-semibold text-secondary mb-2">Social Media</h4>
            <p className="text-sm text-gray-600 font-light">
              Follow us on Instagram, TikTok & Substack
            </p>
          </div>
        </section>

        {/* Next Steps */}
        <section className="bg-gradient-to-r from-secondary to-primary rounded-3xl p-8 md:p-12 text-white">
          <div className="max-w-2xl mx-auto space-y-6">
            <h3 className="text-2xl md:text-3xl font-display text-center">What Happens Next?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <div className="text-3xl font-display text-accent">1</div>
                <p className="font-light text-sm">We review your application</p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-display text-accent">2</div>
                <p className="font-light text-sm">Schedule a meet & greet</p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-display text-accent">3</div>
                <p className="font-light text-sm">Join our community!</p>
              </div>
            </div>
            <p className="text-center text-white/85 font-light max-w-xl mx-auto">
              The entire process typically takes 2-3 weeks. You'll be guided through each step 
              and have the opportunity to meet our leadership team before making a commitment.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-24">
          <h3 className="text-2xl font-display text-secondary mb-8">Still Have Questions?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: "What if I can't commit to monthly meetings?",
                a: "We offer flexible membership options including Associate and Alumni tiers that work around your schedule.",
              },
              {
                q: "Is there a membership fee?",
                a: "Yes, quarterly dues help support our operations and projects. We offer payment plans to make it accessible.",
              },
              {
                q: "Can I attend an event before deciding?",
                a: "Absolutely! We encourage prospective members to attend meetings or events first. It's a great way to get a feel for the club.",
              },
              {
                q: "What if I live far from Kitengela?",
                a: "Many of our members commute from different parts of Nairobi and beyond. We work with members on attendance.",
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-50 border border-gray-100 rounded-2xl p-6">
                <h4 className="font-semibold text-secondary mb-3">{item.q}</h4>
                <p className="text-sm text-gray-600 leading-relaxed font-light">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Social CTA */}
        <section className="mt-24 text-center">
          <h3 className="text-2xl font-display text-secondary mb-4">Follow Us Online</h3>
          <p className="text-gray-600 font-light mb-6 max-w-xl mx-auto">
            Get daily insights into our projects, member stories, wellness tips, and upcoming events
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold text-sm"
            >
              <span>📸</span> Instagram
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold text-sm"
            >
              <span>💼</span> LinkedIn
            </a>
            <a
              href="https://substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold text-sm"
            >
              📰 Substack
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
