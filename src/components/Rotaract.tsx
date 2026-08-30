import { ArrowRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { galleryImages } from "../utils/images";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
    },
};

const container: Variants = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.15 },
    },
};

// Change this to whatever breakpoint you consider "mobile" (matches Tailwind's md = 768px)
const MOBILE_BREAKPOINT = 768;

/**
 * Small hook that tells us whether we're currently below the mobile breakpoint.
 * This is what lets us branch into two completely separate JSX trees below,
 * instead of mixing `md:` classes into one shared tree.
 */
function useIsMobile(breakpoint: number = MOBILE_BREAKPOINT): boolean {
    const [isMobile, setIsMobile] = useState<boolean>(
        typeof window !== "undefined" ? window.innerWidth < breakpoint : false
    );

    useEffect(() => {
        const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
        const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);

        // set initial value on mount (covers SSR / hydration mismatches)
        setIsMobile(mql.matches);

        mql.addEventListener("change", handleChange);
        return () => mql.removeEventListener("change", handleChange);
    }, [breakpoint]);

    return isMobile;
}

interface UpcomingEvent {
    title: string | null;
    description: string | null;
    image?: string | null;
}

/**
 * Shared data-fetching hook used by both the mobile and desktop views.
 */
function useUpcomingEvent() {
    const [upcomingEvent, setUpcomingEvent] = useState<UpcomingEvent>({
        title: null,
        description: null,
        image: null,
    });
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUpcomingEvent = async () => {
            try {
                const docRef = doc(db, "settings", "upcomingEvent");
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    if (data.title && data.description) {
                        setUpcomingEvent({
                            title: data.title,
                            description: data.description,
                            image: data.image,
                        });
                    }
                }
            } catch (error) {
                console.error("Error fetching upcoming event:", error);
                // Falls back to default event
            } finally {
                setLoading(false);
            }
        };

        fetchUpcomingEvent();
    }, []);

    return { upcomingEvent, loading };
}

/* -------------------------------------------------------------------------- */
/*  MOBILE VIEW                                                              */
/* -------------------------------------------------------------------------- */

