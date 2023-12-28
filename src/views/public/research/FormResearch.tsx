import { Button, InputHook, InputHookUploadImage, TextareaHook } from "@components/base";
import { yupResolver } from "@hookform/resolvers/yup";
import { Fragment, useEffect, useState } from "react";
import { useForm, FormProvider } from 'react-hook-form';
import { Link, useLocation, useNavigate } from "react-router-dom";
import ValidationResearch from "./ValidationResearch";
import { CreateResearch, GetResearchDetailByUserId, UpdateResearch } from "@services/research.service";
import { useSelector } from "react-redux";
import { IRootState } from "@store/index";
import { Entries, IReqResearch } from "@interfaces/global.interface";
import { IResearch, IResponse } from "@interfaces/research.interface";
import { FetchTagsDDL } from "@services/tags.service";
import SelectSearchHook from "@components/base/input/SelectSearchHook";
import { ResponseAlert } from "@components/helper/CustomAlert";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InputUploadFile from "@components/base/input/InputUploadFile";
import { ExtractTextFromPDF as extractTextFromPDF } from "@components/helper/ExtractFromPDF";


export function FormResearch() {
  const navigate = useNavigate();
  const userInfo = useSelector((state: IRootState) => state.RDauth.user);
  const [raw, setRaw] = useState<IResearch | null>(null);
  const [tagsDDL, setTagsDDL] = useState<{ id: number, name: string }[]>([]);
  const { id } = useLocation().state || "";
  const [isLoading, setIsLoading] = useState(false);
  const methods = useForm<IReqResearch>({
    resolver: yupResolver(ValidationResearch),
    defaultValues: {
      image: raw?.image_url ?? "",
      file_name: "",
    },
  });
  const { setValue, watch } = methods;

  async function fetchTagsDDL() {
    const res = await FetchTagsDDL();
    if (res && (res.statusCode === 200 && res.taskStatus)) {
      setTagsDDL(res.data);
    }
  }

  async function fetchData(userId: string, id: number) {
    const res: Omit<IResponse<IResearch>, 'pagin'> = await GetResearchDetailByUserId(userId, id);
    if (res && (res.statusCode === 200 && res.taskStatus)) {
      setRaw(res.data);
    }
  }

  async function onSubmit(values: IReqResearch) {
    values.user_id = userInfo?.id || "";
    values.pdf = (methods.getValues("pdf") as FileList)[0];
    values.image = methods.getValues("image");
    values.year_creation = new Date(methods.getValues("year_creation")).toISOString();

    setIsLoading(true);
    const res: Omit<IResponse, 'pagin'> = id ? await UpdateResearch(id, values) : await CreateResearch(values);
    setIsLoading(false);
    const result = ResponseAlert(res);
    if (result) navigate(-1);
  }

  function extract(file: File) {
    if ((file.size / (1024 * 1024)) > 10) {
      // return setErr("ขนาดไฟล์เกิน 10 mb");
      return
    }
    const reader = new FileReader();
    reader.onload = async () => {
      if (reader.result) {
        setIsLoading(true);
        const res = await extractTextFromPDF(reader.result.toString());
        setIsLoading(false);

        methods.setValue("image", res.image, { shouldValidate: true });
        methods.setValue("creator", res.creator, { shouldValidate: true });
        methods.setValue("title", res.title, { shouldValidate: true });
        methods.setValue("title_alternative", res.title_alternative, { shouldValidate: true });
      }
    };
    reader.readAsDataURL(file);
    // setErr("");
  }

  useEffect(() => {
    if (id && userInfo) {
      Promise.all([fetchData(userInfo.id, id)]);
    }
    fetchTagsDDL();
    if (userInfo) setValue('user_id', userInfo.id, { shouldValidate: true });
  }, [id, userInfo])

  useEffect(() => {
    if (raw) {
      for (const [key, value] of Object.entries(raw) as Entries<Omit<IReqResearch, "pdf_name" | "file_name">>) {
        setValue(key, value);
      }
      const date = new Date(raw.year_creation).toISOString().split('T')[0];
      setValue('year_creation', date, { shouldValidate: true });
      setValue('image', raw.image_url ?? "", { shouldValidate: true });
      setValue('pdf', raw.file_name ?? "", { shouldValidate: true });
    }
  }, [raw]);

  useEffect(() => {
    const pdf = watch("pdf");
    if (typeof pdf !== "string") {
      const file = (pdf as FileList)[0];
      if (file) {
        extract(file);
        setValue("file_name", file.name, { shouldValidate: true });
      } else {
        setValue("file_name", "", { shouldValidate: true });
      }
    }
  }, [watch("pdf")]);

  // useEffect(() => {
  //   const { unsubscribe } = methods.watch((value) => {
  //     console.log(value);
  //   });
  //   return () => unsubscribe();
  // }, [methods]);

  return (
    <Fragment>
      <FormProvider {...methods}>
        <h3 className="font-semibold text-xl sm:text-2xl mb-5">{id === "" ? "เพิ่มข้อมูลงานวิจัย" : "แก้ไขข้อมูลงานวิจัย"}</h3>
        <div className="bg-back-theme p-5 rounded-2xl">
          <form autoComplete="off" onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-wrap gap-3">
            <div className="w-full lg:w-1/3 max-w-[2480px] max-h-[3508px]">
              <InputHookUploadImage
                defaultValue={methods.getValues("image") || ""}
                accept="image/*"
                name="image"
                className="h-full w-full"
                onChange={(e: File) => {
                  methods.setValue('image', e, { shouldValidate: true });
                }}
              />
            </div>
            <div className="grow grid grid-cols-2 gap-2 content-start py-5 lg:pl-5">
              <div className="col-span-2 md:col-span-1">
                <label>ชื่อเรื่อง</label>
                <InputHook name="title" />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label>ชื่อทางเลือก (EN)</label>
                <InputHook name="title_alternative" />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label>จัดทำโดย</label>
                <InputHook name="creator" />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label>รายวิชา</label>
                <InputHook name="subject" />
              </div>
              <div className="col-span-full">
                <label>รายละเอียด</label>
                <TextareaHook rows={8} name="description" />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label>ผู้จัดพิมพ์</label>
                <InputHook name="publisher" />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label>ผู้ร่วมให้ข้อมูล</label>
                <InputHook name="contributor" />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label>ปีที่จัดทำ</label>
                <InputHook type="date" name="year_creation" />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label>แหล่งที่มา</label>
                <InputHook name="source" />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label>สิทธิ</label>
                <InputHook name="rights" />
              </div>
              <div className="">
                <label>ประเภท</label>
                <SelectSearchHook
                  name="tags_name"
                  options={tagsDDL}
                  optionId="id"
                  optionLabel="name"
                  onChange={() => null}
                  value={methods.getValues("tags_id")}
                  optionOnClick={(val: { id: string, name: string }) => {
                    methods.setValue("tags_id", val?.id ?? "", { shouldValidate: true });
                    methods.setValue("tags_name", val?.name ?? "", { shouldValidate: true });
                  }}
                />
              </div>
              <div className="col-span-2">
                <label>เอกสาร</label>
                <InputUploadFile
                  accept="application/pdf"
                  name="pdf"
                />
                {/* <InputHook type="file" accept="application/pdf" name="pdf" /> */}
              </div>
              <div className="mt-5 col-span-2 flex items-end justify-center gap-3">
                <Button type="submit" className="btn-primary">
                  {isLoading
                    ?
                    <div className="flex items-center gap-x-2">
                      <FontAwesomeIcon className="animate-spin text-2xl" icon={['fas', 'circle-notch']} />
                      กำลังโหลด
                    </div>
                    :
                    <span>บันทึก</span>
                  }
                </Button>
                <Link to={''} onClick={() => navigate(-1)} className="btn-link">ย้อนกลับ</Link>
              </div>
            </div>
          </form>
        </div>
      </FormProvider>
    </Fragment>
  )
}
