import { Mail, PartyPopper, ChevronDown, Users, Award, History, UserCircle, FolderKanban, Leaf, Handshake, CheckCircle2,Scale, Megaphone, BrainCircuit, Landmark, Droplets, HeartPulse, Smile, ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';


const Logo = ({ isWhite }: { isWhite: boolean }) => (
    <div className="flex items-center -ml-2 lg:-ml-4">
        <img src="/images/logo-wheel.png" alt="Rotaract club of Kitengela Logo" className={`md:hidden h-12 transition-opacity duration-300 ${isWhite ? '' : 'brightness-0 invert'}`} />
        {/* <img src="/images/logo.png" alt="Rotaract club of Kitengela Logo" className="hidden md:inline-flex h-16" /> */}
    </div>
);

// Leadership has a normal column + a wide "committees" column (2x3 internal grid, 6 items)
// Other dropdowns keep the standard 3-column / max-3-rows layout
const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    {
        name: 'Leadership',
        href: '/leadership',
        dropdown: {
            media: {
                // video: '/videos/board-video.mp4',
                image: '/images/board-thumbnail.png',
                title: 'Meet the Board',
                description: 'Get to know the team leading the club this Rotary year.',
                href: '/leadership',
            },
            columns: [
                {
                    title: 'Team',
                    items: [
                        { name: 'Board of Directors', description: 'The current board leading the club.', icon: Award, href: '/leadership#executive' },
                        { name: 'Past Presidents', description: 'Those who led before us.', icon: History, href: '/leadership#past-presidents' },
                        { name: 'Members', description: 'Meet the people behind the club.', icon: UserCircle, href: '/leadership#members' },
                    ],
                },
                {
                    title: 'Committees',
                    wide: true, // renders as a 2-col x 3-row grid, spanning 2 grid columns
                    items: [
                        { name: 'Community Service', description: 'Local service project planning.', icon: Handshake, href: '/leadership#committee-community' },
                        { name: 'Membership', description: 'Growing and retaining our members.', icon: Users, href: '/leadership#committee-membership' },
                        { name: 'PR & Communications', description: 'Our voice online and offline.', icon: Megaphone, href: '/leadership#committee-pr' },
                        { name: 'PLD', description: 'Professional & Leadership Development.', icon: BrainCircuit, href: '/leadership#committee-pld' },
                        { name: 'TRF', description: 'Advancing The Rotary Foundation goals.', icon: Landmark, href: '/leadership#committee-trf' },
                        { name: 'Ethics & Governance', description: 'Ensuring accountability and standards.', icon: Scale, href: '/leadership#committee-ethics' },
                    ],
                },
            ],
        },
    },
    {
        name: 'Projects',
        href: '/projects',
        dropdown: {
            media: {
                image: '/images/projects-thumbnails.png',
                title: 'See Our Impact',
                description: 'A look at the projects making a difference.',
                href: '/projects',
            },
            columns: [
                {
                    title: 'Signature Projects',
                    items: [
                        { name: 'Olmapinu Project', description: 'Modern WASH ablution block for 400+ students.', icon: Droplets, href: '/projects#olmapinu' },
                        { name: 'Undugu Rescue Center', description: 'Renovated therapy room for mental health support.', icon: HeartPulse, href: '/projects#undugu' },
                        { name: 'Wellness Programs', description: 'Mental health and holistic self-care initiatives.', icon: Smile, href: '/projects#wellness' },
                    ],
                },
                {
                    title: 'Service Areas',
                    items: [
                        { name: 'Community Service', description: 'Ongoing service initiatives across Kitengela.', icon: FolderKanban, href: '/projects#community' },
                        { name: 'Professional Development', description: 'Building skills within the club.', icon: Award, href: '/projects#professional' },
                        { name: 'Club Service', description: 'Projects that strengthen our club.', icon: Handshake, href: '/projects#club-service' },
                    ],
                },
                {
                    title: 'Focus',
                    items: [
                        { name: 'Environmental Projects', description: 'Sustainability initiatives we champion.', icon: Leaf, href: '/projects#environmental' },
                        { name: 'Collaborations', description: 'Partner clubs and joint projects.', icon: Handshake, href: '/projects#collaborations' },
                        { name: 'All Projects', description: 'See everything we’ve delivered.', icon: CheckCircle2, href: '/projects#completed' },
                    ],
                },
            ],
        },
    },
    { name: 'Events', href: '/events' },
    // { name: 'Gallery', href: '/gallery' },
    { name: 'Membership', href: '/membership' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [mobileOpen, setMobileOpen] = useState<Record<string, boolean>>({});
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Measure the visible bar's height so the mega menu can extend a matching
    // amount of white background up behind it (rather than the bar itself
    // needing to switch to a white bg when a dropdown opens).
    const barRef = useRef<HTMLDivElement>(null);
    const [barHeight, setBarHeight] = useState(0);

    useEffect(() => {
        const el = barRef.current;
        if (!el) return;
        const measure = () => setBarHeight(el.offsetHeight);
        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    // Pages that render a transparent hero. Add more paths as needed.
    const heroPages = ['/', '/about', '/leadership', '/projects', '/events', '/membership'];
    const hasHero = heroPages.includes(location.pathname);

    useEffect(() => {
        if (!hasHero) {
            setScrolled(true); // non-hero pages are always in "white" state
            return;
        }
        setScrolled(false); // reset transparency when we land on a hero page

        const threshold = window.innerHeight * 0.85; // tweak vs your 103vh hero
        const handleScroll = () => {
            setScrolled(window.scrollY > threshold);
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasHero, location.pathname]);

    // Two separate concerns:
    // - isBgWhite: does the bar itself need a solid bg? Only true once actually
    //   scrolled (or mobile menu open) — never flips just because a dropdown
    //   opened, since the dropdown panel supplies its own white behind the bar.
    // - isTextDark: should the bar's text/icons render dark? True whenever
    //   there's a white surface behind them — that's isBgWhite OR a dropdown
    //   being open (since the panel's white sits behind the bar in that case).
    const isBgWhite = !hasHero || scrolled || isOpen;
    const isTextDark = isBgWhite || !!openDropdown;
    // Kept as `isWhite` below so the rest of the markup doesn't need renaming —
    // it now represents "should things look like the white state" for text/icons.
    const isWhite = isTextDark;

    const openMenu = (name: string) => {
        if (closeTimeout.current) {
            clearTimeout(closeTimeout.current);
            closeTimeout.current = null;
        }
        setOpenDropdown(name);
    };

    const scheduleClose = () => {
        closeTimeout.current = setTimeout(() => {
            setOpenDropdown(null);
        }, 150);
    };

    const toggleMobile = (name: string) => {
        setMobileOpen((prev) => ({ ...prev, [name]: !prev[name] }));
    };

    return (
        <nav
            className={`sticky top-0 z-50 relative transition-colors duration-300 ${isBgWhite ? 'bg-white shadow-sm' : 'bg-gradient-to-b from-black/60 via-black/30 to-transparent max-w-screen overflow-hidden'
                }`}
        >
            <div ref={barRef} className="relative z-50 w-[90%] mx-auto">
                <div className="flex justify-between items-center py-5">
                    <Logo isWhite={isWhite} />
                    <div className='flex flex-row gap-15 items-center'>
                        {/* Desktop Nav */}
                        <div className="hidden md:flex space-x-8">
                            {navLinks.map((link) => {
                                const isActive = location.pathname === link.href;
                                const hasDropdown = !!link.dropdown;

                                return (
                                    <div
                                        key={link.name}
                                        className="relative"
                                        onMouseEnter={() => hasDropdown && openMenu(link.name)}
                                        onMouseLeave={() => hasDropdown && scheduleClose()}
                                    >
                                        <Link
                                            to={link.href}
                                            onClick={() => setOpenDropdown(null)}
                                            className={`font-light group text-sm relative flex items-center gap-1 py-2 transition-colors duration-300 ${isActive
                                                ? isWhite ? 'text-black' : 'text-white'
                                                : isWhite ? 'text-gray-600 hover:text-black' : 'text-white/90  hover:text-white'
                                                }`}
                                        >
                                            {link.name}
                                            {hasDropdown && (
                                                <ChevronDown
                                                    size={14}
                                                    className={`transition-transform duration-300 ${openDropdown === link.name ? 'rotate-180' : ''}`}
                                                />
                                            )}
                                            <span
                                                className={`absolute -bottom-1 left-0 w-full h-0.5 bg-primary origin-left transition-transform duration-300 ease-out ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                                                    }`}
                                            />
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Right side */}
                        <div className="hidden md:flex items-center space-x-4">
                            <a
                                href="https://mail.google.com/mail/?view=cm&to=rotaractkitengela@gmail.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Send us an email"
                                className={`cursor-pointer flex items-center justify-center w-8 h-8 rounded-full border transition-colors duration-300 hover:scale-110 ${isWhite ? 'border-black text-black' : 'border-white text-white'
                                }`}>
                                <Mail size={14} />
                            </a>
                            <Link
                                to="/join"
                                className={`px-1 py-1 rounded-full text-sm flex items-center gap-3 transition-transform duration-200 hover:scale-105 ${isWhite ? 'bg-primary' : 'bg-white'
                                    }`}
                            >
                                <div className={`w-[35px] h-[35px] flex items-center justify-center rounded-full ${isWhite ? 'bg-white' : 'bg-primary'}`}>
                                    <ArrowRight className={`-rotate-45 ${isWhite ? 'text-primary' : 'text-white'} w-4 h-4`} />
                                </div>
                                <span className={`pr-6 ${isWhite ? 'text-white' : 'text-black'}`}>Get Involved</span>
                            </Link>
                        </div>

                        {/* Mobile Toggle */}
                        <div className='md:hidden! important flex flex-row items-center gap-1'>
                            <a
                                href="https://mail.google.com/mail/?view=cm&to=rotaractkitengela@gmail.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Send us an email"
                                className={`cursor-pointer flex items-center justify-center w-8 h-8 rounded-full border transition-colors duration-300 hover:scale-110 ${isWhite ? 'border-black text-black' : 'border-white text-white'
                                }`}>
                                <Mail size={14} />
                            </a>
                            <button
                                onClick={() => setIsOpen(prev => !prev)}
                                className={`hamburger hamburger--spin ${isOpen ? 'is-active' : ''} ${isWhite ? '' : 'is-black'}`}
                                type="button"
                            >
                                <span className="hamburger-box">
                                    <span className="hamburger-inner"></span>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Full-width Mega Menu (Desktop). Instead of starting below the bar and
                relying on the bar switching to a white background, this panel starts
                at top-0 (i.e. behind the bar itself) and pads its content down by the
                bar's own height. That extra white area sits directly behind the bar,
                so — since the bar row above is z-50 and this panel is z-40 — the bar's
                text/logo render on top of solid white without the bar ever needing to
                change its own bg classes. */}
            {navLinks.filter((l) => l.dropdown).map((link) => (
                <div
                    key={link.name}
                    onMouseEnter={() => openMenu(link.name)}
                    onMouseLeave={() => scheduleClose()}
                    style={{ paddingTop: barHeight }}
                    className={`z-40 pb-8 absolute left-0 top-0 w-full bg-white shadow-lg transition-all duration-300 ease-out origin-top ${openDropdown === link.name
                        ? 'opacity-100 visible translate-y-0 scale-y-100'
                        : 'opacity-0 invisible -translate-y-4 scale-y-95 pointer-events-none'
                        }`}
                >
                    <div className="w-[90%] mx-auto py-10 flex gap-10">
                        {/* Always 3 grid columns total; a "wide" column spans 2 of them */}
                        <div className="grid grid-cols-3 gap-8 flex-1">
                            {link.dropdown!.columns.map((col) => (
                                <div key={col.title} className={col.wide ? 'col-span-2' : ''}>
                                    <p className="text-xs font-semibold tracking-wide text-gray-400 uppercase mb-4">{col.title}</p>

                                    {col.wide ? (
                                        // Wide column: its own 2-col x 3-row internal grid
                                        <div className="grid grid-cols-2 gap-x-4 gap-y-5">
                                            {col.items.map((item) => {
                                                const Icon = item.icon;
                                                return (
                                                    <Link
                                                        key={item.name}
                                                        to={item.href}
                                                        onClick={() => setOpenDropdown(null)}
                                                        className="group/item flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                                                    >
                                                        <div className="flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200 shrink-0 transition-colors duration-200">
                                                            <Icon size={16} className="text-gray-700 group-hover/item:text-primary transition-colors duration-200" />
                                                        </div>
                                                        <div>
                                                            <p className="text-xs  text-gray-900">{item.name}</p>
                                                            <p className="text-xs font-light text-gray-500 mt-0.5 leading-snug">{item.description}</p>
                                                        </div>
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <div className="flex flex-col gap-5">
                                            {col.items.map((item) => {
                                                const Icon = item.icon;
                                                return (
                                                    <Link
                                                        key={item.name}
                                                        to={item.href}
                                                        onClick={() => setOpenDropdown(null)}
                                                        className="group/item flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                                                    >
                                                        <div className="flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200 shrink-0 transition-colors duration-200 ">
                                                            <Icon size={16} className="text-gray-700 group-hover/item:text-primary transition-colors duration-200" />
                                                        </div>
                                                        <div>
                                                            <p className="text-xs  text-gray-900">{item.name}</p>
                                                            <p className="text-xs font-light text-gray-500 mt-0.5 leading-snug">{item.description}</p>
                                                        </div>
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Video / image card on the right */}
                        {link.dropdown?.media && (
                            <Link
                                to={link.dropdown!.media.href}
                                onClick={() => setOpenDropdown(null)}
                                className="group/media relative w-72 shrink-0 rounded-2xl overflow-hidden bg-gray-900"
                            >
                                <img
                                    src={link.dropdown!.media.image}
                                    alt={link.dropdown!.media.title}
                                    className="absolute inset-0 w-full h-full object-cover opacity-70 transition-transform duration-500 group-hover/media:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                                <div className="absolute inset-0 flex items-center justify-center">
                                    {/* {link.dropdown!.media.video &&
                                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center transition-transform duration-300 group-hover/media:scale-110">
                                        <Play size={18} className="text-gray-900 ml-0.5" fill="currentColor" />
                                    </div>
                                } */}
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                    <p className="text-white text-sm font-semibold">{link.dropdown!.media.title}</p>
                                    <p className="text-white/70 text-xs mt-1 leading-snug">{link.dropdown!.media.description}</p>
                                </div>
                            </Link>
                        )}
                    </div>
                </div>
            ))}

            {/* Slide-in Mobile Menu */}
            <div
                className={`fixed top-22 inset-0 bg-white transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:hidden z-50 flex flex-col`}
            >

                <div className="flex flex-col overflow-y-auto flex-1 px-6 py-4 border-t border-gray-100">
                    {navLinks.map((link) => {
                        const isActive = location.pathname === link.href;
                        const hasDropdown = !!link.dropdown;
                        const expanded = !!mobileOpen[link.name];

                        return (
                            <div key={link.name} >
                                <div className="flex items-center justify-between py-4">
                                    <Link
                                        to={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`text-sm ${isActive ? 'text-primary' : 'text-gray-900'}`}
                                    >
                                        {link.name}
                                    </Link>
                                    {hasDropdown && (
                                        <button
                                            onClick={() => toggleMobile(link.name)}
                                            aria-label={`Toggle ${link.name} submenu`}
                                        >
                                            <ChevronDown
                                                size={18}
                                                className={`transition-transform duration-300 ${expanded ? 'rotate-180 text-primary' : 'text-gray-500'}`}
                                            />
                                        </button>
                                    )}
                                </div>

                                {hasDropdown && (
                                    <div
                                        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                                        style={{ gridTemplateRows: expanded ? '1fr' : '0fr' }}
                                    >
                                        <div className="overflow-hidden">
                                            <div className="flex flex-col gap-5 pb-5">
                                                {/* Media card first on mobile */}
                                                {/* <Link
                                                    to={link.dropdown!.media.href}
                                                    onClick={() => setIsOpen(false)}
                                                    className="relative w-full h-32 rounded-xl overflow-hidden bg-gray-900"
                                                >
                                                    <img
                                                        src={link.dropdown!.media.image}
                                                        alt={link.dropdown!.media.title}
                                                        className="absolute inset-0 w-full h-full object-cover opacity-70"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                                                            <Play size={14} className="text-gray-900 ml-0.5" fill="currentColor" />
                                                        </div>
                                                    </div>
                                                    <p className="absolute bottom-2 left-3 text-white text-sm font-semibold">{link.dropdown!.media.title}</p>
                                                </Link> */}

                                                {link.dropdown!.columns.map((col) => (
                                                    <div key={col.title}>
                                                        <p className="text-xs font-semibold tracking-wide text-gray-400 uppercase mb-2">{col.title}</p>
                                                        <div className={col.wide ? 'grid grid-cols-1 gap-y-5 gap-x-3' : 'flex flex-col gap-5'}>
                                                            {col.items.map((item) => {
                                                                const Icon = item.icon;
                                                                return (
                                                                    <Link
                                                                        key={item.name}
                                                                        to={item.href}
                                                                        onClick={() => setIsOpen(false)}
                                                                        className="flex items-start gap-3 py-2"
                                                                    >
                                                                        <div className="flex items-center justify-center w-8 h-8 rounded-lg border border-gray-200 shrink-0 mt-0.5">
                                                                            <Icon size={14} className="text-gray-700" />
                                                                        </div>
                                                                        <div>
                                                                            <p className="text-sm font-medium text-gray-900">{item.name}</p>
                                                                            <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                                                                        </div>
                                                                    </Link>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    <Link
                        to="/join"
                        onClick={() => setIsOpen(false)}
                        className="mt-6 bg-primary text-white px-5 py-3 rounded-[10px] text-sm flex items-center justify-center gap-2"
                    >
                        <PartyPopper size={14} />Join Us
                    </Link>
                </div>
            </div>
        </nav>
    );
}