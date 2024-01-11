import { Fragment, useEffect, useState } from 'react'
import { DonutChart } from './ChartDashboard'
import { GetDashboard } from '@services/private/dashboard.services';
import { IResponse } from '@interfaces/research.interface';
import { FormatterNumber } from '@components/helper/FunctionHelper';

type User = {
  labels: string[];
  data: number[];
  total: number;
}

type Research = {
  labels: string[];
  data: number[];
  total: number;
  researchLikes: number;
  researchByCreatedDate: {
    _count: {
      created_date: number;
    };
    created_date: string;
  }[];
  totalViews: number;
}

type IRaw = {
  user: User;
  research: Research;
}

function MainDashBoard() {
  const [raw, setRaw] = useState<IRaw | null>(null);

  async function fetchData() {
    const res: IResponse<IRaw> = await GetDashboard();
    if (res && (res.taskStatus && res.statusCode === 200)) {
      setRaw(res.data);
      console.log(res.data)
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Fragment>
      <h3 className="font-semibold text-xl sm:text-2xl mb-5">แดชบอร์ด</h3>
      <section className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        <div className="flex flex-col gap-y-3 !rounded-3xl bg-back-theme p-5 border">
          <div className="flex items-end justify-between">
            <h3 className="text-lg font-semibold">โดรงการ/วิจัย</h3>
            <p className="text-xs">ทั้งหมด {FormatterNumber(raw?.research?.total ?? 0)} รายการ</p>
          </div>
          <div className="inline-block h-40">
            <DonutChart
              labels={raw?.research.labels}
              data={raw?.research.data}
              cutout={30}
            />
          </div>
        </div>

        <div className="flex flex-col gap-y-3 !rounded-3xl bg-back-theme p-5 border">
          <div className="flex items-end justify-between">
            <h3 className="text-lg font-semibold">ผู้เข้าใช้งาน</h3>
            <p className="text-xs">ทั้งหมด {FormatterNumber(raw?.user?.total ?? 0)} รายการ</p>
          </div>
          <div className="relative inline-block h-40 w-full">
            <DonutChart
              labels={raw?.user.labels}
              data={raw?.user.data}
              cutout={30}
            />
          </div>
        </div>

        <div className="flex flex-col gap-y-3 !rounded-3xl bg-back-theme p-5 border">
          <h3 className="text-lg font-semibold">ยอดเข้าชมทั้งหมด</h3>
          <div className="text-center">
            <h1 className="text-5xl">{FormatterNumber(raw?.research.totalViews)}</h1>
          </div>
          <h3 className="text-lg font-semibold">ยอดกดไลค์ทั้งหมด</h3>
          <div className="text-center">
            <h1 className="text-5xl">{FormatterNumber(raw?.research.researchLikes)}</h1>
          </div>
        </div>
      </section>
    </Fragment >
  )
}

export default MainDashBoard