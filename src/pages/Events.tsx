import { Link } from "react-router-dom"
import EventCard from "../components/EventCard"
import SEO from "../components/SEO"
import { useMemo, useState } from "react"
import { HiMiniArrowDownLeft, HiMiniArrowUpRight } from "react-icons/hi2"

function Events() {

  const events = [
    {
      id: 1,
      title: "Community Clean-Up",
      description:
        "Rotaract members joined hands to clean public spaces and promote environmental awareness in Kitengela.",
      image: "/images/cleanup.jpg",
      social: "https://instagram.com/rackitengela",
      category: "Community Service",
      date: "2026-02-12",
      link: "https://rackitengela.org/events/cleanup",
    },
    {
      id: 2,
      title: "Club Hangout Night",
      description:
        "Members gathered for a fun social evening to strengthen friendships and club spirit.",
      image: "/images/hangout.jpg",
      social: "https://facebook.com/rackitengela",
      category: "Club Hangout",
      date: "2026-01-28",
    },
    {
      id: 3,
      title: "Youth Mentorship Workshop",
      description:
        "A mentorship session connecting young professionals with experienced leaders.",
      image: "/images/workshop.jpg",
      social: "https://linkedin.com/company/rackitengela",
      category: "Mentorship",
      date: "2026-03-05",
      link: "https://rackitengela.org/events/mentorship",
    },
    {
      id: 4,
      title: "Club Project Planning",
      description:
        "Members collaborated to plan upcoming service projects for the community.",
      image: "/images/project.jpg",
      social: "https://instagram.com/rackitengela",
      category: "Club Projects",
      date: "2025-12-18",
    },
  ]

  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [openDropdown, setOpenDropdown] = useState(false)

  const perPage = 6

  const categories = [
    "All",
    "Club Hangout",
    "Community Service",
    "Mentorship",
    "Club Projects",
  ]

  const filteredEvents = useMemo(() => {

    let filtered = events.filter(
      (event) =>
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.description.toLowerCase().includes(search.toLowerCase())
    )

    if (category !== "All") {
      filtered = filtered.filter((event) => event.category === category)
    }

    const start = (currentPage - 1) * perPage
    return filtered.slice(start, start + perPage)

  }, [search, category, currentPage])

  const totalFiltered = events.filter(
    (event) =>
      (event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.description.toLowerCase().includes(search.toLowerCase())) &&
      (category === "All" || event.category === category)
  ).length

  const totalPages = Math.ceil(totalFiltered / perPage)

  return (
    <div>
      <SEO
        title="Events"
        description="Discover upcoming events and activities at RAC Kitengela."
        keywords="RAC Kitengela events"
        image="/images/og-events.jpg"
      />

      <div className="py-12">

        {/* HERO SECTION */}
        <div className="w-full hidden lg:grid grid-cols-2 rounded-xl bg-secondary">

          <div className="my-10 mx-auto w-[85%] py-10 flex flex-col relative p-10">

            <h1 className="pb-6">
              Make Memories
              <br />
              That Matter
            </h1>

            <p>
              Rotaract is more than meetings and projects — it's a community of
              young leaders building lifelong friendships while creating real
              impact.
            </p>

            <Link to={"/contact"}>
              <button className="cool-button mt-6">Join Us</button>
            </Link>

          </div>

          {/* image grid */}
          <div className="w-full grid grid-cols-3 h-120 overflow-hidden gap-2">

            <div className="flex flex-col gap-2 -mt-10">
              <div className="aspect-square bg-red-500"></div>
              <div className="aspect-square bg-red-500"></div>
              <div className="aspect-square bg-red-500"></div>
            </div>

            <div className="flex flex-col gap-2 -mt-20">
              <div className="aspect-square bg-red-500"></div>
              <div className="aspect-square bg-red-500"></div>
              <div className="aspect-square bg-red-500"></div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="aspect-square bg-red-500"></div>
              <div className="aspect-square bg-red-500"></div>
              <div className="aspect-square bg-red-500"></div>
            </div>

          </div>

        </div>

        {/* SECTION TITLE */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 lg:py-20">

          <h1 className="text-4xl font-bold">Our Events</h1>

          <p className="pt-8 lg:pt-0">
            Throughout the year we organize community service initiatives,
            mentorship sessions, networking events and social gatherings.
          </p>

        </div>

        {/* SEARCH + FILTER */}
        <div className="flex flex-col lg:flex-row gap-4 justify-between mb-10">

          {/* search */}
          <input
            type="text"
            placeholder="Search events..."
            className="bg-secondary px-4 py-3 rounded w-full lg:w-1/2"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setCurrentPage(1)
            }}
          />

          {/* custom dropdown */}
          <div className="relative w-full lg:w-60">

            <button
              onClick={() => setOpenDropdown((prev) => !prev)}
              className="w-full flex items-center justify-between bg-secondary px-4 py-3 rounded"
            >
              <span>{category}</span>

              <HiMiniArrowDownLeft
                className={`ml-4 transition ${
                  openDropdown ? "rotate-180" : ""
                }`}
              />
            </button>

            {openDropdown && (
              <div className="absolute top-full mt-2 w-full bg-secondary rounded shadow-lg z-20">

                {categories.map((cat) => (
                  <div
                    key={cat}
                    className={`px-4 py-3 cursor-pointer hover:bg-primary hover:bg- transition ${
                      category === cat ? "text-cranberry" : ""
                    }`}
                    onClick={() => {
                      setCategory(cat)
                      setCurrentPage(1)
                      setOpenDropdown(false)
                    }}
                  >
                    {cat}
                  </div>
                ))}

              </div>
            )}

          </div>

        </div>

        {/* EVENTS GRID */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">

          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}

        </div>

        {/* PAGINATION */}
        <div className="flex justify-center items-center gap-6 mt-12">

          <button
            disabled={currentPage === 1}
            className="flex items-center justify-center w-10 h-10 bg-secondary rounded-full disabled:opacity-40"
            onClick={() =>
              setCurrentPage((prev) => Math.max(prev - 1, 1))
            }
          >
            <HiMiniArrowDownLeft />
          </button>

          <span>
            {Math.min(currentPage * perPage, totalFiltered)} out of{" "}
            {totalFiltered} events
          </span>

          <button
            disabled={currentPage === totalPages}
            className="flex items-center justify-center w-10 h-10 bg-secondary rounded-full disabled:opacity-40"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          >
            <HiMiniArrowUpRight />
          </button>

        </div>

      </div>
    </div>
  )
}

export default Events