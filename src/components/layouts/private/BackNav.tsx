import { Link } from "react-router-dom"

function BackNav() {
  return (
    <nav className="fixed top-0 w-full min-h-[64px] shadow-sm z-20 flex bg-white dark:bg-zinc-900 dark:text-white">
      <div className="px-5 py-3 w-full flex justify-between items-center border rounded-md dark:border-zinc-800">
        <div className="w-28">
          <Link to="/" className="text-2xl font-bold">Research</Link>
        </div>
        <div className="flex w-full">
        
        </div>
      </div>
    </nav>
  )
}

export default BackNav