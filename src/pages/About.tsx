import React, { useState } from 'react';
import Hero from '../components/Hero';
import SEO from '../components/SEO';
import { usePageImages } from '../hooks/usePageImages';
import { getPageSEO } from '../utils/seo';
import {
  BookOpen,
  Compass,
  Handshake,
  Globe,
  MapPin,
  History,
  MessageCircle,
  Award,
  Sparkles,
  ArrowRight,
  Heart,
  Briefcase,
  Smile,
  ShieldCheck
} from 'lucide-react';
import FAQs from '../components/FAQs';

interface Tab {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const tabs: Tab[] = [
  { id: 'story', label: 'Our Story', icon: BookOpen },
  { id: 'vision', label: 'Vision & Mission', icon: Compass },
  { id: 'service', label: 'Four Avenue Of Service', icon: Handshake },
  { id: 'rotary', label: 'Rotary International', icon: Globe },
  { id: 'district', label: 'Rotaract District', icon: MapPin },
  { id: 'history', label: 'Club History', icon: History },
  { id: 'faqs', label: 'FAQs', icon: MessageCircle },
];

export default function About() {
  const [activeTab, setActiveTab] = useState<string>('story');
  const seo = getPageSEO("about");

  // Preload all images for this page
  usePageImages([
    '/images/About.JPEG',
    '/images/board-pic.jpg',
    '/images/board-pic-nobg.png'
  ]);

  const renderTabContent = (id: string) => {
    switch (id) {
      case 'story':
        return (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                Introduction
              </span>
              <h2 className="text-3xl lg:text-4xl font-display mt-3 text-secondary">
                Who We Are — <span className="text-primary font-normal">#DUSTY SOUTH</span>
              </h2>
              <p className="text-gray-600 mt-4 leading-relaxed font-light text-base lg:text-lg">
                The Rotaract Club of Kitengela is a premier, award-winning community of young professionals
                and students aged 18 to 35+ who are transforming lives through service, leadership, and friendship.
                Founded in <strong>2018</strong>, we represent a vibrant cohort of changemakers committed to making
                a lasting difference in Kajiado County, Kenya, and beyond.
              </p>
              <p className="text-gray-600 mt-4 leading-relaxed font-light text-base">
                We believe in the power of action. As part of the global Rotary family, we bring together unique skills
                and perspectives to execute high-impact service projects, offer leadership growth opportunities, and build
                sustainable collaborations—all while forging bonds of lifelong friendship.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
              <div className="bg-slate-50 p-5 rounded-2xl border border-gray-100 hover:shadow-md transition-all duration-300">
                <div className="text-primary text-3xl font-display mb-1">2018</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">Year Founded</div>
              </div>
              <div className="bg-slate-50 p-5 rounded-2xl border border-gray-100 hover:shadow-md transition-all duration-300">
                <div className="text-secondary text-3xl font-display mb-1">35+</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">Active Members</div>
              </div>
              <div className="bg-slate-50 p-5 rounded-2xl border border-gray-100 hover:shadow-md transition-all duration-300">
                <div className="text-accent text-3xl font-display mb-1">D9216</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">Current District</div>
              </div>
              <div className="bg-slate-50 p-5 rounded-2xl border border-gray-100 hover:shadow-md transition-all duration-300">
                <div className="text-primary text-3xl font-display mb-1">10+</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">Signature Initiatives</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-secondary/5 to-primary/5 p-6 rounded-2xl border border-secondary/10 flex flex-col md:flex-row items-center gap-6 mt-8">
              <div className="p-3 bg-white rounded-full shadow-xs shrink-0">
                <Award className="w-8 h-8 text-accent" />
              </div>
              <div>
                <h4 className="font-semibold text-secondary text-base md:text-lg">Award-Winning Standard</h4>
                <p className="text-sm text-gray-600 mt-1 font-light leading-relaxed">
                  Rotaract Kitengela was recognized at the Centenary District Conference & Assembly in Mombasa,
                  winning the prestigious <strong>Strategic Partnerships District Award</strong> (Rotaract Category)
                  for our excellence in delivering collaborative and sustainable community solutions.
                </p>
              </div>
            </div>
          </div>
        );

      case 'vision':
        return (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                Direction & Values
              </span>
              <h2 className="text-3xl lg:text-4xl font-display mt-3 text-secondary">
                Vision, Mission & Core Values
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-50 p-6 rounded-2xl border border-gray-100 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full transition-all duration-500 group-hover:scale-110" />
                <h3 className="text-xl font-display text-primary flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5" /> Our Mission
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed font-light">
                  To provide young people with dynamic platforms to grow as ethical, confident, and visionary leaders
                  by engaging in sustainable community service, enhancing vocational skills, and fostering
                  cross-generational fellowship.
                </p>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-gray-100 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/5 rounded-bl-full transition-all duration-500 group-hover:scale-110" />
                <h3 className="text-xl font-display text-secondary flex items-center gap-2 mb-3">
                  <Compass className="w-5 h-5" /> Our Vision
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed font-light">
                  To be the leading hub of young, inspired changemakers in East Africa, recognized for creating
                  sustainable impact, accelerating professional development, and cultivating leaders of integrity.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <h3 className="text-xl font-display text-secondary mb-4">Our Core Values</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    title: "Leadership",
                    desc: "Cultivating ethical, confident, and proactive leaders inside the club and within our careers.",
                    icon: Award,
                    color: "text-primary"
                  },
                  {
                    title: "Professional Development",
                    desc: "Sharpening real-world skills, business acumen, and networking through mentorship and workshops.",
                    icon: Briefcase,
                    color: "text-secondary"
                  },
                  {
                    title: "Service Above Self",
                    desc: "Delivering sustainable solutions to community challenges through volunteerism and corporate alliances.",
                    icon: Heart,
                    color: "text-primary"
                  },
                  {
                    title: "Fellowship",
                    desc: "Building a supportive, inclusive, and fun family of young professionals with strong lifelong bonds.",
                    icon: Smile,
                    color: "text-accent"
                  }
                ].map((val, idx) => {
                  const Icon = val.icon;
                  return (
                    <div key={idx} className="flex gap-4 p-4 rounded-xl border border-gray-100 hover:bg-slate-50 transition-all duration-200">
                      <div className={`p-2 bg-slate-100 rounded-lg shrink-0 ${val.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">{val.title}</h4>
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed font-light">{val.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 'service':
        return (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                Our Framework
              </span>
              <h2 className="text-3xl lg:text-4xl font-display mt-3 text-secondary">
                The Avenues of Service
              </h2>
              <p className="text-gray-600 mt-3 leading-relaxed font-light text-sm">
                Rotaract clubs channel their commitment to service through five fundamental Avenues of Service,
                which guide our club's activities and shape our contribution to society.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: "Club Service",
                  desc: "Focuses on strengthening fellowship and ensuring the effective, structured operation of the club. It is about relationships, active membership, and maintaining a healthy club foundation.",
                  badge: "Internal Strength"
                },
                {
                  title: "Vocational Service",
                  desc: "Encourages Rotaractors to serve others through their vocations, practice high ethical standards in their professional lives, and use their professional talents to address community issues.",
                  badge: "Professional Integrity"
                },
                {
                  title: "Community Service",
                  desc: "Covers the projects and activities the club undertakes to improve life in Kitengela. Our WASH, mental health, and education programs are primary examples of community service.",
                  badge: "Local Impact"
                },
                {
                  title: "International Service",
                  desc: "Encompasses actions taken to expand Rotary's humanitarian reach around the globe and promote world understanding and peace. We partner with international clubs like Thomasville Rotary (USA).",
                  badge: "Global Reach"
                },
                {
                  title: "Youth Service (New Generations)",
                  desc: "Recognizes the positive change implemented by youth and young professionals through leadership development activities, student exchange programs, and community service.",
                  badge: "Next-Gen Empowerment"
                }
              ].map((item, idx) => (
                <div key={idx} className="p-5 bg-slate-50 rounded-2xl border border-gray-100 hover:border-primary/20 hover:shadow-xs transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h3 className="text-lg font-display text-secondary">{item.title}</h3>
                    <span className="text-[10px] uppercase font-semibold text-primary bg-primary/5 px-2 py-0.5 rounded-md self-start sm:self-auto">
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-gray-600 text-xs mt-2 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'rotary':
        return (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                Global Network
              </span>
              <h2 className="text-3xl lg:text-4xl font-display mt-3 text-secondary">
                Rotary International
              </h2>
              <p className="text-gray-600 mt-4 leading-relaxed font-light text-base">
                Rotaract stands for <strong>Rotary in Action</strong>. Initially created as a Rotary youth program in 1968,
                Rotaract has grown into a powerful global partner. In 2020, the Rotary International Council on Legislation
                elevated Rotaract, recognizing Rotaract clubs as members of Rotary International, equal partners in service.
              </p>
              <p className="text-gray-600 mt-4 leading-relaxed font-light text-sm">
                Rotary International is a global network of <strong>1.4 million</strong> neighbors, friends, and leaders
                who unite to create lasting change. Founded in Chicago in 1905, Rotary spans virtually every country,
                tackling key areas such as peacebuilding, clean water, maternal health, education, and disease eradication (most notably, polio).
              </p>
            </div>

            <div className="border border-accent/20 bg-accent/5 p-6 rounded-2xl relative overflow-hidden">
              <div className="absolute top-4 right-4 text-accent/20 font-display text-8xl select-none leading-none">4</div>
              <h3 className="text-xl font-display text-secondary flex items-center gap-2 mb-4">
                <ShieldCheck className="w-5 h-5 text-accent" /> The Four-Way Test
              </h3>
              <p className="text-gray-600 text-xs mb-4 font-light italic">
                Of the things we think, say or do:
              </p>
              <ol className="space-y-3 relative z-10">
                {[
                  "Is it the TRUTH?",
                  "Is it FAIR to all concerned?",
                  "Will it build GOODWILL and BETTER FRIENDSHIPS?",
                  "Will it be BENEFICIAL to all concerned?"
                ].map((test, idx) => (
                  <li key={idx} className="flex gap-3 items-center text-sm font-medium text-gray-800">
                    <span className="flex items-center justify-center w-5 h-5 bg-white border border-accent/30 text-accent rounded-full text-xs font-display">
                      {idx + 1}
                    </span>
                    {test}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        );

      case 'district':
        return (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                District Structure
              </span>
              <h2 className="text-3xl lg:text-4xl font-display mt-3 text-secondary">
                Rotaract District 9216
              </h2>
              <p className="text-gray-600 mt-4 leading-relaxed font-light text-base">
                Effective <strong>July 1, 2026</strong>, following the redistricting of the former Rotary District 9212,
                the Rotaract Club of Kitengela is a proud member of the newly formed **Rotaract District 9216**.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50 p-5 rounded-2xl border border-gray-100">
                <h4 className="font-semibold text-secondary text-sm">District Coverage</h4>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed font-light">
                  District 9216 encompasses <strong>Eritrea, Ethiopia</strong>, and regions of <strong>Kenya</strong>
                  including Kajiado (our base in Kitengela), Central Highlands, Eastern region, Coast region,
                  and Eastern Nairobi.
                </p>
              </div>
              <div className="bg-slate-50 p-5 rounded-2xl border border-gray-100">
                <h4 className="font-semibold text-secondary text-sm">District Size</h4>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed font-light">
                  The new district includes <strong>78 Rotaract clubs</strong> and <strong>83 Rotary clubs</strong>,
                  fostering a robust network for cross-club partnerships, events, and community service.
                </p>
              </div>
            </div>

            <div className="bg-secondary text-white p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2">
                <span className="text-[9px] uppercase font-semibold tracking-wider bg-white/20 px-2 py-0.5 rounded-md">
                  District Highlight
                </span>
                <h4 className="text-xl font-display">Centenary DCA Mombasa</h4>
                <p className="text-xs text-white/80 font-light max-w-md leading-relaxed">
                  Our delegates joined clubs from Kenya, Ethiopia, Eritrea, and South Sudan in Mombasa for the Centenary DCA.
                  We were awarded the <strong>Strategic Partnerships District Award</strong> (Rotaract Category) for our outstanding collaborations.
                </p>
              </div>
              <span className="shrink-0 font-display text-4xl text-accent">AWARD WINNERS</span>
            </div>
          </div>
        );

      case 'history':
        return (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                Our Journey
              </span>
              <h2 className="text-3xl lg:text-4xl font-display mt-3 text-secondary">
                Club History & Milestones
              </h2>
              <p className="text-gray-600 mt-3 leading-relaxed font-light text-sm">
                Since our charter in 2018, the Rotaract Club of Kitengela has consistently delivered sustainable impact,
                leadership growth, and stellar collaborations.
              </p>
            </div>

            <div className="relative border-l-2 border-primary/20 ml-3 pl-6 space-y-8 py-2">
              {[
                {
                  year: "2018",
                  title: "Club Founding & Charter",
                  desc: "Rotaract Kitengela was officially established, bringing together young leaders in Kitengela (popularly known as the #DustySouth) who are committed to service above self.",
                  tags: ["Charter Year", "Dusty South"]
                },
                {
                  year: "2019",
                  title: "Launch of Hustle Yangu",
                  desc: "Introduced our signature professional & leadership development project, providing mentorship, seasoned professional panels, pitching opportunities, and funding for young entrepreneurs.",
                  tags: ["Professional Development", "Signature Project"]
                },
                {
                  year: "2021",
                  title: "Undugu Rescue Center Renovation",
                  desc: "Concluded the renovation of a specialized therapy room at Undugu Rescue Center using a District Grant. Provided a safe space for trauma counseling and mental health rehabilitation for vulnerable children.",
                  tags: ["District Grant", "Community Service"]
                },
                {
                  year: "2023",
                  title: "Wellness Saturdays & Substack",
                  desc: "Expanded digital reflections on mental health ('Wellness Wednesdays' on Substack) into local community self-care workshops ('Wellness Saturdays') with Actyra and Visionary Minds.",
                  tags: ["Mental Health", "Community Impact"]
                },
                {
                  year: "2025/2026",
                  title: "Olmapinu WASH Project",
                  desc: "Partnered with Rotary Kitengela, Thomasville Rotary (USA), and Light of Maasai to build a modern, fully accessible WASH ablution block (17 toilets, 5 urinals, water storage) for 400+ students at Olmapinu Comprehensive School.",
                  tags: ["Water & Sanitation", "Strategic Alliance"]
                }
              ].map((item, idx) => (
                <div key={idx} className="relative group">
                  <div className="absolute -left-[33px] top-1.5 w-4 h-4 rounded-full border-2 border-primary bg-white group-hover:bg-primary transition-colors duration-300" />
                  <div className="bg-slate-50 p-5 rounded-2xl border border-gray-100 hover:shadow-xs transition-all duration-300">
                    <span className="font-display text-xl text-primary font-bold">{item.year}</span>
                    <h4 className="font-semibold text-secondary text-sm mt-1">{item.title}</h4>
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed font-light">{item.desc}</p>
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {item.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="text-[9px] font-semibold text-secondary bg-secondary/5 px-2 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'faqs':
        return (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                Support & Info
              </span>
              <h2 className="text-3xl lg:text-4xl font-display mt-3 text-secondary">
                Frequently Asked Questions
              </h2>
            </div>

            {/* Render the original FAQs component */}
            <div className="rounded-2xl overflow-hidden border border-gray-100">
              <FAQs />
            </div>
          </div>
        );

      default:
        return null;
    }
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
      {/* Hero Section */}
      <Hero
        title={
          <>
            Learn About <span className="text-[#F7C948]">Us</span>
          </>
        }
        spanColor="#009739"
        // backgroundImage="/images/About.JPEG"
        // mobileBackgroundImage="/images/board-pic.jpg"
        // mobileOverlayImage="/images/board-pic-nobg.png"
        // overlayImage="/images/About.JPEG"
        // mobileImagePosition="object-[-950px_0px]"

      />

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 pb-20">
        {/* Desktop Layout (Tabs Sidebar + Content Column) */}
        <div className="hidden lg:grid grid-cols-[30%_70%] gap-10 items-start">
          {/* Left Navigation Sidebar */}
          <div className="sticky top-28 bg-slate-50 p-6 rounded-3xl border border-gray-100 shadow-xs space-y-6">
            <div className="pb-4 border-b border-gray-200">
              <h3 className="font-display text-2xl text-secondary">About Menu</h3>
              <p className="text-[11px] text-gray-400 font-light mt-1">Select a section to read details</p>
            </div>

            <div className="flex flex-col gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl text-left text-sm font-medium transition-all duration-300 group ${isActive
                        ? 'bg-primary text-white shadow-md shadow-primary/20 scale-102'
                        : 'text-gray-600 hover:bg-white hover:text-secondary hover:shadow-xs border border-transparent hover:border-gray-100'
                      }`}
                  >
                    <div className={`p-1.5 rounded-lg shrink-0 transition-colors duration-300 ${isActive ? 'bg-white/20 text-white' : 'bg-slate-200/50 text-gray-500 group-hover:bg-primary/10 group-hover:text-primary'
                      }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="flex-1 font-display tracking-wide">{tab.label}</span>
                    <ArrowRight className={`w-3.5 h-3.5 transition-transform duration-300 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                      }`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Content Panel */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xs min-h-[500px] flex flex-col justify-between">
            {renderTabContent(activeTab)}
          </div>
        </div>

        {/* Mobile Layout (Accordion View) */}
        <div className="lg:hidden space-y-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isOpen = activeTab === tab.id;

            return (
              <div
                key={tab.id}
                className="bg-slate-50 border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300"
              >
                {/* Accordion Trigger */}
                <button
                  onClick={() => setActiveTab(isOpen ? '' : tab.id)}
                  className={`w-full flex items-center justify-between p-5 text-left transition-colors duration-300 ${isOpen ? 'bg-primary text-white' : 'text-secondary hover:bg-slate-100/50'
                    }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-xl ${isOpen ? 'bg-white/20 text-white' : 'bg-slate-100 text-gray-600'
                      }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-display font-medium text-lg tracking-wide">{tab.label}</span>
                  </div>
                  <span className={`text-2xl font-light transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </button>

                {/* Accordion Content */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 border-t border-gray-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                >
                  <div className="overflow-hidden bg-white">
                    <div className="p-6">
                      {renderTabContent(tab.id)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}