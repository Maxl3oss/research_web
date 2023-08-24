import { NavLink } from 'react-router-dom'
import { twMerge } from 'tailwind-merge';

function ArrowRight() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-3 arrow-right">
      <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
    </svg>
  )
}

export default function Sidebar() {
  return (
    <aside className={
      twMerge([
        "fixed top-0 z-10 mt-16 min-h-[calc(100vh_-_64px)] md:w-[80px] xl:w-[200px] hidden md:flex border-r transition-transform transform translate-x-0",
        "text-gray-800 bg-white",
        "dark:border-zinc-800 dark:bg-zinc-900 dark:text-slate-50",
      ])}>
      <div className="w-full flex flex-col item my-5 px-1">
        <NavLink
          to="/research"
          className={(({ isActive }) =>
            isActive ? "menu-side-active" : "menu-side")
          }
        >
          <div className="menu-icon">
            <div className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
              </svg>
              <p>Home</p>
            </div>
            <ArrowRight />
          </div>
        </NavLink>
        
        <NavLink
          to="/back/dashboard"
          className={({ isActive }) =>
            isActive ? "menu-side-active" : "menu-side"
          }
        >
          <div className="menu-icon">
            <div className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M4.5 3.75a3 3 0 00-3 3v10.5a3 3 0 003 3h15a3 3 0 003-3V6.75a3 3 0 00-3-3h-15zm4.125 3a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zm-3.873 8.703a4.126 4.126 0 017.746 0 .75.75 0 01-.351.92 7.47 7.47 0 01-3.522.877 7.47 7.47 0 01-3.522-.877.75.75 0 01-.351-.92zM15 8.25a.75.75 0 000 1.5h3.75a.75.75 0 000-1.5H15zM14.25 12a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H15a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3.75a.75.75 0 000-1.5H15z" clipRule="evenodd" />
              </svg>
              <p>Dashboard</p>
            </div>
            <ArrowRight />
          </div>
        </NavLink>
        {/* <NavLink
          to="/research/detail-research"
          className={({ isActive }) =>
            isActive ? "menu-side-active" : "menu-side"
          }
        >
          <div className="menu-icon">
            <div className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M4.5 3.75a3 3 0 00-3 3v10.5a3 3 0 003 3h15a3 3 0 003-3V6.75a3 3 0 00-3-3h-15zm4.125 3a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zm-3.873 8.703a4.126 4.126 0 017.746 0 .75.75 0 01-.351.92 7.47 7.47 0 01-3.522.877 7.47 7.47 0 01-3.522-.877.75.75 0 01-.351-.92zM15 8.25a.75.75 0 000 1.5h3.75a.75.75 0 000-1.5H15zM14.25 12a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H15a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3.75a.75.75 0 000-1.5H15z" clipRule="evenodd" />
              </svg>
              <p>Detail</p>
            </div>
            <ArrowRight />
          </div> */}
        {/* <Tooltip titleTooltip={"test"}>
          <NavLink
            to="/research/detail-research"border
            className={({ isActive }) =>
              isActive ? "menu-side-active" : "menu-side"
            }
          >
            <Lucide name="TreeDeciduous" size='25' />
          </NavLink>
        </Tooltip> */}
      </div>
    </aside>
  )
}
