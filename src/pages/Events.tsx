import EventCard, { type Event } from "../components/EventCard";
import Hero from "../components/Hero";
import SEO from "../components/SEO";
import { usePageImages } from "../hooks/usePageImages";
import { getPageSEO } from "../utils/seo";
import { useEffect, useMemo, useState } from "react";
import { HiMiniArrowDownLeft, HiMiniArrowUpRight } from "react-icons/hi2";
import { ListFilter } from 'lucide-react';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";
import { Link } from "react-router-dom";
import { galleryImages } from '../utils/images';



function Events() {
  // Preload images for this page
  usePageImages([
    '/images/IMG3.jpg',
    '/images/IMG3-nobg.png'
  ]);

  const seo = getPageSEO("events");

  const [events, setEvents] = useState<Event[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [timeFilter, setTimeFilter] = useState("All"); // New time filter
  const [currentPage, setCurrentPage] = useState(1);
  const [openCategoryDropdown, setOpenCategoryDropdown] = useState(false);
  const [openTimeDropdown, setOpenTimeDropdown] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Close all dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const filterContainer = document.querySelector('.filter-dropdowns');
      
      if (filterContainer && !filterContainer.contains(target)) {
        setOpenCategoryDropdown(false);
        setOpenTimeDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const col1 = galleryImages.filter((_, i) => i % 3 === 0);
  const col2 = galleryImages.filter((_, i) => i % 3 === 1);
  const col3 = galleryImages.filter((_, i) => i % 3 === 2);

  const perPage = 6;
  const categories = ["All", "Club Hangout", "Community Service", "Mentorship", "Club Projects"];
  const timeFilters = ["All", "Upcoming", "Past"];

  async function getEvents() {
    try {
      const querySnapshot = await getDocs(collection(db, "events"));
      const fetchedEvents = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
          // CRITICAL: Convert Firebase Timestamp to JS Date
          date: data.date?.toDate ? data.date.toDate() : data.date,
        } as Event;
      });

      setEvents(fetchedEvents);
    } catch (error) {
      console.error("Error fetching events: ", error);
    }
  }

  useEffect(() => {
    getEvents();
  }, []);

  // Filtered Logic
  const filteredEvents = useMemo(() => {
    let filtered = events.filter((event) => {
      // Search filter
      const matchesSearch = event.title?.toLowerCase().includes(search.toLowerCase()) ||
        event.description?.toLowerCase().includes(search.toLowerCase());

      if (!matchesSearch) return false;

      // Time filter
      if (timeFilter === "Upcoming") {
        const now = new Date();
        const eventDate = new Date(event.date || now);
        if (eventDate < now) return false;
      } else if (timeFilter === "Past") {
        const now = new Date();
        const eventDate = new Date(event.date || now);
        if (eventDate >= now) return false;
      }

      return true;
    });

    // Category filter
    if (category !== "All") {
      filtered = filtered.filter((event) => event.category === category);
    }

    // Sort by date (upcoming first for "Upcoming", latest first for "Past")
    filtered.sort((a, b) => {
      if (!a.date || !b.date) return 0;
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();

      if (timeFilter === "Past") {
        return dateB - dateA; // Latest first for past events
      }
      return dateA - dateB; // Earliest first for upcoming events
    });

    const start = (currentPage - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [events, search, category, timeFilter, currentPage]);

  const totalFiltered = useMemo(() => {
    return events.filter((event) => {
      // Search filter
      const matchesSearch = event.title?.toLowerCase().includes(search.toLowerCase()) ||
        event.description?.toLowerCase().includes(search.toLowerCase());

      if (!matchesSearch) return false;

      // Time filter
      if (timeFilter === "Upcoming") {
        const now = new Date();
        const eventDate = new Date(event.date || now);
        if (eventDate < now) return false;
      } else if (timeFilter === "Past") {
        const now = new Date();
        const eventDate = new Date(event.date || now);
        if (eventDate >= now) return false;
      }

      // Category filter
      const matchesCategory = category === "All" || event.category === category;

      return matchesCategory;
    }).length;
  }, [events, search, category, timeFilter]);

  const totalPages = Math.ceil(totalFiltered / perPage);

  return (
    <div className="w-full bg-white">
      {/* SEO */}
      <SEO
        title={seo.title}
        description={seo.description}
        canonical={seo.canonical}
        ogImage={seo.ogImage}
        keywords={seo.keywords}
        schema={seo.schema}
      />
      {/* Hero Section */}
      <Hero
        title={
          <>
            Events & <span className="text-[#F7C948]">Gatherings</span>
          </>
        }
        spanColor="#ff7600"
        backgroundImage="/images/events.jpg"
        overlayImage="/images/events-nnobg.png"
        mobileImagePosition="object-[42%_0px]"

      />

      <div className="w-[90%] mx-auto  py-12">
        {/* HERO SECTION (Shortened for brevity) */}
        <div className="w-full hidden mt-20 lg:grid grid-cols-2 rounded-xl bg-[#F7F7F7]">
          <div className="my-10 mx-auto w-[85%] py-10 flex flex-col relative p-10">
            <h1 className='relative -pl-4 font-light mb-5 mt-1 font-display text-4xl leading-tight text-[#16222c]'>
              <span className="relative inline-block"> M
                <svg width="38" height="44" viewBox="0 0 68 74" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute -top-5 -left-4 w-8 h-10 transform scale-x-[-1] -rotate-80" >
                  <path fillRule="evenodd" clipRule="evenodd" d="M22.4259 68.5278C16.0259 66.7318 9.32534 65.8258 2.82534 64.9958C1.42534 64.8218 0.125535 65.7928 0.0255346 67.1608C-0.174465 68.5298 0.826121 69.7818 2.12612 69.9557C8.42612 70.7548 14.9255 71.6097 21.0255 73.3387C22.3255 73.7137 23.7261 72.9418 24.1261 71.6138C24.5261 70.2868 23.7259 68.9038 22.4259 68.5278Z" fill="#D41367" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M41.8251 43.0648C31.5251 32.5538 19.9251 23.3958 9.8251 12.6028C8.9251 11.5948 7.3251 11.5408 6.3251 12.4818C5.3251 13.4238 5.22549 15.0078 6.22549 16.0158C16.3255 26.8398 27.9255 36.0278 38.2255 46.5698C39.2255 47.5538 40.8251 47.5678 41.8251 46.5998C42.7251 45.6328 42.8251 44.0488 41.8251 43.0648Z" fill="#D41367" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M61.1264 2.63576C61.4264 8.65176 61.7259 14.6678 62.0259 20.6848C62.0259 22.0628 63.2264 23.1268 64.6264 23.0598C66.0264 22.9918 67.0259 21.8188 67.0259 20.4398C66.7259 14.4138 66.4264 8.38876 66.1264 2.36376C66.0264 0.985757 64.8262 -0.0712432 63.4262 0.00375683C62.1262 0.0787568 61.0264 1.25876 61.1264 2.63576Z" fill="#D41367" />
                </svg>
              </span>ake Memories <br /> That Matter
            </h1> <p> Rotaract is more than meetings and projects, it's a community of young leaders building lifelong friendships while creating real impact.
            </p>
            <Link to={"/join"}>
              <button className="cool-button mt-6">Join Us</button>
            </Link>
          </div> {/* image grid */}
          <div className="w-full grid grid-cols-3 h-120 overflow-hidden gap-2">
            {/* Column 1 */}
            <div className="flex flex-col gap-2 -mt-10">
              {col1.map((img, idx) => (
                <img
                  key={idx}
                  src={img.src}
                  className="aspect-square object-cover w-full rounded-lg"
                  alt={img.alt}
                />
              ))}
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-2 -mt-20">
              {col2.map((img, idx) => (
                <img
                  key={idx}
                  src={img.src}
                  className="aspect-square object-cover w-full rounded-lg"
                  alt={img.alt}
                />
              ))}
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-2">
              {col3.map((img, idx) => (
                <img
                  key={idx}
                  src={img.src}
                  className="aspect-square object-cover w-full rounded-lg"
                  alt={img.alt}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-[90%] container mx-auto py-12">
        <div className=" mx-auto lg:w-full grid mb-5 grid-cols-1 lg:grid-cols-2 lg:py-5">
           <h1 className='relative -pl-4 font-light mt-1 font-display text-5xl leading-tight text-[#16222c]'>
              <span className="relative inline-block">O
                <svg width="38" height="44" viewBox="0 0 68 74" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute -top-5 -left-4 w-8 h-10 transform scale-x-[-1] -rotate-80" >
                  <path fillRule="evenodd" clipRule="evenodd" d="M22.4259 68.5278C16.0259 66.7318 9.32534 65.8258 2.82534 64.9958C1.42534 64.8218 0.125535 65.7928 0.0255346 67.1608C-0.174465 68.5298 0.826121 69.7818 2.12612 69.9557C8.42612 70.7548 14.9255 71.6097 21.0255 73.3387C22.3255 73.7137 23.7261 72.9418 24.1261 71.6138C24.5261 70.2868 23.7259 68.9038 22.4259 68.5278Z" fill="#D41367" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M41.8251 43.0648C31.5251 32.5538 19.9251 23.3958 9.8251 12.6028C8.9251 11.5948 7.3251 11.5408 6.3251 12.4818C5.3251 13.4238 5.22549 15.0078 6.22549 16.0158C16.3255 26.8398 27.9255 36.0278 38.2255 46.5698C39.2255 47.5538 40.8251 47.5678 41.8251 46.5998C42.7251 45.6328 42.8251 44.0488 41.8251 43.0648Z" fill="#D41367" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M61.1264 2.63576C61.4264 8.65176 61.7259 14.6678 62.0259 20.6848C62.0259 22.0628 63.2264 23.1268 64.6264 23.0598C66.0264 22.9918 67.0259 21.8188 67.0259 20.4398C66.7259 14.4138 66.4264 8.38876 66.1264 2.36376C66.0264 0.985757 64.8262 -0.0712432 63.4262 0.00375683C62.1262 0.0787568 61.0264 1.25876 61.1264 2.63576Z" fill="#D41367" />
                </svg>
              </span>ur Events
            </h1> 
          <p className="pt-8 lg:pt-0 mb-4 max-w-full text-sm leading-relaxed text-[#55697a]"> Throughout the year we organize community service initiatives, mentorship sessions, networking events and social gatherings. </p>
        </div>

        <div className="flex flex-row gap-2 lg:gap-4 items-center justify-between mb-10">
          <input
            type="text"
            placeholder="Search events..."
            className="bg-[#F7F7F7] rounded-full pl-6 px-4 py-4 w-[85%] lg:w-1/2 border-0 outline-none focus:outline-none focus:ring-0"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />

          {/* Desktop Filters */}
          <div className="hidden lg:flex gap-4 w-full lg:w-auto filter-dropdowns">
            <div className="relative w-full lg:w-40">
              <button
                onClick={() => {
                  setOpenTimeDropdown(!openTimeDropdown);
                  setOpenCategoryDropdown(false);
                }}
                className="w-full flex items-center justify-between bg-[#F7F7F7] rounded-full px-6 py-4"
              >
                <span>{timeFilter}</span>
                <HiMiniArrowDownLeft className={`transition ${openTimeDropdown ? "rotate-180" : ""}`} />
              </button>

              {openTimeDropdown && (
                <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-2xl shadow-lg z-20 overflow-hidden">
                  {timeFilters.map((filter) => (
                    <div
                      key={filter}
                      className="px-6 py-3 cursor-pointer hover:bg-gray-100 text-gray-900"
                      onClick={() => {
                        setTimeFilter(filter);
                        setCurrentPage(1);
                        setOpenTimeDropdown(false);
                      }}
                    >
                      {filter}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative w-full lg:w-60">
              <button
                onClick={() => {
                  setOpenCategoryDropdown(!openCategoryDropdown);
                  setOpenTimeDropdown(false);
                }}
                className="w-full flex items-center justify-between bg-[#F7F7F7] rounded-full px-6 py-4"
              >
                <span>{category}</span>
                <HiMiniArrowDownLeft className={`transition ${openCategoryDropdown ? "rotate-180" : ""}`} />
              </button>

              {openCategoryDropdown && (
                <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-2xl shadow-lg z-20 overflow-hidden">
                  {categories.map((cat) => (
                    <div
                      key={cat}
                      className="px-6 py-3 cursor-pointer hover:bg-gray-100 text-gray-900"
                      onClick={() => {
                        setCategory(cat);
                        setCurrentPage(1);
                        setOpenCategoryDropdown(false);
                      }}
                    >
                      {cat}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Filter Button */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white hover:scale-110 transition"
          >
            <ListFilter size={20} />
          </button>
        </div>

        {/* Mobile Filter Modal */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 lg:hidden" onClick={() => setMobileFilterOpen(false)}>
            <div 
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-display font-medium">Filters</h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              {/* Time Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Time</h4>
                <div className="space-y-2">
                  {timeFilters.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => {
                        setTimeFilter(filter);
                        setCurrentPage(1);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg transition ${
                        timeFilter === filter
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Category</h4>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setCategory(cat);
                        setCurrentPage(1);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg transition ${
                        category === cat
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full bg-primary text-white py-3 rounded-lg font-medium mt-4"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}

        {filteredEvents.length > 0 ? (
          <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">No events found matching your criteria.</div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-6 mt-12">
            <button
              disabled={currentPage === 1}
              className="p-3 bg-[#F7F7F7] rounded-full disabled:opacity-30"
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              <HiMiniArrowDownLeft />
            </button>
            <span>{Math.min(currentPage * perPage, totalFiltered)} of {totalFiltered}</span>
            <button
              disabled={currentPage === totalPages}
              className="p-3 bg-[#F7F7F7] rounded-full disabled:opacity-30"
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              <HiMiniArrowUpRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Events;