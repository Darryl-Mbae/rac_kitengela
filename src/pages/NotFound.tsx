import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

function NotFound() {
  return (
    <div>
      <SEO 
        title="Page Not Found"
        description="The page you're looking for doesn't exist. Return to RAC Kitengela homepage."
        image="/images/og-home.jpg"
      />
      <div className="py-20 text-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-6xl font-bold text-cranberry mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-primary mb-4">Page Not Found</h2>
          <p className="text-secondary mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link 
            to="/"
            className="inline-block bg-cranberry text-white px-6 py-3 rounded-lg hover:bg-primary-cranberry-dark transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound