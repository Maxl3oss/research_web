import StarRating from '@components/base/starRating';
import ResearchAlert from '@components/customs/alert';
import { FindPrefix, FormatterDate, FormatterNumber } from '@components/helper/FunctionHelper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IResearch, IResponse } from '@interfaces/research.interface';
import { DownloadPdfWaterMarK, GetResearchDetailByUserId, LikeResearch, RatingStarsResearch } from '@services/research.service';
import { IRootState } from '@store/index';
import { setNavLoading } from '@store/nav.store/nav.slice';
import { Fragment, useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import MainComments from './comments/MainComments';

export default function DetailResearch() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state: IRootState) => state.RDauth.user);
  const { id } = useLocation()?.state ?? "";
  const [raw, setRaw] = useState<IResearch | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDownload, setIsDownload] = useState(false);
  const [showMore, setShowMore] = useState(false);

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
        text: "คุณต้องการเข้าสู่ระบบใช่หรือไม่ ?",
        icon: "question",
        showConfirmButton: true,
        showCancelButton: true,
      }).then(async ({ isConfirmed }) => {
        if (isConfirmed) {
          navigate("/signIn");
          return false;
        }
      });
      return false;
    }
    return true;
  }

  const handleDownload = async (fileName: string, fileUrl: string) => {
    const check = handleUser();
    if (!check) return;
    try {
      setIsDownload(true);
      // const response = await fetch(fileUrl);
      // const blob = await response.blob();

      // // Create a URL for the blob
      // const blobUrl = window.URL.createObjectURL(blob);

      // // Create a link element
      // const link = document.createElement("a");
      // link.href = blobUrl;
      // link.download = fileName + ".pdf"; // Set the file name for download
      // document.body.appendChild(link);

      // // Initiate download
      // link.click();

      // // Clean up
      // document.body.removeChild(link);
      // window.URL.revokeObjectURL(blobUrl);
      const res = await DownloadPdfWaterMarK("pkvc phuket", fileUrl);
      if (res) {
        const url = window.URL.createObjectURL(new Blob([res]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${fileName}.pdf`);
        document.body.appendChild(link);
        link.click();

        // Cleanup
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
      }
      setIsDownload(false);
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  };

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
        <div className="px-3 lg:px-5 flex flex-grow flex-wrap w-full bg-transparent border-base shadow-md rounded-xl">
          <div className="animate-pulse bg-loading rounded flex justify-center w-full lg:w-6/12 p-[1px] h-[450px] lg:h-[842px] lg:min-w-[595px]"> </div>
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
            <div className="flex h-36 border-base gap-x-5 p-3 rounded-md animate-pulse">
              <div className="w-4/12 bg-loading h-full"></div>
              <div className="w-8/12 bg-loading h-full"></div>
            </div>
          </div>
        </div>
        : raw ? (
          <div className="p-5 px-1 md:px-5 flex flex-grow flex-wrap w-full bg-white shadow-md dark:bg-zinc-800 rounded-xl">
            <div className="mx-3 lg:mx-0 flex justify-center w-full xl:w-6/12 border p-[1px] h-[450px] lg:h-[842px] lg:min-w-[595px]">
              <LazyLoadImage effect="blur" src={raw?.image_url as string} className="object-contain lg:object-cover h-full w-full" alt="" />
            </div>
            <section className="grid place-self-start w-full flex-none lg:flex-1 pl-0 lg:pl-3">
              <div className="relative w-full flex flex-col border-b border-zinc-700 p-5">
                <h2 className="text-2xl font-semibold">{raw?.title}</h2>
                <span>({raw?.title_alternative})</span>
                <div className="flex justify-end">
                  <StarRating isChange onClickStar={handleOnClickRating} rating={raw?.average_rating} />
                </div>
                {/* like */}
                <div onClick={() => handleLike(raw.id)} className="absolute top-0 right-0 text-center">
                  <div className="cursor-pointer p-2 w-10 h-10 hover:bg-zinc-700 rounded-full">
                    {raw.like ?
                      <FontAwesomeIcon className="text-2xl" icon={["fas", "heart"]} />
                      :
                      <FontAwesomeIcon className="text-2xl" icon={["far", "heart"]} />
                    }
                  </div>
                  {FormatterNumber(raw.likes ?? 0)}
                </div>
              </div>

              <div className="detail-text-container">
                <p className="w-3/12">จัดทำโดย</p>
                <span className="detail-text">{`${FindPrefix(raw?.user_info?.prefix)}${raw?.user_info?.first_name} ${raw?.user_info?.last_name}`}</span>
              </div>

              <div className="detail-text-container">
                <p className="w-3/12">รายวิชา</p>
                <span className="detail-text">{raw?.subject}</span>
              </div>

              <div className="detail-text-container">
                <p className="w-3/12">คำอธิบาย</p>
                <span className="detail-text">
                  {!showMore && raw?.description.length > 255
                    ?
                    <Fragment>
                      {raw?.description.substring(0, 255)}...
                      <b onClick={() => setShowMore(true)} className={`${raw?.description.length > 25 ? "indent-5" : ""} text-sm font-semibold underline cursor-pointer`}>ดูเพิ่มเติม</b>
                    </Fragment>
                    :
                    <Fragment>
                      {raw?.description}
                      <b onClick={() => setShowMore(false)} className={`${raw?.description.length > 25 ? "indent-5" : ""} text-sm font-semibold underline cursor-pointer ml-2`}>ดูน้อยลง</b>
                    </Fragment>
                  }
                </span>
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
                <span className="detail-text">{FormatterDate(raw?.created_date)}</span>
              </div>

              <div className="detail-text-container">
                <p className="w-3/12">แหล่งที่มา</p>
                <span className="detail-text">{raw?.source}</span>
              </div>

              <div className="detail-text-container">
                <p className="w-3/12">สิทธิ์</p>
                <span className="detail-text">{raw?.rights}</span>
              </div>

              <div className="detail-text-container !items-center">
                <p className="w-3/12">แนบไฟล์</p>

                <div onClick={() => handleDownload(raw?.file_name, (raw?.file_url as string))} className={`${raw?.file_name === "" && "hidden"} relative grow min-w-[320px] cursor-pointer`}>
                  <label title="Click to upload" htmlFor="file_download" className={`cursor-pointer flex items-center gap-4 px-6 py-4 group bg-theme rounded-xl`}>
                    <div className="w-max">
                      <FontAwesomeIcon className="text-xl" icon={["fas", "file-pdf"]} />
                    </div>
                    <div className="relative">
                      <div className="block">
                        <span className="block text-sm font-semibold line-clamp-1">
                          {raw?.file_name as string}
                        </span>
                        <span className="mt-0.5 block text-xs text-gray-500 dark:text-gray-400">Max 10 MB and type file (PDF)</span>
                      </div>

                    </div>
                  </label>

                  <div className="absolute h-full top-0 right-2 px-4 flex-ij-center">
                    <FontAwesomeIcon
                      icon={isDownload ? ["fas", "circle-notch"] : ["fas", "download"]}
                      className={`${isDownload ? "animate-spin" : ""} text-xl cursor-pointer`}
                    />
                  </div>
                </div>

              </div>
            </section>
          </div>
        ) : null}
      <MainComments researchId={id} />
    </Fragment>
  )
}
