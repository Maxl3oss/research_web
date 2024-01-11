import { useDispatch } from 'react-redux';
import { Input } from '@components/base'
import ToggleDarkMode from '@components/base/toggleDarkMode/index';
import { useSelector } from 'react-redux';
import { setSearch } from '@components/../store/search.store/search.slice';
import Button from '@components/base/button/index';
import React, { Fragment, useState } from 'react';
import { AppDispatch, IRootState } from '@store/index';
import { Link } from 'react-router-dom';
import { Logout } from '@store/auth.store/auth.actions';
import NoProfile from '../../../assets/images/NoProfile.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

interface Props {
  isOpenSearch: boolean;
  sliceSide: boolean | null;
  returnIsOpen: (value: boolean) => void;
  returnSliceSide: (value: boolean | null) => void;
}

export default function NavBar({ isOpenSearch, sliceSide, returnIsOpen, returnSliceSide }: Props) {
  const { search } = useSelector((state: IRootState) => state.RDsearch);
  const { user } = useSelector((state: IRootState) => state.RDauth);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => dispatch(Logout());

  return (
    <header className="sticky top-0 w-full shadow-sm z-20 flex layout-theme">
      <div className="px-5 h-16 w-full flex justify-between items-center border-b shadow-sm rounded-md dark:border-zinc-700">
        <div className="flex items-center gap-2 w-36">
          {/* slice side */}
          <div onClick={() => returnSliceSide(!sliceSide)} className="-ml-3 p-2 rounded-full dark:bg-zinc-900/25 dark:hover:bg-zinc-700 cursor-pointer">
            {
              sliceSide
                ?
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                </svg>
                :
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            }
          </div>

          <Link to="/" className="text-2xl font-bold">Research</Link>
        </div>
        <div className="flex w-full">
          {/* search input */}
          <div className="relative hidden md:flex justify-center items-center w-full">
            <div onClick={() => returnIsOpen(!isOpenSearch)} className="max-w-[625px] flex w-8/12">
              <div className={`${isOpenSearch ? "flex" : "invisible"} w-12 -mr-4 h-10 items-center justify-center bg-slate-200 dark:bg-zinc-700 rounded-l-full`}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </div>
              <div onClick={() => returnIsOpen(true)} className="nav-search w-full max-w-[625px] dark:bg-zinc-700 rounded-l-full rounded-r-full">
                <Input
                  className="h-10 text-base rounded-l-full min-w-[220px] focus:ring-0 border-0 bg-gray-200 dark:bg-zinc-700 "
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(setSearch(e.target.value))}
                  placeholder="ค้นหา"
                  type="text"
                  value={search}
                />
                <Button className="w-fit px-3 pr-4 rounded-r-full bg-gray-200 hover:bg-gray-300 dark:bg-zinc-700 dark:hover:bg-zinc-800 focus:ring-0">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </Button>
              </div>
            </div>
          </div>
          {/* search mobile input */}
          <div className="flex md:hidden justify-end items-center w-full mr-2">
            <Button onClick={() => returnIsOpen(true)} className="h-10 w-10 p-2 rounded-full bg-btn-theme focus:ring-0">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Button>
          </div>
          {/* profile */}
          <div
            className="relative flex justify-end items-center min-w-fit w-28 gap-2"
          >
            <img
              onClick={() => setIsOpen(prev => !prev)}
              className="w-10 h-10 rounded-full object-cover border dark:border-gray-700 cursor-pointer"
              src={user?.profile || ''}
              alt=""
              onError={({ currentTarget }) => currentTarget.src = NoProfile}
            />
            <ToggleDarkMode />

            {/* drop list */}
            <div
              onMouseLeave={() => setIsOpen(false)}
              className={`${isOpen ? "absolute" : "hidden"} + w-60 p-2 bg-theme top-10 right-12 rounded-lg z-50 shadow-lg text-sm`}
            >
              <ul className="bg-theme">
                {user?.email ?
                  <Fragment>
                    <li className="font-medium">
                      <div className="flex gap-3 items-center transform transition-colors duration-200 p-2">
                        <img
                          className="w-8 h-8 rounded-full object-cover"
                          src={user?.profile ?? ""}
                          alt="user-profile"
                          onError={({ currentTarget }) => currentTarget.src = NoProfile}
                        />
                        <span className="font-bold">{`${user?.first_name || ''} ${user?.last_name || ''}`}</span>
                      </div>
                    </li>
                    <hr className="dark:border-gray-700" />
                    <li className="font-medium">
                      <Link to="/user" className="flex gap-3 items-center transform transition-colors duration-200 hover:bg-indigo-200 hover:dark:bg-zinc-900 p-2 rounded-lg">
                        <FontAwesomeIcon icon={["fas", "user"]} className="text-xl text-neutral-400 mx-1" />
                        <span className="text-sm">โปรไฟล์</span>
                      </Link>
                    </li>
                    <li className="font-medium">
                      <Link to="/user/setting" className="flex gap-3 items-center transform transition-colors duration-200 hover:bg-indigo-200 hover:dark:bg-zinc-900 p-2 rounded-lg">
                        <FontAwesomeIcon icon={["fas", "gear"]} className="text-xl text-neutral-400 mx-1" />
                        <span className="text-sm">ตั้งค่า</span>
                      </Link>
                    </li>
                    <hr className="dark:border-gray-700" />
                    <li className="font-medium">
                      <Link onClick={handleLogout} to="/signIn" className="flex gap-3 items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-red-700 m-2">
                        <FontAwesomeIcon icon={["fas", "right-from-bracket"]} className="text-xl text-red-500 ml-1" />
                        ออกจากระบบ
                      </Link>
                    </li>
                  </Fragment>
                  :
                  <Fragment>
                    <li className="font-medium">
                      <div className="flex gap-3 items-center transform transition-colors duration-200 p-2">
                        <img
                          className="w-8 h-8 rounded-full object-cover"
                          src={NoProfile}
                          alt=""
                          onError={({ currentTarget }) => currentTarget.src = NoProfile}
                        />
                        <span className="font-bold">ยังไม่เข้าสู่ระบบ</span>
                      </div>
                    </li>
                    <li className="font-medium">
                      <Link to="/signIn" className="flex gap-3 items-center transform transition-colors duration-200 hover:bg-indigo-200 hover:dark:bg-zinc-900 p-2 rounded-lg">
                        <FontAwesomeIcon icon={["fas", "right-to-bracket"]} className="text-xl" />
                        <span className="text-sm">เข้าสู่ระบบ</span>
                      </Link>
                    </li>
                  </Fragment>

                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
