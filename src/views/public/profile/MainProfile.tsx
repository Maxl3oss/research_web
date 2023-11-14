import { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IResponse } from '@interfaces/research.interface';
import { DeleteResearch, GetResearchByUserId } from '@services/research.service';
import { IPagin } from '@interfaces/pagin.interface';
import { useSelector } from 'react-redux';
import { IRootState } from '@store/index';
import ShowDataProfile from './ShowDataProfile';
import Pagination from '@components/base/pagination';
import NoProfile from '../../../assets/images/NoProfile.png';
import { FindPrefix, FormatterNumber } from '@components/helper/FunctionHelper';
import { ResponseAlert } from '@components/helper/CustomAlert';
import ResearchAlert from '@components/customs/alert';

export interface IResearchByUserList {
  id: number;
  title: string;
  image_url: string;
  description: string;
}
interface IRawData {
  countResearch: number;
  dataResearch: IResearchByUserList[];
}

type TActive = 1 | 2 | 3 | 4;

function MainProfile() {
  const navigate = useNavigate();
  const userInfo = useSelector((state: IRootState) => state.RDauth.user);
  const [activeTabs, setActiveTabs] = useState<TActive>(3);
  const [raw, setRaw] = useState<IRawData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pagin, setPagin] = useState<IPagin>({
    page: 1,
    pageSize: 10,
    total: 1,
    totalPage: 1,
  });

  async function FetchData(userId = "", status = 3, page = 1, pageSize = 10) {
    setIsLoading(true);
    const res: IResponse<IRawData> = await GetResearchByUserId(userId, page, pageSize, status);
    setIsLoading(false);
    if (res) {
      setRaw(res.data);
      setPagin(res.pagin);
    }
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
          FetchData(userInfo?.id, activeTabs);
        }
      }
    });
  }

  const handleChangeTabs = (tab: TActive) => {
    if (userInfo?.id) {
      Promise.all([FetchData(userInfo?.id, tab)]);
      setActiveTabs(tab);
    }
  }

  const handleChangePage = async (id: number) => {
    const state = {
      id: id
    }
    navigate("/research/detail-research", { state });
  }

  const handleUpdate = (id: number) => {
    const state = {
      state: {
        id: id
      }
    }
    navigate("/research/update", state)
  }

  useEffect(() => {
    if (userInfo?.id) {
      Promise.all([FetchData(userInfo?.id)]);
    }
  }, [userInfo?.id]);

  return (
    <Fragment>
      {/* <CustomAlert onChange={(is) => setRsAlert((prev) => ({ ...prev, isShow: is }))} alert={rsAlert} /> */}
      <div className="relative w-full flex flex-col items-center">
        {/* header */}
        <section className="w-full md:w-10/12 flex pt-5 px-3">
          <div className="inline-block">
            <img
              className="rounded-full object-cover h-32 w-32"
              src={userInfo?.profile || ""}
              onError={({ currentTarget }) => currentTarget.src = NoProfile}
              alt=""
            />
          </div>
          <div className="pl-10 flex flex-1 text-start">
            <fieldset className="grid space-y-1 place-self-center">
              <h3 className="text-xl font-medium">{FindPrefix(userInfo?.prefix) + userInfo?.first_name + " " + userInfo?.last_name}</h3>
              <span className="text-sm text-zinc-400">{userInfo?.email}</span>
              <span className="text-sm text-zinc-400">วิจัย/รายงาน {FormatterNumber(raw?.countResearch)} รายการ</span>
            </fieldset>
          </div>
        </section>
        <section className="flex justify-center w-full mt-5 border-b border-zinc-800">
          <div className="w-full md:w-10/12 flex items-center text-sm gap-2 text-zinc-400">
            <span onClick={() => handleChangeTabs(3)} className={(activeTabs === 3 ? "border-b text-indigo-600 border-indigo-600" : "dark:hover:text-zinc-300") + " p-3 w-28 text-center cursor-pointer rounded-t"}>
              ทั้งหมด
            </span>
            <span onClick={() => handleChangeTabs(1)} className={(activeTabs === 1 ? "border-b text-indigo-600 border-indigo-600" : "dark:hover:text-zinc-300") + " p-3 w-28 text-center cursor-pointer rounded-t"}>
              เผยแพร่แล้ว
            </span>
            <span onClick={() => handleChangeTabs(2)} className={(activeTabs === 2 ? "border-b text-indigo-600 border-indigo-600" : "dark:hover:text-zinc-300") + " p-3 w-28 text-center cursor-pointer rounded-t"}>
              ยังไม่เผยแพร่
            </span>
            <span onClick={() => handleChangeTabs(4)} className={(activeTabs === 4 ? "border-b text-indigo-600 border-indigo-600" : "dark:hover:text-zinc-300") + " p-3 w-28 text-center cursor-pointer rounded-t"}>
              ถูกใจ
            </span>
            <div className="hidden md:flex justify-end flex-1">
              <Link to="/research/create" className="btn-link !w-16">เพิ่ม</Link>
            </div>
          </div>
        </section>
        <section className="flex justify-center w-full mt-5">
          <div className="flex w-full md:w-10/12">
            {/* <TabResult /> */}
            <ShowDataProfile
              raw={raw?.dataResearch || []}
              activeTabs={activeTabs}
              isLoading={isLoading}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              onViews={handleChangePage}
            />
          </div>
        </section>

        <div className="flex w-full md:w-10/12 justify-end pt-5">
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
      </div>
    </Fragment>
  )
}

export default MainProfile