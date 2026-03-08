import { useState, useEffect } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Homepage from './pages/Homepage'
import AboutUs from './pages/AboutUs'
import Events from './pages/Events'
import Members from './components/Members'
import SideBar from './components/SideBar'

function App() {
  // Theme is now just 'light' or 'dark', strictly mirroring the system
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [page, setPage] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)


  useEffect(() => {
    // 1. Define the system preference matcher
    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)')

    // 2. Define the applier function
    const applyTheme = (e: MediaQueryList | MediaQueryListEvent) => {
      const newTheme = e.matches ? 'dark' : 'light'
      setTheme(newTheme)
      document.documentElement.setAttribute('data-theme', newTheme)
    }

    // 3. Initial call to set theme on load
    applyTheme(darkQuery)

    // 4. Listen for system-level changes in real-time
    darkQuery.addEventListener('change', applyTheme)

    // Cleanup listener on unmount
    return () => darkQuery.removeEventListener('change', applyTheme)
  }, [])

  // The toggle now manually flips the current state and DOM attribute
  // Note: Since we aren't using localStorage, a page refresh will 
  // revert this back to whatever the system setting is.
  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(nextTheme)
    document.documentElement.setAttribute('data-theme', nextTheme)
  }

  return (
    <div className='w-full p-0 relative'>
      <SideBar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} setPage={setPage} page={page}  />
      <header className="fixed top-0 left-0 right-0 z-50">
        <NavBar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} setPage={setPage} page={page} toggleTheme={toggleTheme} theme={theme} />
      </header>
      <main className='w-[90%] mx-auto pt-20'>
        {page === 0 && <Homepage />}
        {page === 1 && <Events />}
        {page === 2 && <Members />}
        {page === 3 && <AboutUs />}
      </main>
      <Footer />
    </div>
  )
}

export default App