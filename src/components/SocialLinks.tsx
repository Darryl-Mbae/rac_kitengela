import { socialLinks, type SocialLink } from '../utils/socials'

interface SocialLinksProps {
  variant?: 'default' | 'footer' | 'contact' | 'header'
  className?: string
  iconClassName?: string
  showLabels?: boolean
  filterPlatforms?: string[]
}

function SocialLinks({ 
  variant = 'default', 
  className = '', 
  iconClassName = 'w-4 h-4',
  showLabels = false,
  filterPlatforms
}: SocialLinksProps) {
  
  // Filter social links if specific platforms are requested
  const filteredSocials = filterPlatforms 
    ? socialLinks.filter(social => filterPlatforms.includes(social.name))
    : socialLinks

  const getVariantStyles = (social: SocialLink) => {
    switch (variant) {
      case 'footer':
        return "border border-default p-2 rounded-full inline-flex hover:bg-secondary/10 transition"
      case 'contact':
        return "bg-cranberry p-3 rounded-full inline-flex text-white transition hover:bg-cranberry/90"
      case 'header':
        return "p-2 rounded-full inline-flex hover:bg-gray-100 transition"
      default:
        return "p-2 rounded-full inline-flex border border-gray-300 hover:bg-gray-50 transition"
    }
  }

  return (
    <ul className={`flex gap-3 ${className}`}>
      {filteredSocials.map((social, index) => {
        const Icon = social.icon
        return (
          <li key={index}>
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={getVariantStyles(social)}
              aria-label={`Follow us on ${social.name}`}
              title={social.name}
            >
              <Icon className={iconClassName} />
              {showLabels && (
                <span className="ml-2 text-sm">{social.name}</span>
              )}
            </a>
          </li>
        )
      })}
    </ul>
  )
}

export default SocialLinks