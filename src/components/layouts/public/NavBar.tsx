import { useDispatch } from 'react-redux';
import { Input } from '../../base'
import ToggleDarkMode from '../../base/toggleDarkMode/index';
import { useSelector } from 'react-redux';
import { setSearch } from '../../../store/search.store/search.slice';
import Button from '../../base/button/index';
import Lucide from '../../base/lucide/index';

export default function NavBar() {
  const search = useSelector((state: any) => state.search.search);
  const dispatch = useDispatch();

  return (
    <header className="hidden md:flex bg-white dark:bg-zinc-900 dark:text-white">
      <div className="p-5 w-full flex items-center border rounded-md dark:border-zinc-800">
        <div className="min-w-[280px]">
          <span className="text-2xl font-bold">Research</span>
        </div>
        <div className="flex justify-between items-center w-full">
          <div className="flex w-full gap-2">
            <Input onChange={(e: any) => dispatch(setSearch(e.target.value))} className="w-4/12 min-w-[220px]" placeholder="Search" type="text" value={search} />
            <Button className="w-fit px-3">
              <Lucide name="Search" size='18' />
            </Button>
          </div>
          <div className="flex items-center min-w-fit gap-2">
            <img className="w-8 h-8 rounded-full" src="https://i.pinimg.com/736x/80/17/86/80178693d1d0c7e0ec688707b02ecc0b.jpg" alt="" />
            <span>Narongrid</span>
            <ToggleDarkMode />
          </div>
        </div>
      </div>
    </header>
  )
}
