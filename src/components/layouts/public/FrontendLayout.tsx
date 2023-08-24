import { IRootState } from '@store/index';
import MenuBar from './MenuBar';
import NavBar from './NavBar';
import Sidebar from './Sidebar';
import { useState, Fragment } from 'react';
import { useSelector } from 'react-redux';
import Search from '@components/customs/search';
import { Outlet } from 'react-router-dom';

// type Props = { children: ReactNode }

const FrontendLayout = () => {
   const [isOpen, setIsOpen] = useState(false);
   const navLoading = useSelector((state: IRootState) => state.RDnav.navLoading);

   return (
      <Fragment>
         <section className={`${isOpen ? "blur-sm sticky" : ""}`}>
            <NavBar isOpenSearch={isOpen} returnIsOpen={setIsOpen} />
            {/* loading */}
            <nav className={navLoading ? `fixed top-0 w-full z-[100]` : `hidden`}>
               <div className="loader-line"></div>
            </nav>
            {/* sidebar */}
            <Sidebar />
            {/* main */}
            <main className="flex h-full bg-gray-100 dark:text-slate-300">
               <div className="mt-16 md:ml-[80px] xl:ml-[200px] flex-grow max-w-full lg:w-[120px] p-2 sm:p-5 min-h-[92vh] h-full dark:bg-zinc-900">
                  <Outlet />
               </div>
            </main>
            {/* <Footer /> */}
            <MenuBar />
         </section>
         <Search isOpen={isOpen} returnIsOpen={setIsOpen} />
      </Fragment>
   )
}
export default FrontendLayout;