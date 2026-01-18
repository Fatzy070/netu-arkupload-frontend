import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <main className="min-h-screen bg-white text-black font-mono flex flex-col items-center justify-center">

      <p className="text-6xl mb-4">404</p>

      <p className="uppercase mb-8">
        Nothing here but ash.
      </p>

      <Link
        to="/"
        className="border-2 border-black px-6 py-2 uppercase hover:bg-black hover:text-white transition-none"
      >
        Return to furnace
      </Link>

    </main>
  )
}

export default NotFound
