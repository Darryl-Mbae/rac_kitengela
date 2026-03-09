import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'
import Footer from './Footer'
import SideBar from './SideBar'

const Layout = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const applyTheme = (e: MediaQueryList | MediaQueryListEvent) => {
      const newTheme = e.matches ? 'dark' : 'light'
      setTheme(newTheme)
      document.documentElement.setAttribute('data-theme', newTheme)
    }

    applyTheme(darkQuery)
    darkQuery.addEventListener('change', applyTheme)

    return () => darkQuery.removeEventListener('change', applyTheme)
  }, [])

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(nextTheme)
    document.documentElement.setAttribute('data-theme', nextTheme)
  }

  return (
    <div className='w-full p-0 relative'>
      <SideBar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <header className="fixed top-0 left-0 right-0 z-50">
        <NavBar 
          mobileOpen={mobileOpen} 
          setMobileOpen={setMobileOpen} 
          toggleTheme={toggleTheme} 
          theme={theme} 
        />
      </header>
      <main className='w-[90%] mx-auto pt-20'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout