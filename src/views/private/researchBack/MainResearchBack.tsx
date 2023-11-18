import { Button, Input } from '@components/base'
import { IResponse, ISearch } from '@interfaces/research.interface';
import { Fragment, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Pagination from '@components/base/pagination';
import { IPagin } from '@interfaces/pagin.interface';
import { ManagementGetResearchAll, VerifyResearchById } from '@services/private/researchs.services';
import ShowDataResearchBack from './ShowDataResearchBack';
import { useNavigate } from 'react-router-dom';
import ResearchAlert from '@components/customs/alert';
import { ResponseAlert } from '@components/helper/CustomAlert';
// import { useSelector } from 'react-redux';
// import { IRootState } from '@store/index';
import { DeleteResearch } from '@services/research.service';
interface UserInfo {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface IRawResearchBack {
  id: number;
  status: number;
  title: string;
  description: string;
  user_info: UserInfo;
}

function MainResearchBack() {
  const navigate = useNavigate();
  const { register, handleSubmit, getValues, reset } = useForm<ISearch>();
  const [isLoading, setIsLoading] = useState(true);
  const [raw, setRaw] = useState<IRawResearchBack[]>([]);
  const [pagin, setPagin] = useState<IPagin>({
    page: 1,
    pageSize: 10,
    total: 0,
    totalPage: 10,
  });
  const onSubmit = (values: ISearch) => FetchData(1, pagin.pageSize, values.search);

  async function FetchData(page = 1, pageSize = 10, search = "", isLoading = true) {
    setIsLoading(isLoading);
    const res: IResponse<IRawResearchBack[]> = await ManagementGetResearchAll(page, pageSize, search);
    setIsLoading(false);
    if (res) {
      setRaw(res.data);
      setPagin(res.pagin);
    }
  }

  const handleChangePage = async (id: number) => {
    const state = {
      id: id
    }
    navigate("/back/research/update", { state });
  }

  async function handleDelete(id: number) {
    ResearchAlert({
      timer: 0,
      title: "คุณแน่ใจ !!!",
      text: "คุณต้องการลบรายการนี้ใช่หรือไม่?",
      icon: "question",
      showConfirmButton: true,
      showCancelButton: true,
    }).then(async ({ isConfirmed }) => {
      if (isConfirmed) {
        const res: Omit<IResponse, 'pagin'> = await DeleteResearch(id);
        if (res && (res.statusCode === 200 && res.taskStatus)) {
          ResponseAlert(res);
          resetBtn();
        }
      }
    });
  }

  async function handleVerify(id: number) {
    ResearchAlert({
      timer: 0,
      title: "คุณแน่ใจ !!!",
      text: "คุณต้องการยืนยันรายการนี้ใช่หรือไม่?",
      icon: "question",
      showConfirmButton: true,
      showCancelButton: true,
    }).then(async ({ isConfirmed }) => {
      if (isConfirmed) {
        const res: Omit<IResponse, 'pagin'> = await VerifyResearchById(id);
        if (res && (res.statusCode === 200 && res.taskStatus)) {
          ResponseAlert(res);
          FetchData(pagin.page, pagin.pageSize, getValues("search"), false);
        }
      }
    });
  }

  useEffect(() => {
    Promise.all([FetchData()]);
  }, []);

  function resetBtn() {
    const element = document.getElementById("resetBtn");
    if (element) {
      element.click();
    }
  }

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
            <Button id="resetBtn" type="reset" onClick={() => {
              FetchData();
              reset();
            }} className="btn-secondary">ล้างค่า</Button>
          </div>
        </form>

        <ShowDataResearchBack
          raw={raw}
          pagin={pagin}
          isLoading={isLoading}
          onClick={handleChangePage}
          onDelete={handleDelete}
          onVerify={handleVerify}
        />
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