function RotaractMobile() {
    const { upcomingEvent, loading } = useUpcomingEvent();

    return (
        <div className="overflow-hidden max-w-screen min-h-screen py-4 flex flex-col">
            <div className="w-[90%] overflow-x-hidden overflow-hidden px-4 mx-auto py-8">
                {/* Eyebrow */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false, amount: 0.6 }}
                    transition={{ duration: 0.6 }}
                    className="mb-3 text-left text-[13px] tracking-wide font-light"
                >
                    Founded in 2018
                </motion.div>

                <div className="flex flex-col-reverse items-center gap-4">
                    {/* Text column */}
                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: false, amount: 0.4 }}
                        className="mt-10 w-full z-20"
                    >
                        <div className="mb-6 inline-flex items-center text-center mx-auto rounded-full border border-white/15 bg-primary px-5 py-2 backdrop-blur-xl">
                            <div className="mr-3 h-2 w-2 rounded-full bg-[#F7C948]" />
                            <span className="text-xs uppercase text-white">What we do</span>
                        </div>
                        <motion.div
                            variants={fadeUp}
                            className="font-light mb-5 mt-1 font-display text-4xl leading-tight text-[#16222c]"
                        >
                            We Empower The Next Generation
                        </motion.div>

                        <motion.p
                            variants={fadeUp}
                            className="mb-4 max-w-full text-sm leading-relaxed text-[#55697a]"
                        >
                            Through community outreach initiatives, environmental projects,
                            youth empowerment, professional development, and strategic
                            partnerships, we transform ideas into action and create lasting
                            impact.
                        </motion.p>

                        <motion.div variants={fadeUp}>
                            <Link
                                to="/projects"
                                className="px-1 py-1 mt-5 rounded-full text-sm inline-flex items-center gap-3 transition-transform duration-200 hover:scale-105 bg-primary"
                            >
                                <div className="w-[35px] h-[35px] flex items-center justify-center rounded-full bg-white">
                                    <ArrowRight className="-rotate-45 text-primary w-4 h-4" />
                                </div>
                                <span className="pr-6 text-white">View Projects</span>
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Image collage */}
                    <div className="mt-[-10vh] grid grid-cols-1">
                        <motion.div
                            initial={{ opacity: 0, y: 60, scale: 1.05 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: false, amount: 0.3 }}
                            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
                            className="w-[90%] h-[50vh] overflow-hidden"
                        >
                            <img
                                src="/images/service1.png"
                                alt=""
                                className="h-full w-full object-cover"
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 60, scale: 1.05 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: false, amount: 0.3 }}
                            transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                            className="mt-[-40%] h-[40vh] ml-[15%] w-[85%] overflow-hidden"
                        >
                            <img
                                src="/images/service2.jpg"
                                alt=""
                                className="h-full w-full object-cover"
                            />
                        </motion.div>
                    </div>
                </div>
            </div>

            {upcomingEvent?.title && (
                <div className="relative w-full my-20">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100">
                        <g fill="#fff">
                            <rect fill="#D41367" width="100%" height="100%" />
                            <path d="M0 0v4c136 143.8 183.8-73.2 297 26.6 72.2 63.7 97 99 184.7 33.2a30.5 30.5 0 0 1 36.6 0c87.6 65.8 112.5 30.5 184.7-33.2C816.2-69.2 864 147.7 1000 4V0H0Z"></path>
                        </g>
                    </svg>

                    <div className="-mt-1 w-full bg-primary flex">
                        <div className="my-10 flex items-center justify-center mx-auto">
                            <div className="w-full py-15 h-full flex items-center justify-center">
                                <motion.div
                                    variants={container}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: false, amount: 0.4 }}
                                    className="w-full pl-[10%]"
                                >
                                    <motion.div
                                        variants={fadeUp}
                                        className="font-display mb-3 text-sm uppercase tracking-[0.3em] text-[#F7C948]"
                                    >
                                        Upcoming Event
                                    </motion.div>
                                    <motion.div
                                        variants={fadeUp}
                                        className="font-light mb-5 mt-1 font-display text-4xl leading-tight text-white"
                                    >
                                        {loading ? "Loading..." : upcomingEvent.title}
                                    </motion.div>

                                    <motion.p
                                        variants={fadeUp}
                                        className="mb-4 w-[90%] text-sm leading-relaxed text-white/90"
                                    >
                                        {loading
                                            ? "Loading event details..."
                                            : upcomingEvent.description}
                                    </motion.p>

                                    <motion.div variants={fadeUp}>
                                        <Link
                                            to="/join"
                                            className="mt-2 px-1 py-1 rounded-full text-sm inline-flex items-center gap-3 transition-transform duration-200 hover:scale-105 bg-white"
                                        >
                                            <div className="w-[35px] h-[35px] flex items-center justify-center rounded-full bg-primary">
                                                <ArrowRight className="-rotate-45 text-white w-4 h-4" />
                                            </div>
                                            <span className="pr-6 text-black">
                                                Register Event
                                            </span>
                                        </Link>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </div>
                    </div>

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100">
                        <g fill="#D41367">
                            <rect fill="#FFF" width="100%" height="100%" />
                            <path
                                d="M0 0v99.7C62 69 122.4 48.7 205 66c83.8 17.6 160.5 20.4 240-12 54-22 110-26 173-10a392.2 392.2 0 0 0 222-5c55-17 110.3-36.9 160-27.2V0H0Z"
                                opacity="1"
                            ></path>
                            <path d="M0 0v74.7C62 44 122.4 28.7 205 46c83.8 17.6 160.5 25.4 240-7 54-22 110-21 173-5 76.5 19.4 146.5 23.3 222 0 55-17 110.3-31.9 160-22.2V0H0Z"></path>
                        </g>
                    </svg>
                </div>
            )}
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/*  DESKTOP VIEW                                                             */
/* -------------------------------------------------------------------------- */


/* -------------------------------------------------------------------------- */
/*  Individual stacking card                                                 */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*  Individual stacking card                                                 */
/* -------------------------------------------------------------------------- */

interface CardData {
    eyebrow: string;
    title: string;
    description: string;
    imageMain: string;
    imageSide: string;
    cta?: { to: string; label: string };
    bg: string;       // card background color
    badgeBg: string;  // small pill background (contrast accent)
    badgeDot: string; // dot inside the pill
}

