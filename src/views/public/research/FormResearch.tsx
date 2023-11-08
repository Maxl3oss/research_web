import { Button, InputHook, InputHookUploadImage, TextareaHook } from "@components/base";
import { yupResolver } from "@hookform/resolvers/yup";
import { Fragment, useEffect, useState } from "react";
import { useForm, FormProvider } from 'react-hook-form';
import { Link, useLocation } from "react-router-dom";
import validationSchema from "./ValidationResearch";
import { CreateResearch, GetResearchDetailByUserId, UpdateResearch } from "@services/research.service";
import { useSelector } from "react-redux";
import { IRootState } from "@store/index";
import { Entries, IReqResearch } from "@interfaces/global.interface";
import { IResearch, IResponse } from "@interfaces/research.interface";
import { FetchTagsDDL } from "@services/tags.service";
import SelectSearchHook from "@components/base/input/SelectSearchHook";

export function FormResearch() {
  const userInfo = useSelector((state: IRootState) => state.RDauth.user);
  const [raw, setRaw] = useState<IResearch | null>(null);
  const [tagsDDL, setTagsDDL] = useState<{ id: number, name: string }[]>([]);
  const { id } = useLocation().state || "";
  const methods = useForm<IReqResearch>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      image: "",
    }
  });

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

    console.log(values);
    const res = id ? await UpdateResearch(id, values) : await CreateResearch(values);
    if (res) {
      console.log(res);
    }
  }

  useEffect(() => {
    if (id && userInfo) {
      Promise.all([fetchData(userInfo.id, id)]);
    }
    fetchTagsDDL();
    if (userInfo) methods.setValue('user_id', userInfo.id, { shouldValidate: true });
  }, [id, userInfo])

  useEffect(() => {
    if (raw && userInfo) {
      for (const [key, value] of Object.entries(raw) as Entries<IReqResearch>) {
        methods.setValue(key, value);
      }
      methods.setValue('image', raw.image_url ?? "", { shouldValidate: true });
      methods.setValue('pdf', raw.file_url ?? "", { shouldValidate: true });
    }
  }, [raw]);

  useEffect(() => {
    const { unsubscribe } = methods.watch((value) => {
      console.log(value);
    });
    return () => unsubscribe();
  }, [methods.watch])

  return (
    <Fragment>
      <FormProvider {...methods}>
        <h3 className="font-semibold text-xl sm:text-2xl mb-5">เพิ่มข้อมูลงานวิจัย</h3>
        <div className="bg-back-theme p-5 rounded-2xl">
          <form autoComplete="off" onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-wrap gap-3">
            <div className="w-full lg:w-1/3 max-w-[2480px] max-h-[3508px]">
              <InputHookUploadImage
                defaultValue={methods.getValues("image") || ""}
                accept="image/*"
                name="image"
                className="max-w-[2480px] min-h-[300px] max-h-[300px] md:max-h-[3508px] object-contain md:object-cover"
                onChange={(e) => {
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
                <InputHook type="file" accept="application/pdf" name="pdf" />
              </div>
              <div className="mt-5 col-span-2 flex items-end justify-center gap-3">
                <Button type="submit" className="btn-primary">บันทึก</Button>
                <Link to="/research" className="btn-link">ย้อนกลับ</Link>
              </div>
            </div>
          </form>
        </div>
      </FormProvider>
    </Fragment>
  )
}
