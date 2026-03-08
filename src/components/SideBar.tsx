import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const links = [
  { name: "Home", path: "/" },
  { name: "Events", path: "/events" },
  { name: "Members", path: "/members" },
  { name: "About Us", path: "/about" },
  { name: "Contact", path: "/contact" }
]

type Props = {
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>
  mobileOpen: boolean
}

function SideBar({ mobileOpen, setMobileOpen }: Props) {
  const location = useLocation()
  
  return (
    <div
      className={`fixed inset-0 z-40 md:hidden duration-300 ${
        mobileOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      {/* <div
        className="absolute inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm"
        onClick={() => setMobileOpen(false)}
      /> */}

      {/* Sidebar panel */}
      <div
        className={`absolute top-0 left-0 h-full w-full bg-primary
          transform transition-transform duration-300 ease-in-out
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-7 border-b border-neutral-200 dark:border-neutral-800">
          <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">
            Menu
          </span>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1 rounded-md text-tertiary hover:text-neutral-800 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Links */}
        <div className="flex flex-col px-4 py-4 gap-1">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={`text-left text-sm px-3 py-3 rounded-md transition-colors ${
                location.pathname === link.path
                  ? "font-medium text-primary bg-cranberry"
                  : "text-secondary hover:text-tertiary hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SideBar