function StackCard({
    i,
    data,
    progress,
    range,
    targetScale,
}: {
    i: number;
    data: CardData;
    progress: any; // MotionValue<number>
    range: [number, number];
    targetScale: number;
}) {
    const scale = useTransform(progress, range, [1, targetScale]);

    return (
        // sticky top offset staggers slightly per card so edges peek out
        <div className="h-screen sticky top-0 flex items-center justify-center">
            <motion.div
                style={{
                    scale,
                    top: `calc(4vh + ${i * 26}px)`,
                    backgroundColor: data.bg,
                }}
                className="relative top-[4vh] w-[92%] max-w-[1400px] h-[78vh] rounded-[2rem] shadow-[0_10px_40px_rgba(22,34,44,0.15)] px-16 py-12 grid grid-cols-[42%_58%] items-center gap-8 origin-top"
            >
                {/* Text column */}
                <div>
                    <div
                        className="mb-6 inline-flex items-center text-center mx-auto rounded-full px-5 py-2 backdrop-blur-xl"
                        style={{ backgroundColor: data.badgeBg }}
                    >
                        <div
                            className="mr-3 h-2 w-2 rounded-full"
                            style={{ backgroundColor: data.badgeDot }}
                        />
                        <span className="text-xs uppercase text-white tracking-wide">
                            {data.eyebrow}
                        </span>
                    </div>

                    <div className="font-light mb-6 mt-1 font-display text-5xl xl:text-6xl leading-tight text-white">
                        {data.title}
                    </div>

                    <p className="mb-4 w-[85%] text-base leading-relaxed text-white/85">
                        {data.description}
                    </p>

                    {data.cta && (
                        <Link
                            to={data.cta.to}
                            className="px-1 py-1 mt-6 rounded-full text-sm inline-flex items-center gap-3 transition-transform duration-200 hover:scale-105 bg-white w-fit"
                        >
                            <div
                                className="w-[35px] h-[35px] flex items-center justify-center rounded-full"
                                style={{ backgroundColor: data.bg }}
                            >
                                <ArrowRight className="-rotate-45 text-white w-4 h-4" />
                            </div>
                            <span className="pr-6 text-black">{data.cta.label}</span>
                        </Link>
                    )}
                </div>

                {/* Image collage */}
                <div className="h-[60vh] w-full grid grid-cols-[60%_40%] items-end gap-3 ml-[-5%]">
                    <div className="w-full h-full overflow-hidden relative rounded-2xl">
                        <img
                            src={data.imageMain}
                            alt=""
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    </div>
                    <div className="w-full h-[80%] overflow-hidden relative rounded-2xl">
                        <img
                            src={data.imageSide}
                            alt=""
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/*  DESKTOP VIEW — Olivier Larose-style stacking cards parallax              */
/* -------------------------------------------------------------------------- */

function RotaractDesktop() {
    const { upcomingEvent, loading } = useUpcomingEvent();
    const container = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start start", "end end"],
    });

    const panels: CardData[] = [
        {
            eyebrow: "What we do",
            title: "We Empower The Next Generation",
            description:
                "Through community outreach initiatives, environmental projects, youth empowerment, professional development, and strategic partnerships, we transform ideas into action and create lasting impact.",
            imageMain: "/images/service1.png",
            imageSide: "/images/service2.jpg",
            cta: { to: "/projects", label: "View Projects" },
            bg: "#d41367",       // Cranberry
            badgeBg: "rgba(255,255,255,0.15)",
            badgeDot: "#f7a81b",
        },
        {
            eyebrow: "Our Values",
            title: "Service Above Self",
            description:
                "Every project we run is built on fellowship, integrity, and a genuine drive to give back. We believe leadership is earned through action — not titles — and that small, consistent efforts compound into real change.",
            imageMain: galleryImages[4].src,
            imageSide: galleryImages[6].src,
            cta: { to: "/about", label: "Learn more about us" },
            bg: "#f7a81b",       // Gold
            badgeBg: "rgba(0,0,0,0.15)",
            badgeDot: "#17458f",
        },
        {
            eyebrow: "Upcoming Event",
            title: loading ? "Loading..." : upcomingEvent.title || "Stay Tuned",
            description: loading
                ? "Loading event details..."
                : upcomingEvent.description ||
                "We're finalizing details for our next event — check back soon or follow us to be the first to know.",
            imageSide: galleryImages[16].src,
            imageMain: upcomingEvent?.image ? upcomingEvent.image : galleryImages[17].src,
            cta: { to: "/join", label: "Register Event" },
            bg: "#17458f",       // Royal Blue
            badgeBg: "rgba(255,255,255,0.15)",
            badgeDot: "#f7a81b",
        },
    ];

    return (
        <div>
            {/* Eyebrow */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false, amount: 0.6 }}
                transition={{ duration: 0.6 }}
                className="text-right pr-[10%] py-6 text-[13px] tracking-wide font-light"
            >
                Founded in 2018
            </motion.div>

            {/* Scroll container — each card gets its own 100vh slot */}
            <div ref={container} className="relative">
                {panels.map((data, i) => {
                    const targetScale = 1 - (panels.length - i) * 0.05;
                    return (
                        <StackCard
                            key={i}
                            i={i}
                            data={data}
                            progress={scrollYProgress}
                            range={[i * (1 / panels.length), 1]}
                            targetScale={targetScale}
                        />
                    );
                })}
            </div>
        </div>
    );
}
/* -------------------------------------------------------------------------- */
/*  ENTRY POINT: picks mobile vs desktop                                    */
/* -------------------------------------------------------------------------- */

function Rotaract() {
    const isMobile = useIsMobile();
    return isMobile ? <RotaractMobile /> : <RotaractDesktop />;
}

export default Rotaract;