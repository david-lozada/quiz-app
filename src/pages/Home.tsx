import { NavLink as Link } from "react-router";
import './Home.css'
import { getRandomInt } from "@/utils/helpers";

function App() {

  return (
    <div className="
        flex items-center justify-center 
        bg-gray-900 text-white 
        p-4 sm:p-8
      ">
      <div className="
        w-full max-w-md p-8 sm:p-10 
        bg-gray-800 rounded-xl shadow-2xl 
        border-2 border-indigo-600 
        text-center
      ">
    
        <header className="mb-8">
          <h1 className="
            text-4xl sm:text-5xl font-extrabold 
            tracking-tight mb-2 text-indigo-400
            [text-shadow:0_0_8px_rgb(99_102_241)] 
            animate-pulse
          ">
            The Ultimate Quiz
          </h1>
          <p className="text-gray-400 text-lg">
            Test your knowledge. Achieve greatness.
          </p>
        </header>

        <section className="mb-10 text-left bg-gray-700/50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-3 text-white">
            How to Play
          </h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>**10** rapid-fire questions per round.</li>
            <li>**15 seconds** to answer each question.</li>
            <li>Earn points for speed and accuracy.</li>
            <li>No peeking! 🤫</li>
          </ul>
        </section>

        <div className="flex flex-col gap-4">
          <Link to={'/game/' + getRandomInt(1, 20)} className="
            w-full p-3 text-xl font-bold rounded-lg 
            bg-indigo-600 hover:bg-indigo-700 
            text-white uppercase tracking-wider 
            shadow-lg shadow-indigo-500/50 
            transition duration-300 transform hover:scale-[1.03]
            focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50
          ">
            Start Challenge
          </Link>

          <button className="
            w-full py-2 text-md font-medium rounded-lg 
            bg-gray-600 hover:bg-gray-700 
            text-gray-300 transition duration-300
          ">
            View Leaderboard
          </button>
        </div>

        <footer className="mt-8 text-sm text-gray-500">
          <p>Powered by David Lozada</p>
        </footer>

      </div>
    </div>
  )
}

export default App
