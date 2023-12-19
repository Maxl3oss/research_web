import { IRootState } from '@store/index';
import MenuBar from './MenuBar';
import NavBar from './NavBar';
import Sidebar from './Sidebar';
import { useState, Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Search from '@components/customs/search';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setNavLoading } from '@store/nav.store/nav.slice';

// type Props = { children: ReactNode }

const FrontendLayout = () => {
   const [isOpen, setIsOpen] = useState(false);
   const dispatch = useDispatch()
   const navLoading = useSelector((state: IRootState) => state.RDnav.navLoading);
   const [sliceSide, setSliceSide] = useState<boolean | null>(null);

   useEffect(() => {
      setTimeout(() => {
         if (navLoading) {
            dispatch(setNavLoading(false))
         }
      }, (5000));
   }, [navLoading]);

   return (
      <Fragment>
         <div className={`${isOpen ? "blur-sm sticky" : ""} relative layout-theme`}>
            <NavBar isOpenSearch={isOpen} returnIsOpen={setIsOpen} sliceSide={sliceSide} returnSliceSide={setSliceSide} />
            {/* loading */}
            <nav className={navLoading ? `fixed top-0 w-full z-[100]` : `hidden`}>
               <div className="loader-line"></div>
            </nav>
            {/* sidebar */}
            <Sidebar sliceSide={sliceSide} />
            {/* main */}
            <main className="flex h-full md:px-0 px-2">
               <div className={(sliceSide === null ? "layout-size" : sliceSide ? "md:max-w-[calc(100vw_-_200px)] md:ml-[200px]" : "md:max-w-[calc(100vw_-_80px)] md:ml-[80px]") + " max-w-full flex-grow p-0 lg:p-5 min-h-[91vh] h-full transition-all duration-200 translate-x-0"}>
                  <Outlet />
               </div>
            </main>
            {/* <Footer /> */}
            <MenuBar />
         </div>
         <Search isOpen={isOpen} returnIsOpen={setIsOpen} />
      </Fragment>
   )
}
export default FrontendLayout;