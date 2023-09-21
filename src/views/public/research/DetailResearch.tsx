import { setNavLoading } from '@store/nav.store/nav.slice';
import { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

export default function DetailResearch() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useLocation()?.state ?? "";

  useEffect(() => {
    dispatch(setNavLoading(false));
  }, [dispatch]);

  useEffect(() => {
    !data && navigate("/research");
  }, []);

  return (
    <Fragment>
      {data ? (
        <div className="p-5 flex flex-grow flex-wrap w-full bg-white shadow-md dark:bg-zinc-800 rounded-xl">
          <div className="flex justify-center w-full lg:w-6/12 border p-[1px] lg:h-[842px] lg:min-w-[595px]">
            <img src={data?.image_url} alt="" />
          </div>
          <fieldset className="grid place-self-start w-full flex-none lg:flex-1 pl-0 lg:pl-3">
            <div className="w-full flex flex-col border-b border-zinc-700 p-5">
              <h2 className="text-2xl font-semibold">{data?.title}</h2>
              <span>{data?.title_alternative}</span>
            </div>

            <div className="detail-text-container">
              <p className="w-3/12">ชื่อผู้สร้าง</p>
              <span className="detail-text">{`${data?.user_info.prefix}${data?.user_info.first_name} ${data?.user_info.last_name}`}</span>
            </div>

            <div className="detail-text-container">
              <p className="w-3/12">รายวิชา</p>
              <span className="detail-text">{data?.subject}</span>
            </div>

            <div className="detail-text-container">
              <p className="w-3/12">คำอธิบาย</p>
              <span className="detail-text">{data?.description}</span>
            </div>

            <div className="detail-text-container">
              <p className="w-3/12">สำนักพิมพ์</p>
              <span className="detail-text">{data?.publisher}</span>
            </div>

            <div className="detail-text-container">
              <p className="w-3/12">ผู้ให้ข้อมูล</p>
              <span className="detail-text">{data?.contributor}</span>
            </div>

            <div className="detail-text-container">
              <p className="w-3/12">วันที่</p>
              <span className="detail-text">{data?.created_date}</span>
            </div>

            <div className="detail-text-container">
              <p className="w-3/12">แหล่งที่มา</p>
              <span className="detail-text">{data?.source}</span>
            </div>

            <div className="detail-text-container">
              <p className="w-3/12">สิทธิ์</p>
              <span className="detail-text">{data?.rights}</span>
            </div>

            <div className="detail-text-container">
              <p className="w-3/12">แนบไฟล์</p>
              <span className="w-full flex items-center justify-between lg:w-8/12 text-sm border-gray-300 dark:border-zinc-600 border rounded-lg p-2">
                {data?.file_url.split("/").slice(-1)[0]}
                <a className="text-xs text-indigo-600" href="http://">Download</a>
              </span>
            </div>
          </fieldset>
        </div>
      ) : null}
    </Fragment>
  )
}
