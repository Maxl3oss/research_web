import Lucide from '../../base/lucide'
import { Link } from 'react-router-dom'

export default function Sidebar() {
  return (
    <nav className="min-w-[280px] hidden md:flex border-r dark:border-zinc-800 dark:bg-zinc-900">
      <div className="w-full flex flex-col justify-between item gap-5 mt-5 pb-5">
        <Link to="/home" className="flex justify-center gap-2 border p-2 w-48 mx-auto rounded-md dark:bg-zinc-800 dark:border-zinc-800">
          <Lucide name="Home" /> Home
        </Link>
        {/* <Link to="/signIn" className="flex justify-center gap-2 borderx p-2 w-48 mx-auto rounded-md dark:bg-zinc-800 dark:border-zinc-800 ">
          <Lucide name="LogIn" /> SignIn
        </Link> */}
      </div>
    </nav>
  )
}
