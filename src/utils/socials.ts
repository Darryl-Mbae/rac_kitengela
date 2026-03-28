import { Instagram } from "lucide-react"
import { BsSubstack } from "react-icons/bs"
import { FaLinkedin, FaWhatsapp, FaXTwitter } from "react-icons/fa6"

export interface SocialLink {
  name: string
  icon: React.ComponentType<{ className?: string }>
  href: string
  color?: string
}

export const socialLinks: SocialLink[] = [
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://instagram.com/rotaract_kitengela",
    color: "#E4405F"
  },
  {
    name: "WhatsApp",
    icon: FaWhatsapp,
    href: "https://wa.me/254712345678",
    color: "#25D366"
  },
  {
    name: "LinkedIn",
    icon: FaLinkedin,
    href: "https://linkedin.com/company/rotaract-club-kitengela",
    color: "#0077B5"
  },
  {
    name: "Twitter/X",
    icon: FaXTwitter,
    href: "https://twitter.com/rotaractkitengela",
    color: "#000000"
  },
  {
    name: "Substack",
    icon: BsSubstack,
    href: "https://rotaractkitengela.substack.com",
    color: "#FF6719"
  }
]

// Helper function to get specific social links
export const getSocialLink = (name: string) => {
  return socialLinks.find(social => social.name.toLowerCase() === name.toLowerCase())
}

// Helper function to get social links for specific platforms
export const getFooterSocials = () => {
  return socialLinks.filter(social => 
    ['Instagram', 'WhatsApp', 'LinkedIn', 'Substack'].includes(social.name)
  )
}

export const getContactSocials = () => {
  return socialLinks.filter(social => 
    ['Instagram', 'WhatsApp', 'Twitter/X', 'Substack'].includes(social.name)
  )
}