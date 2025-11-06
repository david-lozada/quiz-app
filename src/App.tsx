import { NavLink as Link } from "react-router";
import { Button } from "@/components/ui/button"
import './App.css'

function App() {

  return (
    <>
      <div className="flex flex-wrap items-center gap-2 md:flex-col md:gap-4">
        <Link to={'/game'}>Start</Link>
        <Link to={'/history'}>History</Link>
        <Link to={'/config'}>Config</Link>
      </div>
    </>
  )
}

export default App
