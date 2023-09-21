import { Outlet } from 'react-router-dom';
import BackNav from './BackNav';
import BackSide from './BackSide';
import "@assets/css/_backLayout.css";

const BackendLayout = () => {
   return (
      <div className="flex flex-row min-h-screen bg-dark">
         {/* <Sidebar /> */}
         <div className="flex flex-col w-full bg-dark">
            <BackNav />
            <BackSide />
            {/* <Nav /> */}
            <main className="flex h-full layout-theme md:px-0 px-2">
               <div className="layout-size md:ml-[80px] xl:ml-[200px] flex-grow max-w-full lg:w-[120px] p-2 md:p-5 min-h-[91vh] h-full">
                  <Outlet />
               </div>
            </main>
         </div>
         {/* <Menubar /> */}
      </div>
   )
}

export default BackendLayout