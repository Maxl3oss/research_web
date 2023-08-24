import { Fragment } from 'react'
import { DonutChart, PieChart } from './ChartDashboard'
import FakerData from '../../public/research/FakerData.json';
function MainDashBoard() {
  const FakerDataSlice = FakerData.length > 5 ? FakerData.slice(0, 5) : FakerData;
  return (
    <Fragment>
      <section className="grid grid-rows-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        <div className="row-span-5 md:row-span-3 col-span-2 grid gap-3 w-full bg-back-theme p-5 rounded-xl">
          <h1>Users</h1>
          <div className="w-full h-fit flex items-center justify-center">
            <PieChart className="max-w-full h-96" />
          </div>
        </div>
        <div className="row-span-1 col-span-2 md:col-span-1 grid gap-3 bg-back-theme p-5 rounded-xl">
          <h1>Research</h1>
          <p className="text-xl">100,000 งาน</p>
        </div>
        <div className="row-span-5 col-span-2 md:col-span-1 bg-back-theme p-5 rounded-xl">
          <div className="w-full flex flex-col gap-3">
            {/* <h1>varifly</h1> */}
            {/* <p className="text-xl">1,000 คน</p> */}
            {/* <GradientChart /> */}
            <span>
              ผู้ใช้งาน
              <DonutChart className="max-w-xs max-h-[250px]" cutout={100} />
            </span>
            <span>
              โดรงการ/วิจัย
              <DonutChart className="max-w-xs max-h-[250px]" cutout={100} />
            </span>
          </div>
        </div>
        <div className="row-span-3 lg:row-span-2 col-span-2 lg:col-span-1 grid gap-3 bg-back-theme p-5 rounded-xl">
          <h1>asa</h1>
          <p className="text-xl">100,000 งาน</p>
        </div>
        <div className="row-span-2 col-span-3 gird max-h-full gap-3 bg-back-theme p-5 rounded-xl">
          <h1>ล่าสุด</h1>
          <table className="w-full md:inline-table flex flex-row flex-wrap rounded-lg overflow-y-auto">
            <thead className="">
              {Array.from(FakerDataSlice).map((_, key) => (
                <tr key={key} className="">
                  <th className="p-3 text-left md:w-3/12">Name</th>
                  <th className="p-3 text-left md:w-7/12">Email</th>
                  <th className="p-3 text-left md:w-2/12">Actions</th>
                </tr>
              ))}
            </thead>
            <tbody className="flex-1 md:flex-none">
              {FakerDataSlice.map((curr, index) => (
                <tr key={index} className="flex flex-col flex-nowrap md:table-row mb-2 md:mb-0">
                  <td className="border rounded-md p-3">{curr.title}</td>
                  <td className="border rounded-md p-3">
                    <span className="max-h-16 line-clamp-1">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et mauris nec risus congue iaculis.
                    </span>
                  </td>
                  <td className="border rounded-md p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer">Delete</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </Fragment >
  )
}

export default MainDashBoard