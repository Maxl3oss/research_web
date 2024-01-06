import { Fragment, useEffect, useState } from 'react'
import { DonutChart } from './ChartDashboard'
import { GetDashboard } from '@services/private/dashboard.services';
import { IResponse } from '@interfaces/research.interface';

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
      <section className="w-full grid grid-cols-3">
        <div className="!rounded-3xl bg-back-theme p-5 border">
          โดรงการ/วิจัย
          <div className="inline-block mt-5">
            <DonutChart
              labels={raw?.research.labels}
              data={raw?.research.data}
              cutout={40}
            />
          </div>
        </div>
      </section>
    </Fragment >
  )
}

export default MainDashBoard