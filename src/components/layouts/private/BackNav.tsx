import { ToggleDarkMode } from "@components/base"
import { Logout } from "@store/auth.store/auth.actions";
import { AppDispatch, IRootState } from "@store/index";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom"
import NoProfile from "../../../assets/images/NoProfile.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function BackNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state: IRootState) => state.RDauth);
  const dispatch = useDispatch<AppDispatch>();
  const handleLogout = () => dispatch(Logout());

  return (
    <header className="sticky top-0 w-full shadow-sm z-20 flex layout-theme">
      <div className="px-5 h-16 w-full flex justify-between items-center border-b shadow-sm rounded-md dark:border-zinc-700">
        <div className="w-28">
          <Link to="/" className="text-2xl font-bold">Research</Link>
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
              <li className="font-medium">
                <Link to="" className="flex gap-3 items-center transform transition-colors duration-200 p-2">
                  <img
                    onClick={() => setIsOpen(prev => !prev)}
                    className="w-10 h-10 rounded-full object-cover border dark:border-gray-700 cursor-pointer"
                    src={user?.profile || ''}
                    alt=""
                    onError={({ currentTarget }) => currentTarget.src = NoProfile}
                  />
                  <span className="font-bold">{`${user?.first_name || ''} ${user?.last_name || ''}`}</span>
                </Link>
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
                  <FontAwesomeIcon icon={["fas", "right-from-bracket"]} className="text-xl text-red-500 mx-1" />
                  ออกจากระบบ
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  )
}

export default BackNav