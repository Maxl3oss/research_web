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
        <div className="p-5 flex flex-grow flex-wrap w-full bg-slate-200 dark:bg-zinc-800 rounded-xl">
          <div className="flex justify-center w-full md:w-1/2 border p-[1px] max-w-[2480px] max-h-[3508px]">
            <img src={data?.image_url} alt="" />
          </div>
          <div className="p-5 grid place-content-start gap-2 w-full md:w-1/2">
            <span className="">ชื่อเรื่อง : {data?.title}</span>
            <span className="">ชื่อเรื่อง(ทางเลือก) : {data?.title_alternative}</span>
            <span className="">ชื่อผู้สร้าง : {`${data?.user_info.prefix}${data?.user_info.first_name} ${data?.user_info.last_name}`}</span>
            <span className="">รายวิชา : {data?.subject}</span>
            <span className="">คำอธิบาย : {data?.description}</span>
            <span className="">สำนักพิมพ์ : {data?.publisher}</span>
            <span className="">ผู้ให้ข้อมูล : {data?.contributor}</span>
            <span className="">วันที่ : {data?.created_date}</span>
            <span className="">แหล่งที่มา : {data?.source}</span>
            <span className="">สิทธิ : {data?.rights}</span>
            <span className="">แนบไฟล์ : {data?.file_url.split("/").slice(-1)[0]}</span>
          </div>
        </div>
      ) : null}
    </Fragment>
  )
}
