import React from "react"
import { Sun, Moon } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import '../hamburger.css'
import { getSocialLink } from "../utils/socials"

type Props = {
  toggleTheme: () => void
  theme: "light" | "dark"
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>
  mobileOpen: boolean
}

function NavBar({ mobileOpen, setMobileOpen, toggleTheme, theme }: Props) {
  const location = useLocation()

  const links = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
    { name: "Members", path: "/members" },
    { name: "About Us", path: "/about" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" }
  ]

  return (
    <nav className="w-full bg-primary pt-3">

      <div className="w-[90%] mx-auto ">
      <div className="grid grid-cols-2 lg:grid-cols-[1fr_auto_1fr] items-center h-20">
          {/* Left */}
          <div className="flex items-center">
            <Link
              to="/"
              className="font-semibold text-lg cursor-pointer h-full flex items-center"
            >
              RAC Kitengela
            </Link>
          </div>

          {/* Center */}
          <div className="hidden md:flex items-center justify-center gap-8">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm cursor-pointer lg:text-[16px] transition-colors ${location.pathname === link.path
                  ? "text-primary font-semibold"
                  : "text-secondary hover:text-lime!"
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right */}
          <div className="hidden md:flex justify-end items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-primary cursor-pointer transition"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              onClick={() => {
                const substackLink = getSocialLink('Substack')
                if (substackLink) window.open(substackLink.href, "blank")
              }}
              className="p-2 rounded-full bg-cranberry text-white cursor-pointer transition"
            >
              {(() => {
                const substackLink = getSocialLink('Substack')
                if (substackLink) {
                  const Icon = substackLink.icon
                  return <Icon className="w-[18px] h-[18px]" />
                }
                return null
              })()}
            </button>

          </div>

          <div className="flex items-center gap-4 md:hidden justify-end">

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              {theme === "dark" ? <Sun size={22} /> : <Moon size={22} />}
            </button>


            <button
              onClick={() => setMobileOpen(prev => !prev)}
              className={`text-primary! hamburger hamburger--spring ${mobileOpen && 'is-active'}`} type="button">
              <span className="hamburger-box">
                <span className="hamburger-inner"></span>
              </span>
            </button>

          </div>

        </div>
      </div>

    </nav>
  )
}

export default NavBar