import { Fragment, useState } from 'react';
import TabResult from '../../../components/customs/search/TabResult';
import { Button } from '@components/base';
import { Link } from 'react-router-dom';

function MainProfile() {
  const [activeTabs, setActiveTabs] = useState<1 | 2 | 3>(1);
  return (
    <Fragment>
      <div className="w-full flex flex-col items-center">
        {/* header */}
        <section className="w-10/12 flex pt-5 px-3">
          <div className="inline-block">
            <img
              className="rounded-full h-32 w-32"
              src="https://i.pinimg.com/736x/80/17/86/80178693d1d0c7e0ec688707b02ecc0b.jpg"
              alt=""
            />
          </div>
          <div className="pl-10 flex flex-1 text-start">
            <fieldset className="grid space-y-1 place-self-center">
              <h3 className="text-xl font-medium">นายณรงค์ฤทธิ์ หน่อคำ</h3>
              <span className="text-sm text-zinc-400">narongrid.dev@gmail.com</span>
              <span className="text-sm text-zinc-400">วิจัย/รายงาน 2 รายการ</span>
            </fieldset>
          </div>
        </section>
        <section className="flex justify-center w-full mt-5 border-b border-zinc-800">
          <div className="flex items-center text-sm gap-2 w-10/12 text-zinc-400">
            <span onClick={() => setActiveTabs(1)} className={(activeTabs === 1 ? "border-b text-indigo-600 border-indigo-600" : "dark:hover:text-zinc-300") + " p-3 w-28 text-center cursor-pointer rounded-t"}>
              ทั้งหมด
            </span>
            <span onClick={() => setActiveTabs(2)} className={(activeTabs === 2 ? "border-b text-indigo-600 border-indigo-600" : "dark:hover:text-zinc-300") + " p-3 w-28 text-center cursor-pointer rounded-t"}>
              เผยแพร่แล้ว
            </span>
            <span onClick={() => setActiveTabs(3)} className={(activeTabs === 3 ? "border-b text-indigo-600 border-indigo-600" : "dark:hover:text-zinc-300") + " p-3 w-28 text-center cursor-pointer rounded-t"}>
              ยังไม่เผยแพร่
            </span>
            <div className="flex flex-1 justify-end">
              <Link to="/research/create" className="btn-link">เพิ่ม</Link>
            </div>
          </div>
        </section>
        <section className="flex justify-center w-full mt-5">
          <div className="flex w-10/12">
            <TabResult />
          </div>
        </section>
      </div>
    </Fragment>
  )
}

export default MainProfile