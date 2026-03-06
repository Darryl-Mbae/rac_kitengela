import { useState, useEffect } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Homepage from './pages/Homepage'

function App() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>('auto')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'auto' || 'auto'
    setTheme(savedTheme)

    if (savedTheme === 'auto') {
      document.documentElement.removeAttribute('data-theme')
    } else {
      document.documentElement.setAttribute('data-theme', savedTheme)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : theme === 'dark' ? 'auto' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)

    if (newTheme === 'auto') {
      document.documentElement.removeAttribute('data-theme')
    } else {
      document.documentElement.setAttribute('data-theme', newTheme)
    }
  }

  return (
    <div className='w-full min-h-screen flex flex-col p-0'>
      <header>
        <NavBar toggleTheme={toggleTheme} theme={theme}/>
      </header>
      <main className='w-[90%] mx-auto'>
        <Homepage/>
      </main>
      <Footer />
    </div>
  )
}

export default App
