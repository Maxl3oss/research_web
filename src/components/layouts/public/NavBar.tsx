import { useDispatch } from 'react-redux';
import { Input } from '@components/base'
import ToggleDarkMode from '@components/base/toggleDarkMode/index';
import { useSelector } from 'react-redux';
import { setSearch } from '@components/../store/search.store/search.slice';
import Button from '@components/base/button/index';
import React, { useState } from 'react';
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
  const search = useSelector((state: IRootState) => state.RDsearch.search) as string;
  const userInfo = useSelector((state: IRootState) => state.RDauth.user);
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
              src={userInfo?.profile || ''}
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
                <li className="font-medium">
                  <div className="flex gap-3 items-center transform transition-colors duration-200 p-2">
                    <img
                      className="w-8 h-8 rounded-full object-cover"
                      src={userInfo?.profile ?? ""}
                      alt=""
                      onError={({ currentTarget }) => currentTarget.src = NoProfile}
                    />
                    <span className="font-bold">{`${userInfo?.first_name || ''} ${userInfo?.last_name || ''}`}</span>
                  </div>
                </li>
                <hr className="dark:border-gray-700" />
                <li className="font-medium">
                  <Link to="/user" className="flex gap-3 items-center transform transition-colors duration-200 hover:bg-indigo-200 hover:dark:bg-zinc-900 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    <span className="text-sm">โปรไฟล์</span>
                  </Link>
                </li>
                <li className="font-medium">
                  <Link to="/user/setting" className="flex gap-3 items-center transform transition-colors duration-200 hover:bg-indigo-200 hover:dark:bg-zinc-900 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm">ตั้งค่า</span>
                  </Link>
                </li>
                <hr className="dark:border-gray-700" />
                <li className="font-medium">
                  <Link onClick={handleLogout} to="/signIn" className="flex gap-3 items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-red-700 m-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>
                    ออกจากระบบ
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
