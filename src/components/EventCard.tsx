import { FaInstagram} from "react-icons/fa6"
import type { IconType } from "react-icons"
import { TiSocialLinkedin } from "react-icons/ti"
import { FiArrowUpRight } from "react-icons/fi"

export interface Event {
  id: number
  description: string
  image: string
  social: string
  title: string
  category?: string
  link?: string
  date?: string
}

interface EventCardProps {
  event: Event
}

type SocialPlatform = "instagram" | "linkedin"

const socialIcons: Record<SocialPlatform, IconType> = {
  instagram: FaInstagram,
  linkedin: TiSocialLinkedin,
}

const EventCard = ({ event }: EventCardProps) => {
  const formatDate = (
    dateStr: string,
    locale: string = 'en-US',
    options?: Intl.DateTimeFormatOptions
  ): string => {
    if (!dateStr) return '';
  
    const date = new Date(dateStr);
  
    // Default options if none provided
    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
  
    return date.toLocaleDateString(locale, options || defaultOptions);
  };

  const Icon: IconType =
    (socialIcons[event.social as SocialPlatform] as IconType) || FiArrowUpRight

  return (
    <div className="border rounded-2xl cursor-pointer border-default p-4">
     <div className="w-full aspect-[1/0.6] rounded-2xl overflow-hidden bg-secondary">
        <img src={event?.image} alt="Event Image" className="w-full h-full object-cover" />
      </div>
      <h3 className="my-3!">{event.title}</h3>
      <p className="line-clamp-2">{event.description}</p>
      <div className="flex flex-row items-center justify-between">
      <div
        className="my-4 w-[40px] aspect-square rounded-full bg-cranberry text-white flex items-center justify-center transition"
      >
        <Icon size={18} className="text-primary" />
      </div>
      {event.date && <p className="">{formatDate(event.date)}</p>}
      </div>
    
    </div>
  )
}

export default EventCard