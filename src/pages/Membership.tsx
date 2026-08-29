import Hero from '../components/Hero';
import { Users,  Heart, Briefcase, Award, Handshake, Globe } from 'lucide-react';
import { usePageImages } from '../hooks/usePageImages';

export default function Membership() {
  // Preload all images for this page
  usePageImages([
    '/images/MEMBERSHIP.jpeg',
    '/images/MEMBERSHIP-nobg.png'
  ]);
  const benefits = [
    {
      icon: Briefcase,
      title: "Professional Development",
      description: "Access to mentorship, workshops, and networking opportunities with industry leaders.",
    },
    {
      icon: Heart,
      title: "Community Service",
      description: "Participate in meaningful projects that create lasting impact in Kitengela.",
    },
    {
      icon: Users,
      title: "Built-in Community",
      description: "Join a supportive network of 35+ young professionals and lifelong friendships.",
    },
    {
      icon: Award,
      title: "Leadership Development",
      description: "Develop leadership skills through committee work and project management.",
    },
    {
      icon: Globe,
      title: "Global Network",
      description: "Connect with Rotaract clubs across East Africa and worldwide.",
    },
    {
      icon: Handshake,
      title: "Collaborative Projects",
      description: "Work on strategic partnerships with Rotary International and other organizations.",
    },
  ];

  const eligibility = [
    {
      category: "Age",
      requirement: "18-30 years old (can extend beyond 30)",
      icon: "📅",
    },
    {
      category: "Passion for Service",
      requirement: "Commitment to 'Service Above Self' and community impact",
      icon: "❤️",
    },
    {
      category: "Professional Status",
      requirement: "Student, young professional, or entrepreneur",
      icon: "💼",
    },
    {
      category: "Location",
      requirement: "No residency requirement; we welcome all locations",
      icon: "🌍",
    },
    {
      category: "Availability",
      requirement: "Able to attend monthly meetings and participate in projects",
      icon: "⏰",
    },
    {
      category: "Attitude",
      requirement: "Open-minded, collaborative, and ready to learn",
      icon: "🤝",
    },
  ];

  const joinProcess = [
    {
      step: 1,
      title: "Express Interest",
      description: "Fill out our membership inquiry form or reach out to us via email or social media.",
      action: "Get Started",
    },
    {
      step: 2,
      title: "Meet & Greet",
      description: "Attend a casual meet-and-greet session to learn about the club and meet members.",
      action: "Schedule Meeting",
    },
    {
      step: 3,
      title: "Application",
      description: "Complete the membership application and interview process.",
      action: "Apply Now",
    },
    {
      step: 4,
      title: "Induction",
      description: "Join our induction program and become a full member of Rotaract Kitengela.",
      action: "Welcome!",
    },
  ];



  const faq = [
    {
      question: "What's the time commitment?",
      answer: "We have one monthly meeting (2-3 hours) and project participation is flexible based on your availability. Most members commit 4-6 hours per month.",
    },
    {
      question: "Can I join if I'm not from Kitengela?",
      answer: "Yes! We welcome members from anywhere. Many of our members travel from different parts of Nairobi and beyond.",
    },
    {
      question: "What are the membership dues?",
      answer: "Quarterly dues are approximately KES 2,000-3,000, with options for payment plans. This covers operational costs, events, and community projects.",
    },
    {
      question: "Do I need prior Rotary experience?",
      answer: "Not at all! We welcome new members and provide comprehensive induction and training.",
    },
    {
      question: "Can I attend meetings before joining?",
      answer: "Absolutely! We encourage prospective members to attend a meeting or two to get a feel for the club.",
    },
    {
      question: "What if I can't attend regularly?",
      answer: "We offer Associate membership for flexible participation. You can also join committees that fit your schedule.",
    },
  ];

  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <Hero
        title={
          <>
            Join Our <span className="text-[#F7C948]">Community</span>
          </>
        }
        spanColor="#901f93"
        backgroundImage="/images/board-pic-1.jpg"
        mobileBackgroundImage="/images/board-pic-1.jpg"
        mobileOverlayImage="/images/board-pic-1-nobg.png"
        overlayImage="/images/board-pic-1-nobg.png"
        mobileImagePosition="object-[-560px_0px]"

      />

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 pb-20 space-y-24">


      </div>
    </div>
  );
}
