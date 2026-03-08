import React from "react"
import {  Sun, Moon} from "lucide-react"
import { BsSubstack } from "react-icons/bs"
import '../hamburger.css'

type Props = {
  toggleTheme: () => void
  theme: "light" | "dark" | "auto"
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>
  mobileOpen: boolean

}

function NavBar({mobileOpen,setMobileOpen, toggleTheme, page, theme, setPage }: Props) {

  const links = [
    { name: "Home", id: 0 },
    { name: "Events", id: 1 },
    { name: "Members", id: 2 },
    { name: "About Us", id: 3 },
    { name: "Contact", id: 4 }
  ]

  return (
    <nav className="w-full bg-primary pt-3">

      <div className="w-[90%] mx-auto ">
        <div className="grid grid-cols-2 lg:grid-cols-3 items-center h-20">

          {/* Left */}
          <div className="flex items-center">
            <div
              className="font-semibold text-lg cursor-pointer h-full flex items-center"
              onClick={() => setPage(0)}
            >
            </div>
          </div>

          {/* Center */}
          <div className="hidden md:flex justify-center gap-8">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => setPage(link.id)}
                className={`text-sm cursor-pointer lg:text-[16px] transition-colors ${page === link.id
                  ? "text-primary font-semibold"
                  : "text-secondary hover:text-lime!"
                  }`}
              >
                {link.name}
              </button>
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
              className="p-2 rounded-full bg-cranberry text-white cursor-pointer transition"
            >
              <BsSubstack size={18} />
            </button>

          </div>

          <div className="flex items-center gap-2 md:hidden justify-end">

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
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