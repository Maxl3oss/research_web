import StarRating from '@components/base/starRating';
import ResearchAlert from '@components/customs/alert';
import { FormatterNumber } from '@components/helper/FunctionHelper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IResearch, IResponse } from '@interfaces/research.interface';
import { GetResearchDetailByUserId, LikeResearch, RatingStarsResearch } from '@services/research.service';
import { IRootState } from '@store/index';
import { setNavLoading } from '@store/nav.store/nav.slice';
import { Fragment, useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

export default function DetailResearch() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state: IRootState) => state.RDauth.user);
  const { id } = useLocation()?.state ?? "";
  const [raw, setRaw] = useState<IResearch | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData(userId: string, id: number, isLoading = true) {
    setIsLoading(isLoading);
    const res: Omit<IResponse<IResearch>, 'pagin'> = await GetResearchDetailByUserId(userId, id);
    setIsLoading(false);
    if (res && (res.statusCode === 200 && res.taskStatus)) {
      setRaw(res.data);
    }
  }

  async function handleOnClickRating(rating: number) {
    const check = handleUser();
    if (!check) return;

    if (id && userInfo?.id) {
      const res: Omit<IResponse, 'pagin'> = await RatingStarsResearch(raw?.id ?? 0, {
        userId: userInfo?.id,
        ratingId: raw?.rating_id,
        rating: rating,
      });
      if (res && (res.statusCode === 200 && res.taskStatus)) {
        fetchData(userInfo?.id, id, false);
      }
    }
  }

  async function handleLike(researchId: number) {
    const check = handleUser();
    if (!check) return;
    
    if (userInfo) {
      const res = await LikeResearch(researchId, userInfo.id);
      // alert
      if (res && (res.statusCode === 200 && res.taskStatus)) {
        fetchData(userInfo.id, id, false);
      }
    }
  }

  function handleUser(): boolean {
    if (!userInfo?.id) {
      ResearchAlert({
        timer: 0,
        title: "ไม่สำเร็จ !!!",
        text: "คุณต้องเข้าสู่ระบบใช่หรือไม่ ?",
        icon: "error",
        showConfirmButton: true,
        showCancelButton: true,
      }).then(async ({ isConfirmed }) => {
        if (isConfirmed) {
          navigate("/");
          return false;
        }
      });
      return false;
    }
    return true;
  }

  useEffect(() => {
    dispatch(setNavLoading(false));
  }, [dispatch]);

  useEffect(() => {
    !id && navigate("/research");
    Promise.all([fetchData(userInfo?.id || "0", id)]);
  }, [id, userInfo?.id, navigate]);

  return (
    <Fragment>
      {isLoading ?
        <div className="p-5 px-1 md:px-5 flex flex-grow flex-wrap w-full bg-transparent border-base shadow-md rounded-xl">
          <div className="animate-pulse bg-loading rounded flex justify-center w-full lg:w-6/12 p-[1px] lg:h-[842px] lg:min-w-[595px]"> </div>
          <div className="h-full space-y-2 grow pl-2">
            <div className="relative h-36 grid p-3 border-base rounded-md animate-pulse">
              <div className="w-4/12 bg-loading h-8"></div>
              <FontAwesomeIcon className="absolute top-5 right-5 text-loading text-2xl" icon={["fas", "heart"]} />
              <div className="grow flex items-end">
                <StarRating className="text-loading" rating={0} />
              </div>
            </div>
            <div className="flex h-14 border-base gap-x-5 p-3 rounded-md animate-pulse">
              <div className="w-4/12 bg-loading h-full"></div>
              <div className="w-8/12 bg-loading h-full"></div>
            </div>
            <div className="flex h-24 border-base gap-x-5 p-3 rounded-md animate-pulse">
              <div className="w-4/12 bg-loading h-full"></div>
              <div className="w-8/12 bg-loading h-full"></div>
            </div>
            <div className="flex h-14 border-base gap-x-5 p-3 rounded-md animate-pulse">
              <div className="w-4/12 bg-loading h-full"></div>
              <div className="w-8/12 bg-loading h-full"></div>
            </div>
            <div className="flex h-14 border-base gap-x-5 p-3 rounded-md animate-pulse">
              <div className="w-4/12 bg-loading h-full"></div>
              <div className="w-8/12 bg-loading h-full"></div>
            </div>
            <div className="flex h-36 border-base gap-x-5 p-3 rounded-md animate-pulse">
              <div className="w-4/12 bg-loading h-full"></div>
              <div className="w-8/12 bg-loading h-full"></div>
            </div>
            <div className="flex h-20 border-base gap-x-5 p-3 rounded-md animate-pulse">
              <div className="w-4/12 bg-loading h-full"></div>
              <div className="w-8/12 bg-loading h-full"></div>
            </div>
            <div className="flex h-11 border-base gap-x-5 p-3 rounded-md animate-pulse">
              <div className="w-4/12 bg-loading h-full"></div>
              <div className="w-8/12 bg-loading h-full"></div>
            </div>
          </div>
        </div>
        : raw ? (
          <div className="p-5 px-1 md:px-5 flex flex-grow flex-wrap w-full bg-white shadow-md dark:bg-zinc-800 rounded-xl">
            <div className="flex justify-center w-full lg:w-6/12 border p-[1px] lg:h-[842px] lg:min-w-[595px]">
              <LazyLoadImage effect="blur" src={raw?.image_url as string} className="object-cover h-full w-full" alt="" />
            </div>
            <fieldset className="grid place-self-start w-full flex-none lg:flex-1 pl-0 lg:pl-3">
              <div className="relative w-full flex flex-col border-b border-zinc-700 p-5">
                <h2 className="text-2xl font-semibold">{raw?.title}</h2>
                <span>{raw?.title_alternative}</span>
                <StarRating isChange onClickStar={handleOnClickRating} rating={raw?.average_rating} />
                {/* like */}
                <div onClick={() => handleLike(raw.id)} className="absolute top-0 right-0 text-center">
                  <div className="cursor-pointer p-2 w-10 h-10 hover:bg-zinc-700 rounded-full">
                    {raw.like ?
                      <FontAwesomeIcon className="text-2xl" icon={["fas", "heart"]} />
                      :
                      <FontAwesomeIcon className="text-2xl" icon={["far", "heart"]} />
                    }
                  </div>
                  {FormatterNumber(raw.likes_count)}
                </div>
              </div>

              <div className="detail-text-container">
                <p className="w-3/12">จัดทำโดย</p>
                <span className="detail-text">{`${raw?.user_info?.prefix}${raw?.user_info?.first_name} ${raw?.user_info?.last_name}`}</span>
              </div>

              <div className="detail-text-container">
                <p className="w-3/12">รายวิชา</p>
                <span className="detail-text">{raw?.subject}</span>
              </div>

              <div className="detail-text-container">
                <p className="w-3/12">คำอธิบาย</p>
                <span className="detail-text indent-5">{raw?.description}</span>
              </div>

              <div className="detail-text-container">
                <p className="w-3/12">สำนักพิมพ์</p>
                <span className="detail-text">{raw?.publisher}</span>
              </div>

              <div className="detail-text-container">
                <p className="w-3/12">ผู้ให้ข้อมูล</p>
                <span className="detail-text">{raw?.contributor}</span>
              </div>

              <div className="detail-text-container">
                <p className="w-3/12">วันที่</p>
                <span className="detail-text">{raw?.created_date}</span>
              </div>

              <div className="detail-text-container">
                <p className="w-3/12">แหล่งที่มา</p>
                <span className="detail-text">{raw?.source}</span>
              </div>

              <div className="detail-text-container">
                <p className="w-3/12">สิทธิ์</p>
                <span className="detail-text">{raw?.rights}</span>
              </div>

              <div className="detail-text-container">
                <p className="w-3/12">แนบไฟล์</p>
                <span className="w-full flex items-center justify-between lg:w-8/12 text-sm border-gray-300 dark:border-zinc-600 border rounded-lg p-2">
                  {(raw?.file_url as string)?.split("/").slice(-1)[0]}
                  <a className="text-xs text-indigo-600" href="http://">Download</a>
                </span>
              </div>
            </fieldset>
          </div>
        ) : null}
    </Fragment>
  )
}
