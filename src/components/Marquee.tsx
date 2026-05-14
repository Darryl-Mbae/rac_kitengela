import React, { useState } from "react";
import { FaAsterisk } from "react-icons/fa6";

type MarqueeProps = {
    title: string;
    location: string;
    time: string;
    fee: string;
};

export default function Marquee({
    title,
    location,
    time,
    fee,
}: MarqueeProps) {
    // const [events, setEvents] = useState<Event[]>([]);


    // async function getEvents() {
    //     try {
    //         const querySnapshot = await getDocs(collection(db, "events"));
    //         const fetchedEvents = querySnapshot.docs.map((doc) => {
    //             const data = doc.data();
    //             console.log(data)
    //             return {
    //                 ...data,
    //                 id: doc.id,
    //                 // CRITICAL: Convert Firebase Timestamp to JS Date
    //                 date: data.date?.toDate ? data.date.toDate() : data.date,
    //             } as Event;
    //         });

    //         setEvents(fetchedEvents);
    //     } catch (error) {
    //         console.error("Error fetching events: ", error);
    //     }
    // }

    // useEffect(() => {
    //     getEvents();
    // }, []);


    const [paused, setPaused] = useState(false);

    const content = [
        title.toUpperCase(),
        location.toUpperCase(),
        time.toUpperCase(),
        fee.toUpperCase(),
    ];

    return (
        <>
            <style>{`
        @keyframes marquee-scroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .marquee-track {
          animation: marquee-scroll 38s linear infinite;
        }

        .marquee-paused {
          animation-play-state: paused;
        }
      `}</style>

            <div
                className="w-[110%] -ml-[5%] marquee-font relative overflow-hidden border-y border-white/10 bg-cranberry py-4 select-none mt-2"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
            >
                {/* fade edges */}
                <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-cranberry to-transparent" />
                <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-cranberry to-transparent" />

                <div
                    className={`marquee-track flex w-max items-center ${paused ? "marquee-paused" : ""
                        }`}
                >
                    {[...content, ...content, ...content, ...content, ...content].map((item, index) => (
                        <React.Fragment key={index}>
                            <div className="px-6 whitespace-nowrap text-sm md:text-[16px] tracking-[0.25em] text-white">
                                {item}
                            </div>

                            <FaAsterisk className="mx-4 text-[#9fc032] size-8 shrink-0" />
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </>
    );
}