import { Outlet, NavLink } from "react-router"

export default function MainLayout() {
  return (
    <main className="min-h-dvh flex flex-col bg-gray-900 text-white">
      <header className="bg-gray-800">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="font-bold text-lg">Quiz App</div>
          <nav className="space-x-4">
            <NavLink to="/" className="text-gray-300 hover:text-indigo-300">Home</NavLink>
          </nav>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6">
        <Outlet />
      </main>

      <footer className="bg-gray-800 text-gray-400 text-center py-3">
        © {new Date().getFullYear()} David Lozada
      </footer>
    </main>
  )
}