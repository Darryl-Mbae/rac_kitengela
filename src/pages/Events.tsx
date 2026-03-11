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
              <span className="relative inline-block">
                M
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
              ake Memories
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

          <h1 className="text-4xl font-bold">
          <span className='relative inline-block'>
          Our Events
            <svg width="70%" height="28" viewBox="0 0 340 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M42.7009 9.74074C48.056 9.50278 52.3488 11.7633 54.89 16.5522C56.8138 20.2107 58.9817 20.8354 62.571 19.4969C71.7882 16.0614 81.0485 12.7449 90.3662 9.65151C96.1377 7.733 101.306 8.75916 105.542 13.8603C106.561 15.0798 109.045 15.8829 110.61 15.5558C118.649 13.8603 126.618 11.7187 134.615 9.75558C143.602 7.5545 152.561 5.16013 161.62 3.28624C167.205 2.12621 172.488 4.40163 175.92 8.65506C180.916 14.827 187.032 14.5295 193.206 13.1018C204.849 10.4248 216.292 6.88529 227.906 4.07446C233.85 2.64673 239.966 1.59077 246.054 1.24872C248.839 1.08512 252.084 2.51285 254.51 4.17853C259.65 7.68835 265.335 7.43552 270.748 6.82577C285.751 5.13034 300.754 3.21187 315.585 0.401038C323.725 -1.14566 330.344 2.08155 337.221 4.96675C338.585 5.54676 340.365 8.68481 339.934 9.54739C338.915 11.5849 336.905 13.5629 334.838 14.4255C333.086 15.1691 330.502 14.8419 328.635 14.0983C318.944 10.2166 309.555 13.8454 300.079 14.9906C288.421 16.3886 276.821 18.2922 265.149 19.3779C261.631 19.705 257.224 19.125 254.496 17.1024C247.03 11.57 239.493 13.3993 231.812 15.288C219.536 18.3071 207.319 21.5343 195.072 24.6575C184.979 27.2304 176.121 25.3713 168.483 17.4891C166.846 15.7937 163.199 14.827 160.902 15.3921C149.833 18.0542 138.893 21.3261 127.91 24.4195C120.516 26.4868 113.266 29.8776 105.369 26.7842C104.393 26.3975 103.201 26.2191 102.484 25.5349C94.7881 18.1584 87.2794 22.1738 79.6415 25.6837C74.3581 28.1078 69.046 30.532 63.5473 32.3017C56.6415 34.5326 51.3869 31.7664 46.3188 24.2262C44.5386 21.5641 42.9736 20.4784 39.9012 21.1179C30.8994 22.9621 23.1035 27.3493 16.0829 33.2238C9.72277 38.5629 4.85571 39.6188 0.807033 35.41C-0.111816 34.4582 -0.298432 31.0376 0.519919 30.2643C10.1822 21.0287 28.4443 10.5141 42.7296 9.75558L42.7009 9.74074Z" fill="#C1FF07" />
            </svg>
            </span>
           
          </h1>

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
                className={`ml-4 transition ${openDropdown ? "rotate-180" : ""
                  }`}
              />
            </button>

            {openDropdown && (
              <div className="absolute top-full mt-2 w-full bg-secondary rounded shadow-lg z-20">

                {categories.map((cat) => (
                  <div
                    key={cat}
                    className={`px-4 py-3 cursor-pointer hover:bg-primary hover:bg- transition ${category === cat ? "text-cranberry" : ""
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