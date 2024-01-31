import { Fragment, useEffect, useState } from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import StarRating from "@components/base/starRating";
import { Button } from "@components/base";
import { CreateComment, DeleteComment, GetComments, ReqComment } from "@services/comment.service";
import { nanoid } from "@reduxjs/toolkit";
import { FindPrefix, FormatDateComments, FormatterNumber } from "@components/helper/FunctionHelper";
import { useSelector } from "react-redux";
import { IRootState } from "@store/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IPagin } from "@interfaces/pagin.interface";
import NotFound from "@components/base/notFound";
import ResearchAlert from "@components/customs/alert";
import { useNavigate } from "react-router-dom";

type Props = {
  researchId: number;
}

interface User_info {
  id: string;
  profile: string;
  prefix: string;
  first_name: string;
  last_name: string;
  Rating: {
    rating: number
  }[];
}

type TypeComment = {
  id: number;
  contents: string;
  created_at: string;
  user_info: User_info;
}

function MainComments({ researchId }: Props) {
  const userInfo = useSelector((state: IRootState) => state.RDauth.user);
  const navigate = useNavigate();
  const [raw, setRaw] = useState<TypeComment[]>([]);
  const [contents, setContents] = useState<string>("");
  const [isLoad, setIsLoad] = useState(false);
  const [isLoadCm, setIsLoadCm] = useState(false);
  const [pagin, setPagin] = useState<IPagin>({
    page: 1,
    pageSize: 3,
    total: 0,
    totalPage: 0,
  });

  async function fetchComments(researchId = 0, pageSize = 3, currentPage = 1) {
    setIsLoadCm(true);
    const res = await GetComments(pageSize, currentPage, researchId);
    setIsLoadCm(false);
    if (res) {
      if (res.statusCode === 200 && res.taskStatus) {
        setRaw(res.data);
        setPagin(res.pagin)
      }
    }
  }

  async function handleAddComment(data: ReqComment) {
    const check = handleUser();
    if (!check) return;
    setIsLoad(true);
    const res = await CreateComment(data);
    setIsLoad(false);
    if (res) {
      if (res.statusCode === 200 && res.taskStatus) {
        setRaw(res.data);
        fetchComments(researchId);
      }
    }
  }

  function handleDelete(id: number) {
    ResearchAlert({
      timer: 0,
      title: "คุณแน่ใจ !!!",
      text: "คุณต้องการลบรายการนี้ใช่หรือไม่?",
      icon: "question",
      showConfirmButton: true,
      showCancelButton: true,
    }).then(async ({ isConfirmed }) => {
      if (isConfirmed) {
        const res = await DeleteComment(id);
        if (res && (res.statusCode === 200 && res.taskStatus)) {
          fetchComments(researchId);
        }
      }
    });
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

  async function handleSubmit() {
    const data: ReqComment = {
      user_id: userInfo?.id ?? "",
      contents: contents,
      research_id: researchId
    }
    handleAddComment(data);
  }

  useEffect(() => {
    if (researchId) {
      fetchComments(researchId);
    }
  }, [researchId]);

  return (
    <Fragment>
      <div id="comments-id">
        <div className="p-5 mt-5 rounded-xl bg-theme">
          <section id="comments" className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
            <div className="xl:col-span-2 container-comments">
              {/* card */}
              {isLoadCm ?
                <Fragment>
                  {Array.from({ length: 3 }).map(() => (
                    <div key={nanoid()} className="cm-card">
                      <div className="cm-header">
                        <span className="h-5 bg-neutral-700 rounded-md w-1/3"></span>
                        <StarRating showText={false} className="animate-pulse" isChange={false} rating={0} />
                      </div>
                      <div className="cm-body">
                        <span className="h-12"></span>
                      </div>
                    </div>
                  ))}
                </Fragment>
                : raw?.length > 0
                  ?
                  raw.map((item, idx) => (
                    <div key={nanoid() + idx} className="cm-card">
                      <div className="cm-header">
                        <div className="flex items-center gap-2">
                          <LazyLoadImage effect="blur" src={item.user_info.profile ?? ""} className="profile-icon" alt="" />
                          <div className="grid">
                            <p>{FindPrefix(item.user_info.prefix) + item.user_info.first_name + " " + item.user_info.last_name}</p>
                            <span className="text-xs">
                              {FormatDateComments(item.created_at)}.
                              <FontAwesomeIcon className="ml-2" icon={["fas", "earth-asia"]} />
                            </span>
                          </div>
                        </div>
                        <StarRating showText={false} isChange={false} rating={item.user_info?.Rating[0]?.rating ?? 0} />
                      </div>
                      <div className="cm-body">
                        <p>{item.contents}</p>
                      </div>
                      <div className="text-end -mt-3">
                        {item.user_info.id === userInfo?.id ?
                          <FontAwesomeIcon
                            icon={["fas", "trash"]}
                            onClick={() => handleDelete(item.id)}
                            className="text-red-500 hover:text-red-400 text-sm cursor-pointer"
                          />
                          : null}
                      </div>
                    </div>
                  ))
                  : <NotFound text="ยังไม่มีคอมเมนท์" />}
              <div className="mt-5 flex justify-end text-sm font-semibold underline">
                <Button type="button" className="cursor-pointer shadow-none">
                  {isLoadCm ?
                    <Fragment>
                      <FontAwesomeIcon icon={["fas", "circle-notch"]} className="animate-spin text-lg mr-2" />
                      กำลังโหลด
                    </Fragment>
                    : pagin.total === 0 || pagin.total <= 3 ? null
                      : pagin.total > pagin.pageSize
                        ? <p onClick={() => fetchComments(researchId, pagin.total, 1)}>ดูเพิ่มเติม</p>
                        : <p onClick={() => fetchComments(researchId)}>ดูน้อยลง</p>
                  }
                </Button>
              </div>
            </div>

            <div className="order-first lg:order-last comments-input">
              <h2 className="text-lg font-semibold">คอมเมนท์ ({FormatterNumber(pagin.total)}) รายการ</h2>

              <div className="mt-3">
                <label htmlFor="contents"></label>
                <textarea
                  rows={5}
                  name="contents"
                  className="input-base black-input"
                  onChange={(e) => {
                    setContents(e.target.value);
                  }}
                />
              </div>

              <Button onClick={handleSubmit} type="button" className="mt-3 btn-secondary">
                {isLoad ?
                  <Fragment>
                    <FontAwesomeIcon icon={["fas", "circle-notch"]} className="animate-spin text-lg mr-2" />
                    กำลังโหลด
                  </Fragment>
                  :
                  <span>ส่ง</span>
                }
              </Button>
            </div>
          </section>
        </div>
      </div >
    </Fragment >
  )
}

export default MainComments