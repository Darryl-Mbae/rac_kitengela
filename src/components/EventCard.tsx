import type { IconType } from "react-icons";
import { FiArrowUpRight } from "react-icons/fi";

export interface Event {
  id?: string;
  title: string;
  description?: string;
  image?: string;
  category?: string;
  link?: string;
  date?: any; // Keep as any or Date to handle Firebase Timestamps/JS Dates
  location?: string;
  time?: string;
  fee?: string;
  registrationLink?: string;
  driveLink?: string;
}

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  // Helper to safely format Date objects or Firebase Timestamps
  const formatDate = (dateInput: any): string => {
    if (!dateInput) return "Date TBD";

    // If it's a Firebase Timestamp, convert it. Otherwise, use as is.
    const date = dateInput.toDate ? dateInput.toDate() : new Date(dateInput);

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Check if event has passed
  const hasEventPassed = (): boolean => {
    if (!event.date) return false;
    const date = event.date.toDate ? event.date.toDate() : new Date(event.date);
    return date < new Date();
  };

  // Determine which link to show
  const getActionLink = (): { url: string; label: string } | null => {
    const isPast = hasEventPassed();
    
    if (isPast && event.driveLink) {
      return { url: event.driveLink, label: "View Photos" };
    }
    
    if (!isPast && event.registrationLink) {
      return { url: event.registrationLink, label: "Register" };
    }
    
    return null;
  };

  const actionLink = getActionLink();
  const Icon: IconType = FiArrowUpRight;

  return (
    <div 
      className="border rounded-2xl cursor-pointer border-gray-200 p-4 transition-all hover:-translate-y-1  ease-in-out duration-200"
    >
      <div className="w-full aspect-[1/0.6] rounded-2xl overflow-hidden bg-[#f7f7f7]">
        <img src={event?.image} alt="Event Image" className="w-full h-full object-cover" />
      </div>
      <h3 className="my-3! text-lg font-medium font-display">{event.title}</h3>
      <p className="line-clamp-2 text-sm text-gray-600">{event.description}</p>

      <div className="flex flex-row items-center justify-between mt-4">
        {/* Show action button only if there's a link */}
        {actionLink ? (
          <a
            href={actionLink.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-[40px] aspect-square rounded-full bg-primary text-white flex items-center justify-center transition hover:scale-110"
          >
            <Icon size={18} />
          </a>
        ) : (
          <div className="w-[40px] aspect-square" />
        )}

        {/* Show date */}
        {event.date && (
          <p className="text-sm font-medium">
            {formatDate(event.date)}
          </p>
        )}
      </div>
    </div>
  );
};

export default EventCard;

