import { Button, Input } from '@components/base'
import { ISearch } from '@interfaces/research.interface';
import { Fragment, useState } from 'react'
import { useForm } from 'react-hook-form';
import FakerData from '../../public/research/FakerData.json';
import Pagination from '@components/base/pagination';
import { IPagin } from '@interfaces/pagin.interface';

function MainResearchBack() {
  const { register, handleSubmit } = useForm<ISearch>();
  const onSubmit = (data: ISearch) => console.log(data);
  const FakerDataSlice = FakerData.length > 5 ? FakerData.slice(0, 5) : FakerData;
  const [pagin, setPagin] = useState<IPagin>({
    page: 1,
    pageSize: 10,
    total: 0,
    totalPage: 10,
  });

  return (
    <Fragment>
      <h3 className="font-semibold text-xl sm:text-2xl mb-5">งานวิจัย</h3>
      <div className="bg-back-theme p-5 rounded-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap gap-3" >
          <div className="w-full sm:flex-1 max-w-md">
            <label>ค้นหา</label>
            <Input register={register} name="search" />
          </div>

          <div className="w-full sm:w-fit flex items-end justify-end sm:justify-start gap-3">
            <Button type="submit" className="btn-primary">ค้นหา</Button>
            <Button type="reset" className="btn-secondary">ล้างค่า</Button>
          </div>
        </form>

        <section className="mt-5 w-full">
          {/* <div className="row-span-2 col-span-3 gird max-h-full gap-3 bg-back-theme p-5 rounded-xl"> */}
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
          {/* </div> */}
        </section>
      </div>
      <div className="flex justify-end pt-5">
        <Pagination
          pagin={pagin}
          onPageChange={(curr) => {
            setPagin((prev) => ({
              ...prev,
              page: curr
            }));
          }}
        />
      </div>
    </Fragment>
  )
}

export default MainResearchBack