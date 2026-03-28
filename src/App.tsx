import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './App.css'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'
import Homepage from './pages/Homepage'
import AboutUs from './pages/AboutUs'
import Events from './pages/Events'
import MembersPage from './pages/MembersPage'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import Gallery from './components/Gallery'

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <div className='w-full p-0'>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Homepage />} />
              <Route path="events" element={<Events />} />
              <Route path="members" element={<MembersPage />} />
              <Route path="about" element={<AboutUs />} />
              <Route path="gallery" element={<Gallery />} />
              <Route path="contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </HelmetProvider>
  )
}

export default App