import MenuBar from './MenuBar';
import NavBar from './NavBar';
import Sidebar from './Sidebar';

const FrontendLayout = ({ children }: any) => {
   return (
      <div className="flex flex-col min-h-screen ">
         <NavBar />
         <div className="flex h-full dark:text-slate-300 dark:bg-zinc-900 ">
            <Sidebar />
            <main className="flex-grow max-w-full md:w-[280px]">{children}</main>
         </div>
         <MenuBar />
         {/* <Footer /> */}
      </div>
   )
}
export default FrontendLayout;