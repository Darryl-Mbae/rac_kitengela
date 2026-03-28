import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../utils/firebase"; // Adjust path as needed
import { useNavigate } from "react-router-dom";
import { IoMdTime } from "react-icons/io";
import { HiOutlineCurrencyDollar } from "react-icons/hi2";
import { AiOutlineCalendar } from "react-icons/ai";

export type Event = {
    id?: string;
    title: string;
    description?: string;
    image?: string;
    category?: string;
    link?: string;
    date?: Date;
    location?: string;
    time?: string;
    fee?: string;
    day?: number; // We'll extract this from the date
};

const Upcoming = () => {
    const [eventList, setEventList] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUpcoming = async () => {
            try {
                // Helper function to determine which month's events to show
                const getTargetMonth = () => {
                    const now = new Date();
                    const currentDay = now.getDate();
                    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

                    // First week (days 1-7): show current month
                    // Last week (last 7 days of month): show next month
                    if (currentDay <= 7) {
                        return { month: now.getMonth(), year: now.getFullYear() };
                    } else if (currentDay > daysInMonth - 7) {
                        const nextMonth = now.getMonth() + 1;
                        const nextYear = nextMonth > 11 ? now.getFullYear() + 1 : now.getFullYear();
                        return {
                            month: nextMonth > 11 ? 0 : nextMonth,
                            year: nextYear
                        };
                    } else {
                        // Middle weeks: show current month
                        return { month: now.getMonth(), year: now.getFullYear() };
                    }
                };

                // Fetch all events first
                const q = query(collection(db, "events"), orderBy("date", "asc"));
                const querySnapshot = await getDocs(q);

                const targetMonth = getTargetMonth();

                const fetched = querySnapshot.docs
                    .map(doc => {
                        const data = doc.data();
                        const jsDate = data.date?.toDate ? data.date.toDate() : new Date();
                        return {
                            id: doc.id,
                            ...data,
                            date: jsDate,
                            day: jsDate.getDate()
                        } as Event;
                    })
                    .filter(event => {
                        // Filter by target month/year
                        const eventMonth = event.date!.getMonth();
                        const eventYear = event.date!.getFullYear();
                        return eventMonth === targetMonth.month && eventYear === targetMonth.year;
                    })
                    .slice(0, 4); // Limit to 4 events

                setEventList(fetched);
            } catch (error) {
                console.error("Error fetching upcoming events:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUpcoming();
    }, []);

    // Split events for your specific layout
    const topEvents = eventList.slice(0, 3);
    const bottomEvent = eventList[3];

    // Logic for calendar day numbers
    const topDays = [
        "",
        topEvents[0]?.day || "",
        topEvents[1]?.day || "",
        topEvents[2]?.day || "",
    ];

    const bottomDays = bottomEvent
        ? [
            bottomEvent.day! - 1,
            bottomEvent.day,
            bottomEvent.day! + 1,
            bottomEvent.day! + 2,
        ]
        : ["", "", "", ""];

    if (loading) return <div className="h-[50vh] flex items-center justify-center">Loading Calendar...</div>;

    return (
        <div className="w-full flex flex-col-reverse lg:flex-row mb-[20vh] items-center">
            {/* CALENDAR */}
            <div className="w-[90%] mx-auto lg:w-[60%]">
                <div className="w-[95%] lg:w-[90%] lg:aspect-[1.15/1] bg-secondary rounded-xl flex relative">
                    <div className="w-full h-full hidden lg:flex flex-col overflow-hidden items-center">
                        <div className="w-[130%] mt-[10%] h-full -rotate-3 -ml-5">

                            {/* MONTH - Dynamic Year/Month based on first event */}
                            <div className="uppercase font-bold text-primary text-xl lg:text-2xl pl-20 lg:pl-45 pb-3">
                                {topEvents[0]?.date?.toLocaleString('default', { month: 'long', year: 'numeric' }) || "UPCOMING"}
                                <img className="inline-block h-10 w-8 ml-4" src="images/sticker3.png" alt="" />
                            </div>

                            {/* TOP DAYS */}
                            <div className="w-full grid grid-cols-4 border border-default h-15">
                                {topDays.map((day, i) => (
                                    <div key={i} className="border-r border-default w-full h-full px-4 text-2xl font-semibold flex items-center">
                                        {day}
                                    </div>
                                ))}
                                <div className="absolute right-1/5 bottom-1/3 z-40">
                                    <img className="h-20" src="images/DND.png" alt="" />
                                </div>
                            </div>

                            {/* TOP EVENTS */}
                            <div className="w-full grid grid-cols-4 border-r border-l border-b border-default h-75">
                                <div className="border-r border-default w-full h-full p-4"></div>

                                {/* IMAGE STYLE (Event 1) */}
                                <div className="border-r border-default w-full h-full p-4 relative">
                                    {topEvents[0] && (
                                        <>
                                            {topEvents[0].title}
                                            <div className="absolute top-1/4 -left-1/3 -rotate-2 w-full bg-tertiary p-4 aspect-[1/1.1] rounded-[5px] shadow-lg">
                                                <img className="absolute w-10 -top-6 left-1/2" src="/images/GreenPin.png" alt="" />
                                                <div className="aspect-square overflow-hidden rounded-[4px]">
                                                    <img className="w-full h-full object-cover" src={topEvents[0].image} alt="" />
                                                    <img className="absolute -bottom-10 -right-10 h-20" src="images/goodVibes.png" />
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* SVG/IMAGE STYLE (Event 2) */}
                                <div className="border-r border-default w-full h-full p-4 relative flex items-center justify-center">
                                    {topEvents[1] && (
                                        <>
                                            <span className="absolute top-4 left-4 line-clamp-1">
                                                {topEvents[1].title}
                                            </span>
                                            <ul className="list-none pb-4 pt-4 text-sm">
                                                {topEvents[1].location && (
                                                    <li className="flex flex-row items-center gap-3 mb-3">
                                                        <div className="border border-default p-2 rounded-full">
                                                            <MapPin className="w-3 h-3" />
                                                        </div>
                                                        {topEvents[1].location}
                                                    </li>
                                                )}
                                                {topEvents[1].date && (
                                                    <li className="flex flex-row items-center gap-3 mb-3">
                                                        <div className="border border-default p-2 rounded-full">
                                                        <AiOutlineCalendar />

                                                        </div>
                                                        {(() => {
                                                            const date = new Date(topEvents[1].date!);
                                                            const day = date.getDate();
                                                            const suffix = day === 1 || day === 21 || day === 31 ? 'st' :
                                                                day === 2 || day === 22 ? 'nd' :
                                                                    day === 3 || day === 23 ? 'rd' : 'th';
                                                            const month = date.toLocaleString('default', { month: 'long' });
                                                            const dayName = date.toLocaleString('default', { weekday: 'long' });
                                                            return `${day}${suffix} ${month} ${dayName}`;
                                                        })()}
                                                    </li>
                                                )}
                                                {topEvents[1].time && (
                                                    <li className="flex flex-row items-center gap-3 mb-3">
                                                        <div className="border border-default p-2 rounded-full">
                                                        <IoMdTime />
                                                        </div>
                                                        {topEvents[1].time}
                                                    </li>
                                                )}
                                                {topEvents[1].fee && (
                                                    <li className="flex flex-row items-center gap-3 mb-3">
                                                        <div className="border border-default p-2 rounded-full">
                                                        <HiOutlineCurrencyDollar />
                                                        </div>
                                                        {topEvents[1].fee}
                                                    </li>
                                                )}
                                            </ul>
                                            {/* <div className="absolute top-30 left-1/5 rotate- w-full bg-tertiary p-4 rounded-[5px] aspect-[1/1.1] shadow-lg z-40">
                                                <img className="absolute w-10 -top-6 left-1/2" src="/images/GreenPin.png" alt="" />
                                                <div className="aspect-square overflow-hidden rounded-[4px]">
                                                    <img className="w-full h-full object-cover" src={topEvents[1].image} alt="" />
                                                </div>
                                            </div> */}
                                        </>
                                    )}
                                </div>

                                {/* SIMPLE STYLE (Event 3) */}
                                <div className="border-r border-default w-full h-full p-4 relative">
                                    {topEvents[2]?.title}

                                    <ul className="list-none pb-4 pt-6 text-sm">
                                        {topEvents[2].location && (
                                            <li className="flex flex-row items-center gap-3 mb-3">
                                                <div className="border border-default p-2 rounded-full">
                                                    <MapPin className="w-3 h-3" />
                                                </div>
                                                {topEvents[2].location}
                                            </li>
                                        )}
                                        {topEvents[2].date && (
                                            <li className="flex flex-row items-center gap-3 mb-3">
                                                <div className="border border-default p-2 rounded-full">
                                                <AiOutlineCalendar />

                                                </div>
                                                {(() => {
                                                    const date = new Date(topEvents[2].date!);
                                                    const day = date.getDate();
                                                    const suffix = day === 1 || day === 21 || day === 31 ? 'st' :
                                                        day === 2 || day === 22 ? 'nd' :
                                                            day === 3 || day === 23 ? 'rd' : 'th';
                                                    const month = date.toLocaleString('default', { month: 'long' });
                                                    const dayName = date.toLocaleString('default', { weekday: 'long' });
                                                    return `${day}${suffix} ${month} ${dayName}`;
                                                })()}
                                            </li>
                                        )}
                                        {topEvents[2].time && (
                                            <li className="flex flex-row items-center gap-3 mb-3">
                                                <div className="border border-default p-2 rounded-full">
                                                <IoMdTime />
                                                </div>
                                                {topEvents[2].time}
                                            </li>
                                        )}
                                        {topEvents[2].fee && (
                                            <li className="flex flex-row items-center gap-3 mb-3">
                                                <div className="border border-default p-2 rounded-full">
                                                <HiOutlineCurrencyDollar />

                                                </div>
                                                {topEvents[2].fee}
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>

                            {/* BOTTOM DAYS */}
                            <div className="w-full grid grid-cols-4 border border-default h-15">
                                {bottomDays.map((day, i) => (
                                    <div key={i} className="border-r border-default w-full h-full px-4 text-2xl font-semibold flex items-center">
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {/* BOTTOM EVENTS */}
                            <div className="w-full grid grid-cols-4 border-r border-l border-b border-default h-75">
                                <div className="border-r border-default w-full h-full p-4"></div>
                                <div className="border-r border-default w-full h-full p-4"></div>
                                <div className="border-r border-default w-full h-full p-4">
                                    {bottomEvent?.title}
                                </div>
                                <div className="border-r border-default w-full h-full p-4"></div>
                            </div>
                        </div>
                    </div>

                    {/* MOBILE VIEW */}
                    <div className="lg:hidden flex flex-col p-8">
                        {topEvents[0] && (
                            <>
                                <h4 className="mb-5! font-bold text-xl">{topEvents[0].title}</h4>
                                <ul className="list-none pb-4">
                                    {topEvents[0].location && (
                                        <li className="flex flex-row items-center gap-3 mb-3">
                                            <div className="border border-default p-2 rounded-full">
                                                <MapPin className="w-3 h-3" />
                                            </div>
                                            {topEvents[0].location}
                                        </li>
                                    )}
                                    {topEvents[0].date && (
                                        <li className="flex flex-row items-center gap-3 mb-3">
                                            <div className="border border-default p-2 rounded-full">
                                            <AiOutlineCalendar />

                                            </div>
                                            {(() => {
                                                const date = new Date(topEvents[0].date!);
                                                const day = date.getDate();
                                                const suffix = day === 1 || day === 21 || day === 31 ? 'st' :
                                                    day === 2 || day === 22 ? 'nd' :
                                                        day === 3 || day === 23 ? 'rd' : 'th';
                                                const month = date.toLocaleString('default', { month: 'long' });
                                                const dayName = date.toLocaleString('default', { weekday: 'long' });
                                                return `${day}${suffix} ${month} ${dayName}`;
                                            })()}
                                        </li>
                                    )}
                                    {topEvents[0].time && (
                                        <li className="flex flex-row items-center gap-3 mb-3">
                                            <div className="border border-default p-2 rounded-full">
                                            <IoMdTime />
                                            </div>
                                            {topEvents[0].time}
                                        </li>
                                    )}
                                    {topEvents[0].fee && (
                                        <li className="flex flex-row items-center gap-3 mb-3">
                                            <div className="border border-default p-2 rounded-full">
                                            <HiOutlineCurrencyDollar />

                                            </div>
                                            {topEvents[0].fee}
                                        </li>
                                    )}
                                </ul>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* RIGHT TEXT */}
            <div className="w-[90%] mx-auto lg:w-[40%]">
                <div className="w-full lg:w-[85%] py-8 lg:py-10 flex flex-col relative">
                    <h1 className="pb-6 text-4xl font-bold">Join Us at <br />Our Next Event</h1>
                    <p className="text-gray-600 mb-6">
                        Be part of what’s happening next. Explore upcoming gatherings,
                        initiatives, and experiences in Kitengela.
                    </p>
                    <button
                        onClick={() => navigate('/events')}
                        className="cool-button w-max">Events</button>
                </div>
            </div>
        </div>
    );
};

export default Upcoming;