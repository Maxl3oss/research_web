import { Button, InputHook, InputHookUploadImage } from "@components/base";
import { yupResolver } from "@hookform/resolvers/yup";
import { IResearch } from "@interfaces/research.interface";
import { Fragment } from "react";
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from "react-router-dom";
import * as yup from 'yup';

const validationSchema = yup.object<IResearch>({
  title: yup.string().required("ชื่อรายงาน"),
  title_alternative: yup.string().required("ชื่อรายงานทางเลือก"),
  // created_by: yup.string().required("ชื่อรายงานทางเลือก"),
});

export function FormResearch() {
  const methods = useForm<IResearch>({
    resolver: yupResolver(validationSchema), defaultValues: {
      image_url: "https://animelib.me/uploads/anime/22179/cover/de498577-f91f-4fc5-8487-0d94efa92c6f.jpg",
    }
  });

  async function onSubmit(data: IResearch) {
      console.log(data);
  }

  return (
    <Fragment>
      <FormProvider {...methods}>
        <h3 className="font-semibold text-xl sm:text-2xl mb-5">เพิ่มข้อมูลงานวิจัย</h3>
        <div className="bg-back-theme p-5 rounded-2xl">
          <form autoComplete="off" onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-wrap gap-3">
            <div className="flex justify-center w-full md:w-1/2 border p-[1px] max-w-[2480px] max-h-[3508px]">
              <InputHookUploadImage
                defaultValue={methods.getValues("image_url") ?? ""}
                accept="profile"
                name="profile"
                className="max-w-[2480px] max-h-[3508px] h-full w-full"
                onChange={(e) => {
                  methods.setValue("image_url", e, { shouldValidate: true });
                }}
              />
              {/* <img src={"https://animelib.me/uploads/anime/22179/cover/de498577-f91f-4fc5-8487-0d94efa92c6f.jpg"} alt="" /> */}
            </div>
            <div className="flex-1 grid gap-2 content-start mb-5">
              <div className="w-full">
                <label>ค้นหา</label>
                <InputHook name="title" />
              </div>
              <div className="w-full">
                <label>ค้นหา</label>
                <InputHook name="title_alternative" />
              </div>
              <div className="w-full">
                <label>ค้นหา</label>
                <InputHook name="created_by" />
              </div>
              <div className="w-full">
                <label>ค้นหา</label>
                <InputHook name="name4" />
              </div>
              <div className="w-full">
                <label>ค้นหา</label>
                <InputHook name="name5" />
              </div>

              <div className="w-full sm:w-fit flex items-end justify-end sm:justify-start gap-3">
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
