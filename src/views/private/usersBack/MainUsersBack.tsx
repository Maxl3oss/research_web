import { Button, Input } from '@components/base'
import { IResponse, ISearch } from '@interfaces/research.interface';
import { Fragment, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
// import FakerData from '../../public/research/FakerData.json';
import Pagination from '@components/base/pagination';
import { IPagin } from '@interfaces/pagin.interface';
import { ManagementGetUsersAll } from '@services/private/users.services';
import ShowDataUsersBack from './ShowDataUsersBack';
import ResearchAlert from '@components/customs/alert';
import { DeleteUserById, VerifyUserById } from '@services/user.service';
import { ResponseAlert } from '@components/helper/CustomAlert';
import { useNavigate } from 'react-router-dom';
export interface IUsersBack {
  id: string;
  profile: string;
  prefix: string;
  first_name: string;
  last_name: string;
  email: string;
  status: number;
}

function MainUsersBack() {
  const navigate = useNavigate();
  const { register, handleSubmit, getValues, reset } = useForm<ISearch>();
  // const onSubmit = (data: ISearch) => console.log(data);
  // const FakerDataSlice = FakerData.length > 5 ? FakerData.slice(0, 5) : FakerData;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [raw, setRaw] = useState<IUsersBack[]>([]);
  const [pagin, setPagin] = useState<IPagin>({
    page: 1,
    pageSize: 10,
    total: 0,
    totalPage: 10,
  });
  const onSubmit = (values: ISearch) => FetchData(1, pagin.pageSize, values.search);

  async function FetchData(page = 1, pageSize = 10, search = "", isLoading = true) {
    setIsLoading(isLoading);
    const res: IResponse = await ManagementGetUsersAll(page, pageSize, search);
    setIsLoading(false);
    if (res) {
      setRaw(res.data);
      setPagin(res.pagin);
    }
  }

  async function handleVerify(id: string) {
    ResearchAlert({
      timer: 0,
      title: "คุณแน่ใจ !!!",
      text: "คุณต้องการยืนยันผู้ใช้รายนี้ใช่หรือไม่?",
      icon: "question",
      showConfirmButton: true,
      showCancelButton: true,
    }).then(async ({ isConfirmed }) => {
      if (isConfirmed) {
        const res: Omit<IResponse, 'pagin'> = await VerifyUserById(id);
        if (res && (res.statusCode === 200 && res.taskStatus)) {
          ResponseAlert(res);
          FetchData(pagin.page, pagin.pageSize, getValues("search"), false);
        }
      }
    });
  }

  async function handleDelete(id: string) {
    ResearchAlert({
      timer: 0,
      title: "คุณแน่ใจ !!!",
      text: "คุณต้องการลบรายการนี้ใช่หรือไม่?",
      icon: "question",
      showConfirmButton: true,
      showCancelButton: true,
    }).then(async ({ isConfirmed }) => {
      if (isConfirmed) {
        const res: Omit<IResponse, 'pagin'> = await DeleteUserById(id);
        if (res && (res.statusCode === 200 && res.taskStatus)) {
          ResponseAlert(res);
          resetBtn();
        }
      }
    });
  }

  const handleChangePage = async (userId: string) => {
    const state = {
      userId: userId
    }
    navigate("/back/users/update", { state });
  }

  useEffect(() => {
    FetchData();
  }, []);

  function resetBtn() {
    const element = document.getElementById("resetBtn");
    if (element) {
      element.click();
    }
  }

  return (
    <Fragment>
      <h3 className="font-semibold text-xl sm:text-2xl mb-5">ผู้ใช้งาน</h3>
      <div className="bg-back-theme p-5 rounded-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap gap-3" >
          <div className="w-full sm:flex-1 max-w-md">
            <label>ค้นหา</label>
            <Input register={register} name="search" />
          </div>
          <div className="w-full sm:w-fit flex items-end justify-end sm:justify-start gap-3">
            <Button type="submit" className="btn-primary">ค้นหา</Button>
            <Button type="reset" id="resetBtn" onClick={() => {
              FetchData();
              reset();
            }} className="btn-secondary">ล้างค่า</Button>
          </div>
        </form>
        <ShowDataUsersBack
          raw={raw}
          pagin={pagin}
          isLoading={isLoading}
          onVerify={handleVerify}
          onUpdate={handleChangePage}
          onDelete={handleDelete}
        />
      </div>
      <div className="flex justify-end pt-5">
        <Pagination
          pagin={pagin}
          onPageChange={(curr) => {
            FetchData(curr, 10, getValues("search"))
          }}
        />
      </div>
    </Fragment >
  )
}

export default MainUsersBack