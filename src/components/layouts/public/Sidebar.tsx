import { NavLink } from 'react-router-dom'
import { twMerge } from 'tailwind-merge';
import SIDE_DATA, { ArrowRight } from '../data/SideData';
import { nanoid } from '@reduxjs/toolkit';
interface Props {
  sliceSide: boolean | null;
}

export default function Sidebar({ sliceSide }: Props) {
  const layoutSize = sliceSide === null ? "md:w-[80px] xl:w-[200px] hidden md:flex" : sliceSide ? "w-[200px]" : "md:w-[80px] -translate-x-16 md:translate-x-0";
  const pShow = sliceSide === null ? "" : sliceSide ? "!block" : "!hidden";
  const posit = (sliceSide === null ? "" : sliceSide ? "!mx-0" : "!mx-auto") + " icon";
  const ROLE = "admin"
  const jSide = SIDE_DATA[ROLE];

  return (
    <aside className={
      twMerge([
        "fixed top-0 z-10 mt-16 min-h-[calc(100vh_-_64px)] border-r transition-transform transform translate-x-0",
        "layout-theme dark:border-zinc-800",
        "transition-all duration-200 translate-x-0",
        layoutSize,
      ])}>
      <div className="w-full flex flex-col item my-5 px-1">
        {jSide?.map((_) => (
          <NavLink
            key={nanoid(3)}
            to={_?.link}
            className={(({ isActive }) =>
              isActive ? "menu-side-active" : "menu-side")
            }
          >
            <div className="menu-icon">
              <div className={posit}>
                {_?.icon}
                <p className={pShow}>{_?.name}</p>
              </div>
              <ArrowRight className={pShow} />
            </div>
          </NavLink>
        ))}
      </div>
    </aside>
  )
}