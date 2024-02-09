import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NavLink } from "react-router-dom"
import { ArrowRight } from "../data/SideData"

function BackMenu() {
  return (
    <div className="md:hidden w-full h-16 fixed bottom-0 right-0">
      <div className="flex w-full h-full dark:border-zinc-700 layout-theme py-2">
        <NavLink
          to="/back/dashboard"
          className={({ isActive }) =>
            isActive ? "menu-side-active" : "menu-side"
          }
        >
          <div className="menu-icon">
            <div className="icon">
              <FontAwesomeIcon className="w-6 h-6" icon={["fas", "chart-simple"]} />
              <p>Dashboard</p>
            </div>
            <ArrowRight />
          </div>
        </NavLink>
        <NavLink
          to="/back/research"
          className={({ isActive }) =>
            isActive ? "menu-side-active" : "menu-side"
          }
        >
          <div className="menu-icon">
            <div className="icon">
              <FontAwesomeIcon className="w-6 h-6" icon={["fas", "book"]} />
              <p>Research</p>
            </div>
            <ArrowRight />
          </div>
        </NavLink>

        <NavLink
          to="/back/users"
          className={({ isActive }) =>
            isActive ? "menu-side-active" : "menu-side"
          }
        >
          <div className="menu-icon">
            <div className="icon">
              <FontAwesomeIcon className="w-6 h-6" icon={["fas", "user"]} />
              <p>Users</p>
            </div>
            <ArrowRight />
          </div>
        </NavLink>
      </div>
    </div>
  )
}

export default BackMenu