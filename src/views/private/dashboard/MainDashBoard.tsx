import { Fragment } from 'react'
import { DonutChart, PieChart } from './ChartDashboard'
import FakerData from '../../public/research/FakerData.json';
function MainDashBoard() {
  const FakerDataSlice = FakerData.length > 5 ? FakerData.slice(0, 5) : FakerData;
  return (
    <Fragment>
      <h3 className="font-semibold text-xl sm:text-2xl mb-5">แดชบอร์ด</h3>
      <section className="grid grid-rows-2 grid-cols-4 gap-3 max-h-[calc(100vh_-_10rem)]">
        <div className="row-span-2 col-span-4 md:col-span-3 lg:col-span-2 grid gap-3 w-full bg-back-theme p-5 rounded-xl">
          <h1>Users</h1>
          <div className="flex justify-center items-center pb-3">
            <PieChart className="w-full h-full" />
          </div>
        </div>
        <div className="row-span-1 col-span-2 md:col-span-1 grid gap-3 bg-back-theme p-5 rounded-xl">
          <div className="flex flex-col gap-3 w-full">
            โดรงการ/วิจัย
            <div className="inline-block">
              <DonutChart cutout={100} />
            </div>
          </div>
        </div>
        <div className="order-last lg:order-none row-span-1 lg:row-span-2 col-span-4 lg:col-span-1 bg-back-theme p-5 rounded-xl">
          <div className="overflow-auto max-h-60 w-full">
            {FakerDataSlice.map((curr, idx) => (
              <p className="h-96" key={idx}>
                {curr.viewed}
              </p>
            ))}
          </div>
        </div>
        <div className="row-span-1 col-span-2 md:col-span-1 grid gap-3 bg-back-theme p-5 rounded-xl">
          <div className="flex flex-col gap-3 w-full">
            ผู้ใช้งาน
            <div className="inline-block">
              <DonutChart cutout={100} />
            </div>
          </div>
        </div>
      </section>
    </Fragment >
  )
}

export default MainDashBoard