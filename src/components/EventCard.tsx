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

  const Icon: IconType = FiArrowUpRight;

  return (
    <div className="border rounded-2xl cursor-pointer border-default p-4">
      <div className="w-full aspect-[1/0.6] rounded-2xl overflow-hidden bg-secondary">
        <img src={event?.image} alt="Event Image" className="w-full h-full object-cover" />
      </div>
      <h3 className="my-3! text-lg font-bold">{event.title}</h3>
      <p className="line-clamp-2 text-sm text-gray-600">{event.description}</p>
      
      <div className="flex flex-row items-center justify-between mt-4">
        <div
          className="w-[40px] aspect-square rounded-full bg-cranberry text-white flex items-center justify-center transition"
        >
          <Icon size={18} className="text-primary" />
        </div>
        
        {/* 2. Fixed Rendering: Call the helper function here */}
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


