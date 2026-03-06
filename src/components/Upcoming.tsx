import { MapPin } from "lucide-react";

type EventType = {
    title: string;
    image?: string;
    location?: string;
    time?: string;
    fee?: string
};

const events: Record<number, EventType> = {
    7: {
        title: "AI & Machine Learning Deep Dive",
        image:
            "https://images.pexels.com/photos/6231809/pexels-photo-6231809.jpeg",
    },
    14: {
        title: "Cybersecurity Essentials Workshop",
        location: "Kitengela, Kajiado",
        image:
            "https://images.pexels.com/photos/6231809/pexels-photo-6231809.jpeg",
        time: "12:00 PM",
        fee: "500",
    },
    21: {
        title: "Cloud Computing Architecture Summit",
    },
    28: {
        title: "Snap Webapp Dev Conference",
    },
};

const Upcoming = () => {
    const eventEntries = Object.entries(events).map(([day, data]) => ({
        day: Number(day),
        ...data,
    }));

    eventEntries.sort((a, b) => a.day - b.day);

    const topEvents = eventEntries.slice(0, 3);
    const bottomEvent = eventEntries[3];

    const topDays = [
        "",
        topEvents[0]?.day,
        topEvents[1]?.day,
        topEvents[2]?.day,
    ];

    const bottomDays = bottomEvent
        ? [
            bottomEvent.day - 1,
            bottomEvent.day,
            bottomEvent.day + 1,
            bottomEvent.day + 2,
        ]
        : ["", "", "", ""];

    return (
        <div className="w-full flex flex-col-reverse lg:flex-row  mb-[20vh] items-center">

            {/* CALENDAR */}
            <div className="w-[90%] mx-auto lg:w-[60%]">
                <div className="w-[95%] lg:w-[90%] aspect-[1.15/1] bg-secondary rounded-xl flex relative">
                    <div className="w-full h-full hidden lg:flex flex-col overflow-hidden items-center">
                        <div className="w-[130%] mt-[10%] h-full -rotate-3 -ml-5">

                            {/* MONTH */}
                            <div className="uppercase font-bold text-primary text-xl lg:text-2xl pl-20 lg:pl-45 pb-3">
                                FEBRUARY 2026
                                <img className="inline-block h-10 w-8 ml-4" src="images/sticker3.png" alt="" />

                            </div>

                            {/* TOP DAYS */}
                            <div className="w-full grid grid-cols-4 border border-default h-15">
                                {topDays.map((day, i) => (
                                    <div
                                        key={i}
                                        className="border-r border-default w-full h-full px-4 text-2xl font-semibold flex items-center"
                                    >
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {/* TOP EVENTS */}
                            <div className="w-full grid grid-cols-4 border-r border-l border-b border-default h-75">

                                {/* EMPTY */}
                                <div className="border-r border-default w-full h-full p-4"></div>

                                {/* IMAGE STYLE */}
                                <div className="border-r border-default w-full h-full p-4 relative">
                                    {topEvents[0] && (
                                        <>
                                            {topEvents[0].title}

                                            <div className="absolute top-1/3 -left-1/3 -rotate-2 w-full bg-tertiary p-4 aspect-[1/1.1] rounded-[5px]">
                                                <img
                                                    className="absolute w-10 -top-6 left-1/2"
                                                    src="/images/GreenPin.png"
                                                    alt=""
                                                />
                                                <div className="aspect-square overflow-hidden rounded-[4px]">
                                                    <img
                                                        className="w-full h-full object-cover"
                                                        src={topEvents[0].image}
                                                        alt=""
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* SVG STYLE */}
                                <div className="border-r border-default w-full h-full p-4 relative flex items-center justify-center">
                                    {topEvents[1] && (
                                        <>
                                            {/* <img
                                                className="bottom-10 -right-10 absolute w-20"
                                                src="/images/DND.png"
                                                alt=""
                                            /> */}

                                            <span className="absolute top-4 left-4">
                                                {topEvents[1].title}
                                            </span>

                                            <div className="absolute top-30 -right-1/3 rotate-5 w-full bg-tertiary p-4 rounded-[5px] aspect-[1/1.1]">
                                                <img
                                                    className="absolute w-10 -top-6 left-1/2"
                                                    src="/images/GreenPin.png"
                                                    alt=""
                                                />


                                                <div className="aspect-square overflow-hidden rounded-[4px]">
                                                    <img
                                                        className="w-full h-full object-cover"
                                                        src={topEvents[1].image}
                                                        alt=""
                                                    />
                                                </div>
                                            </div>

                                            {/* <div className="-mt-4">
                                                {topEvents[1].location && (
                                                    <li className="flex flex-row items-center gap-3 mb-3">
                                                        <div className="border border-default p-2 rounded-full">
                                                            <MapPin className="w-3 h-3" />
                                                        </div>
                                                        {topEvents[1].location}
                                                    </li>
                                                )}
                                                {topEvents[1].time && (
                                                    <li className="flex flex-row items-center gap-3 mb-3">
                                                        <div className="border border-default p-2 rounded-full">
                                                            <MapPin className="w-3 h-3" />
                                                        </div>
                                                        {topEvents[1].location}
                                                    </li>
                                                )}
                                                {topEvents[1].fee && (
                                                    <li className="flex flex-row items-center gap-3 mb-3">
                                                        <div className="border border-default p-2 rounded-full">
                                                            <MapPin className="w-3 h-3" />
                                                        </div>
                                                        {topEvents[1].location}
                                                    </li>
                                                )}
                                            </div> */}
                                        </>
                                    )}
                                </div>

                                {/* SIMPLE STYLE */}
                                <div className="border-r border-default w-full h-full p-4 relative">
                                    {topEvents[2]?.title}
                                </div>
                            </div>

                            {/* BOTTOM DAYS */}
                            <div className="w-full grid grid-cols-4 border border-default h-15">
                                {bottomDays.map((day, i) => (
                                    <div
                                        key={i}
                                        className="border-r border-default w-full h-full px-4 text-2xl font-semibold flex items-center"
                                    >
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
                    <div className="lg:hidden flex flex-col p-8 ">
                        <h4 className="mb-5!">
                            {topEvents[1].title}
                        </h4>
                        {topEvents[1].location && (
                            <li className="flex flex-row items-center gap-3 mb-3">
                                <div className="border border-default p-2 rounded-full">
                                    <MapPin className="w-3 h-3" />
                                </div>
                                {topEvents[1].location}
                            </li>
                        )}
                        {topEvents[1].time && (
                            <li className="flex flex-row items-center gap-3 mb-3">
                                <div className="border border-default p-2 rounded-full">
                                    <MapPin className="w-3 h-3" />
                                </div>
                                {topEvents[1].time}
                            </li>
                        )}
                        {topEvents[1].fee && (
                            <li className="flex flex-row items-center gap-3 mb-3">
                                <div className="border border-default p-2 rounded-full">
                                    <MapPin className="w-3 h-3" />
                                </div>
                                {topEvents[1].fee}
                            </li>
                        )}
                    </div>
                    <svg
                        width="138"
                        height="144"
                        viewBox="0 0 68 74"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute -top-12 -right-8 w-12 h-14 transform scale-x-[-1] -rotate-10"
                    >
                        <path fillRule="evenodd" clipRule="evenodd" d="M22.4259 68.5278C16.0259 66.7318 9.32534 65.8258 2.82534 64.9958C1.42534 64.8218 0.125535 65.7928 0.0255346 67.1608C-0.174465 68.5298 0.826121 69.7818 2.12612 69.9557C8.42612 70.7548 14.9255 71.6097 21.0255 73.3387C22.3255 73.7137 23.7261 72.9418 24.1261 71.6138C24.5261 70.2868 23.7259 68.9038 22.4259 68.5278Z" fill="#C1FF07" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M41.8251 43.0648C31.5251 32.5538 19.9251 23.3958 9.8251 12.6028C8.9251 11.5948 7.3251 11.5408 6.3251 12.4818C5.3251 13.4238 5.22549 15.0078 6.22549 16.0158C16.3255 26.8398 27.9255 36.0278 38.2255 46.5698C39.2255 47.5538 40.8251 47.5678 41.8251 46.5998C42.7251 45.6328 42.8251 44.0488 41.8251 43.0648Z" fill="#C1FF07" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M61.1264 2.63576C61.4264 8.65176 61.7259 14.6678 62.0259 20.6848C62.0259 22.0628 63.2264 23.1268 64.6264 23.0598C66.0264 22.9918 67.0259 21.8188 67.0259 20.4398C66.7259 14.4138 66.4264 8.38876 66.1264 2.36376C66.0264 0.985757 64.8262 -0.0712432 63.4262 0.00375683C62.1262 0.0787568 61.0264 1.25876 61.1264 2.63576Z" fill="#C1FF07" />
                    </svg>

                </div>
            </div>


            {/* RIGHT TEXT */}
            <div className="w-[90%] mx-auto lg:w-[40%]">
                <div className="w-[85%] py-8 lg:py-10 flex flex-col relative">
                    <h1 className="pb-6">
                        Join Us at <br />Our Next Event
                    </h1>

                    <p>
                        Be part of what’s happening next. Explore upcoming gatherings,
                        initiatives, and experiences — or take a look at past events to see
                        the impact we’ve made.
                    </p>

                    <button className="cool-button">Events</button>

                    <div className="cursor-pointer px-6 joinus-pagination-container absolute bottom-8 left-8"></div>
                </div>
            </div>
        </div>
    );
};

export default Upcoming;