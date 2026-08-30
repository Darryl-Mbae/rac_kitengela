import Hero from "../components/Hero";
import SEO from "../components/SEO";
import { Link, useLocation } from "react-router-dom";
import { ListFilter } from 'lucide-react';
import { usePageImages } from "../hooks/usePageImages";
import { getPageSEO } from "../utils/seo";
import { HiMiniArrowDownLeft, HiMiniArrowUpRight } from "react-icons/hi2";
import { galleryImages } from "../utils/images";
import { useEffect, useMemo, useState } from "react";

import ProjectCard, { type Project } from "../components/ProjectCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";
import SignatureProjectsList from "../components/SignatureProjectsList";



export default function Projects() {

  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [serviceArea, setServiceArea] = useState("All");
  const [focusArea, setFocusArea] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [openStatusDropdown, setOpenStatusDropdown] = useState(false);
  const [openServiceDropdown, setOpenServiceDropdown] = useState(false);
  const [openFocusDropdown, setOpenFocusDropdown] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const location = useLocation();
  const seo = getPageSEO("projects");

  // Hashes coming from the "Service Areas" and "Focus" navbar columns map
  // to filter values; hashes coming from "Signature Projects" map to a
  // row inside SignatureProjectsList and just need a scroll.
  const hashFilterMap: Record<string, { type: "service" | "focus"; value: string }> = {
    community: { type: "service", value: "Community Service" },
    professional: { type: "service", value: "Professional Development" },
    "club-service": { type: "service", value: "Club Service" },
    environmental: { type: "focus", value: "Environmental Projects" },
    collaborations: { type: "focus", value: "Collaborations" },
    completed: { type: "focus", value: "All Projects" },
  };

  const R2_BASE_URL = 'https://pub-0baf207efd9849978a4a545739b5d61c.r2.dev';


  const signatureProjects = [
    {
      id: "olmapinu",
      title: "Olmapinu WASH Project",
      image: `${R2_BASE_URL}/img1.jpg`,
      description: "Modern ablution block for 400+ students",
      details: "...",
      status: "In Progress 2025/2026",
      tags: ["Water & Sanitation", "International Partnership", "District 9216"],
      highlight: "400+ Students",
    },
    {
      id: "undugu",
      title: "Undugu Rescue Center",
      image: `${R2_BASE_URL}/img4.jpg`,
      description: "Therapy room for mental health support",
      details: "...",
      status: "Completed 2021",
      tags: ["Mental Health", "Community Care", "District Grant"],
      highlight: "Safe Space",
    },
    {
      id: "wellness",
      title: "Wellness Programs",
      image: `${R2_BASE_URL}/img2.jpg`,
      description: "Mental health and self-care initiatives",
      details: "...",
      status: "Ongoing",
      tags: ["Mental Health", "Community Wellness", "Digital Impact"],
      highlight: "Wdnesday",
    },
  ];

  const signatureProjectIds = signatureProjects.map((p) => p.id);

  const scrollToWithOffset = (id: string, offset: number) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (!hash) return;

    if (hashFilterMap[hash]) {
      const { type, value } = hashFilterMap[hash];
      if (type === "service") {
        setServiceArea(value);
        setFocusArea("All");
      } else {
        setFocusArea(value);
        setServiceArea("All");
      }
      setCurrentPage(1);

      requestAnimationFrame(() => {
        scrollToWithOffset("projects-section", 200);
      });
    } else if (signatureProjectIds.includes(hash)) {
      requestAnimationFrame(() => {
        scrollToWithOffset("signature-projects-section", 160);
      });
    }
  }, [location.hash]);
  // Close all dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const filterContainer = document.querySelector('.filter-dropdowns');

      if (filterContainer && !filterContainer.contains(target)) {
        setOpenStatusDropdown(false);
        setOpenServiceDropdown(false);
        setOpenFocusDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Preload images for this page
  usePageImages([
    '/images/projects-thumbnails.png'
  ]);

  const col1 = galleryImages.filter((_, i) => i % 3 === 0);
  const col2 = galleryImages.filter((_, i) => i % 3 === 1);
  const col3 = galleryImages.filter((_, i) => i % 3 === 2);

  const perPage = 6;
  const statuses = ["All", "In Progress", "Completed", "Ongoing", "Planning"];
  const serviceAreas_dropdown = ["All", "Community Service", "Professional Development", "Club Service"];
  const focusAreas_dropdown = ["All", "Environmental Projects", "Collaborations", "All Projects"];


  async function getProjects() {
    try {
      const querySnapshot = await getDocs(collection(db, "projects"));
      const fetchedProjects = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
        } as Project;
      });

      setProjects(fetchedProjects);
    } catch (error) {
      console.error("Error fetching projects: ", error);
    }
  }

  useEffect(() => {
    getProjects();
  }, []);

  // Filtered Logic
  const filteredProjects = useMemo(() => {
    let filtered = projects.filter((project) => {
      // Search filter
      const matchesSearch = project.title?.toLowerCase().includes(search.toLowerCase()) ||
        project.description?.toLowerCase().includes(search.toLowerCase()) ||
        project.tags?.some(tag => tag.toLowerCase().includes(search.toLowerCase()));

      if (!matchesSearch) return false;

      // Status filter
      if (status !== "All") {
        if (!project.status?.includes(status)) return false;
      }

      // Service Area filter
      if (serviceArea !== "All") {
        if (!project.tags?.includes(serviceArea)) return false;
      }

      // Focus Area filter
      if (focusArea !== "All") {
        let matchesFocus = false;
        if (focusArea === "Environmental Projects") {
          matchesFocus = project.tags?.includes("Environment") ?? false;
        } else if (focusArea === "Collaborations") {
          matchesFocus = project.tags?.includes("Collaboration") ?? false;
        } else if (focusArea === "All Projects") {
          matchesFocus = true;
        }
        if (!matchesFocus) return false;
      }

      return true;
    });

    const start = (currentPage - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [projects, search, status, serviceArea, focusArea, currentPage]);

  const totalFiltered = useMemo(() => {
    return projects.filter((project) => {
      // Search filter
      const matchesSearch = project.title?.toLowerCase().includes(search.toLowerCase()) ||
        project.description?.toLowerCase().includes(search.toLowerCase()) ||
        project.tags?.some(tag => tag.toLowerCase().includes(search.toLowerCase()));

      if (!matchesSearch) return false;

      // Status filter
      if (status !== "All") {
        if (!project.status?.includes(status)) return false;
      }

      // Service Area filter
      if (serviceArea !== "All") {
        if (!project.tags?.includes(serviceArea)) return false;
      }

      // Focus Area filter
      if (focusArea !== "All") {
        let matchesFocus = false;
        if (focusArea === "Environmental Projects") {
          matchesFocus = project.tags?.includes("Environment") ?? false;
        } else if (focusArea === "Collaborations") {
          matchesFocus = project.tags?.includes("Collaboration") ?? false;
        } else if (focusArea === "All Projects") {
          matchesFocus = true;
        }
        if (!matchesFocus) return false;
      }

      return true;
    }).length;
  }, [projects, search, status, serviceArea, focusArea]);



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
            Our <span className="text-[#F7C948]">Projects</span>
          </>
        }
        spanColor="#00adbb"
        backgroundImage="/images/projects.JPG"
        overlayImage="/images/projects-nobg.png"
        mobileImagePosition="object-[57%_0px]"

      />
      <div className="w-[90%] mx-auto py-12">
        <div id="signature-projects-section" className="projects-container scroll-mt-32">        <div className='flex justify-between mt-10'>
          <h1 className='mx-auto relative pl-4 font-light mb-5 mt-1 font-display text-5xl lg:text-6xl leading-tight mb-10 text-[#16222c]'>

            <span className="relative inline-block">
              O
              <svg
                width="38"
                height="44"
                viewBox="0 0 68 74"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute -top-5 -left-4 w-8 h-10 transform scale-x-[-1] -rotate-80"
              >
                <path fillRule="evenodd" clipRule="evenodd" d="M22.4259 68.5278C16.0259 66.7318 9.32534 65.8258 2.82534 64.9958C1.42534 64.8218 0.125535 65.7928 0.0255346 67.1608C-0.174465 68.5298 0.826121 69.7818 2.12612 69.9557C8.42612 70.7548 14.9255 71.6097 21.0255 73.3387C22.3255 73.7137 23.7261 72.9418 24.1261 71.6138C24.5261 70.2868 23.7259 68.9038 22.4259 68.5278Z" fill="#C1FF07" />
                <path fillRule="evenodd" clipRule="evenodd" d="M41.8251 43.0648C31.5251 32.5538 19.9251 23.3958 9.8251 12.6028C8.9251 11.5948 7.3251 11.5408 6.3251 12.4818C5.3251 13.4238 5.22549 15.0078 6.22549 16.0158C16.3255 26.8398 27.9255 36.0278 38.2255 46.5698C39.2255 47.5538 40.8251 47.5678 41.8251 46.5998C42.7251 45.6328 42.8251 44.0488 41.8251 43.0648Z" fill="#C1FF07" />
                <path fillRule="evenodd" clipRule="evenodd" d="M61.1264 2.63576C61.4264 8.65176 61.7259 14.6678 62.0259 20.6848C62.0259 22.0628 63.2264 23.1268 64.6264 23.0598C66.0264 22.9918 67.0259 21.8188 67.0259 20.4398C66.7259 14.4138 66.4264 8.38876 66.1264 2.36376C66.0264 0.985757 64.8262 -0.0712432 63.4262 0.00375683C62.1262 0.0787568 61.0264 1.25876 61.1264 2.63576Z" fill="#C1FF07" />
              </svg>
            </span>
            ur Signature Projects{" "}
          </h1>
        </div>
          <SignatureProjectsList projects={signatureProjects} />
        </div>
      </div>

      <div className="w-[90%] mx-auto py-12">
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

      <div className="w-[90%] container mx-auto pb-12">
        <div className="mx-auto lg:w-full grid mb-5 grid-cols-1 lg:grid-cols-2 lg:py-5">
          <h1 className='relative -pl-4 font-light mt-1 font-display text-5xl leading-tight text-[#16222c]'>
            <span className="relative inline-block">E
              <svg width="38" height="44" viewBox="0 0 68 74" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute -top-5 -left-4 w-8 h-10 transform scale-x-[-1] -rotate-80" >
                <path fillRule="evenodd" clipRule="evenodd" d="M22.4259 68.5278C16.0259 66.7318 9.32534 65.8258 2.82534 64.9958C1.42534 64.8218 0.125535 65.7928 0.0255346 67.1608C-0.174465 68.5298 0.826121 69.7818 2.12612 69.9557C8.42612 70.7548 14.9255 71.6097 21.0255 73.3387C22.3255 73.7137 23.7261 72.9418 24.1261 71.6138C24.5261 70.2868 23.7259 68.9038 22.4259 68.5278Z" fill="#D41367" />
                <path fillRule="evenodd" clipRule="evenodd" d="M41.8251 43.0648C31.5251 32.5538 19.9251 23.3958 9.8251 12.6028C8.9251 11.5948 7.3251 11.5408 6.3251 12.4818C5.3251 13.4238 5.22549 15.0078 6.22549 16.0158C16.3255 26.8398 27.9255 36.0278 38.2255 46.5698C39.2255 47.5538 40.8251 47.5678 41.8251 46.5998C42.7251 45.6328 42.8251 44.0488 41.8251 43.0648Z" fill="#D41367" />
                <path fillRule="evenodd" clipRule="evenodd" d="M61.1264 2.63576C61.4264 8.65176 61.7259 14.6678 62.0259 20.6848C62.0259 22.0628 63.2264 23.1268 64.6264 23.0598C66.0264 22.9918 67.0259 21.8188 67.0259 20.4398C66.7259 14.4138 66.4264 8.38876 66.1264 2.36376C66.0264 0.985757 64.8262 -0.0712432 63.4262 0.00375683C62.1262 0.0787568 61.0264 1.25876 61.1264 2.63576Z" fill="#D41367" />
              </svg>
            </span>xplorе Our Projects
          </h1>
          <p className="pt-8 lg:pt-0 mb-4 max-w-full text-sm leading-relaxed text-[#55697a]"> We work on diverse initiatives that create real impact. From WASH projects to community service and professional development, each project contributes to positive change in Kitengela. </p>
        </div>

        {/* Projects Grid */}
        <div id="projects-section" className="projects-container">
          <div className="flex items-center flex-row gap-2 lg:gap-4 justify-between mb-10">
            <input
              type="text"
              placeholder="Search projects..."
              className="bg-[#F7F7F7] rounded-full pl-6 px-4 py-4 w-[85%] lg:w-1/2 border-0 outline-none focus:outline-none focus:ring-0"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />

            {/* Desktop Filters */}
            <div className="hidden lg:flex gap-2 flex-wrap w-full lg:w-auto filter-dropdowns">
              {/* Status Filter */}
              <div className="relative w-full sm:w-40">
                <button
                  onClick={() => {
                    setOpenStatusDropdown(!openStatusDropdown);
                    setOpenServiceDropdown(false);
                    setOpenFocusDropdown(false);
                  }}
                  className="w-full flex items-center justify-between bg-[#F7F7F7] rounded-full px-4 py-4 text-sm"
                >
                  <span className="truncate">{status}</span>
                  <HiMiniArrowDownLeft className={`transition ${openStatusDropdown ? "rotate-180" : ""}`} size={16} />
                </button>

                {openStatusDropdown && (
                  <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-2xl shadow-lg z-20 overflow-hidden">
                    {statuses.map((stat) => (
                      <div
                        key={stat}
                        className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 text-gray-900"
                        onClick={() => {
                          setStatus(stat);
                          setCurrentPage(1);
                          setOpenStatusDropdown(false);
                        }}
                      >
                        {stat}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Service Area Filter */}
              <div className="relative w-full sm:w-48">
                <button
                  onClick={() => {
                    setOpenServiceDropdown(!openServiceDropdown);
                    setOpenStatusDropdown(false);
                    setOpenFocusDropdown(false);
                  }}
                  className="w-full flex items-center justify-between bg-[#F7F7F7] rounded-full px-4 py-4 text-sm"
                >
                  <span className="truncate">{serviceArea}</span>
                  <HiMiniArrowDownLeft className={`transition ${openServiceDropdown ? "rotate-180" : ""}`} size={16} />
                </button>

                {openServiceDropdown && (
                  <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-2xl shadow-lg z-20 overflow-hidden">
                    {serviceAreas_dropdown.map((area) => (
                      <div
                        key={area}
                        className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 text-gray-900"
                        onClick={() => {
                          setServiceArea(area);
                          setCurrentPage(1);
                          setOpenServiceDropdown(false);
                        }}
                      >
                        {area}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Focus Area Filter */}
              <div className="relative w-full sm:w-48">
                <button
                  onClick={() => {
                    setOpenFocusDropdown(!openFocusDropdown);
                    setOpenStatusDropdown(false);
                    setOpenServiceDropdown(false);
                  }}
                  className="w-full flex items-center justify-between bg-[#F7F7F7] rounded-full px-4 py-4 text-sm"
                >
                  <span className="truncate">{focusArea}</span>
                  <HiMiniArrowDownLeft className={`transition ${openFocusDropdown ? "rotate-180" : ""}`} size={16} />
                </button>

                {openFocusDropdown && (
                  <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-2xl shadow-lg z-20 overflow-hidden">
                    {focusAreas_dropdown.map((area) => (
                      <div
                        key={area}
                        className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 text-gray-900"
                        onClick={() => {
                          setFocusArea(area);
                          setCurrentPage(1);
                          setOpenFocusDropdown(false);
                        }}
                      >
                        {area}
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

                {/* Status Filter */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Status</h4>
                  <div className="space-y-2">
                    {statuses.map((stat) => (
                      <button
                        key={stat}
                        onClick={() => {
                          setStatus(stat);
                          setCurrentPage(1);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-lg transition ${status === stat
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                          }`}
                      >
                        {stat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Service Area Filter */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Service Area</h4>
                  <div className="space-y-2">
                    {serviceAreas_dropdown.map((area) => (
                      <button
                        key={area}
                        onClick={() => {
                          setServiceArea(area);
                          setCurrentPage(1);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-lg transition ${serviceArea === area
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                          }`}
                      >
                        {area}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Focus Area Filter */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Focus Area</h4>
                  <div className="space-y-2">
                    {focusAreas_dropdown.map((area) => (
                      <button
                        key={area}
                        onClick={() => {
                          setFocusArea(area);
                          setCurrentPage(1);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-lg transition ${focusArea === area
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                          }`}
                      >
                        {area}
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
        </div>

        {filteredProjects.length > 0 ? (
          <div className="w-[90%] lg:w-full mx-auto mb-12">
            <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">No projects found matching your criteria.</div>
        )}

        {totalPages > 1 && (
          <div className="w-[90%] lg:w-full mx-auto flex justify-center items-center gap-6 mt-12">
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
