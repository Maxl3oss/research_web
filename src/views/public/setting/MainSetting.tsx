import { AppDispatch, IRootState } from '@store/index';
import { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Entries, IReqUser } from '@interfaces/global.interface';
import { useForm, FormProvider } from 'react-hook-form';
import { Button, InputHook, InputHookUploadImage } from '@components/base';
import SelectSearchHook from '@components/base/input/SelectSearchHook';
import { prefix } from '@assets/json/prefix.json';
import { ChangeProfileById } from '@services/user.service';
import { IResponse } from '@interfaces/research.interface';
import { Update } from '@store/auth.store/auth.actions';
import { useDispatch } from 'react-redux';

function MainSetting() {
  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useSelector((state: IRootState) => state.RDauth.user);
  const methods = useForm<IReqUser>({
    // resolver: yupResolver(),
    // defaultValues: {},
  });
  const [isSetPass, setIsSetPss] = useState(false);
  const [isLoads, setIsLoads] = useState({
    profile: false,
    data: false
  });

  async function onSubmit(values: IReqUser) {
    if (values.profile !== "" && typeof values.profile !== "string" && userInfo?.id) {
      handleChangeProfile(userInfo.id, { profile: values.profile });
    }
  }

  async function handleChangeProfile(id: string, data: { profile: string | File }) {
    setIsLoads(prev => ({ ...prev, profile: true }));
    const res: Omit<IResponse, "pagin"> = await ChangeProfileById(id, data);
    if (res && (res.statusCode === 200 && res.taskStatus)) {
      dispatch(Update({ id }));
    }
    setIsLoads(prev => ({ ...prev, profile: false }));
  }

  useEffect(() => {
    if (userInfo) {
      for (const [key, value] of Object.entries(userInfo) as Entries<IReqUser>) {
        methods.setValue(key, value);
      }
    }
  }, [methods, userInfo]);

  // useEffect(() => {
  //   const { unsubscribe } = methods.watch((value) => {
  //     console.log(value);
  //   });
  //   return () => unsubscribe();
  // }, [methods]);

  const handleSubmit = () => {
    const btn = document.getElementById("btnSubmit");
    if (btn) btn.click();
  }

  return (
    <Fragment>
      <FormProvider {...methods}>
        <div className="flex justify-center">
          <div className="w-full md:w-10/12">
            <h3 className="font-semibold text-xl sm:text-2xl mb-5">ตั้งค่า</h3>
            <div className="flex w-full mt-5 border-b border-zinc-800">
              <div className="flex items-center text-sm gap-2 text-zinc-400">
                <span onClick={() => null} className={"border-b text-indigo-600 border-indigo-600 p-3 w-28 text-center cursor-pointer rounded-t"}>
                  โปรไฟล์
                </span>
              </div>
            </div>
          </div>
        </div>
        <form autoComplete="off" onSubmit={methods.handleSubmit(onSubmit)} className="relative w-full flex flex-col items-center">
          <div className="w-full md:w-10/12 flex flex-wrap justify-center gap-5 pt-5 px-3">
            <div className="md:w-fit h-full w-full grid place-content-center text-center">
              <InputHookUploadImage
                defaultValue={methods.getValues("profile") ?? userInfo?.profile}
                name="profile"
                className="rounded-full h-48 w-48"
                outClassName="border-0"
                onChange={(e) => {
                  methods.setValue("profile", e, { shouldValidate: true });
                  handleSubmit();
                }}
                onLoading={isLoads.profile}
                imageOnError={"profile"}
              />
              <label>โปรไฟล์</label>
              {/* <img
                className="rounded-full h-32 w-32"
                src={userInfo?.profile || ""}
                onError={({ currentTarget }) => currentTarget.src = NoProfile}
                alt=""
              /> */}
            </div>
            <div className="lg:pl-10 grow grid place-content-start grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label>คำนำหน้าชื่อ</label>
                <SelectSearchHook
                  name="prefixName"
                  options={prefix}
                  optionId="id"
                  optionLabel="name"
                  value={methods.getValues("prefix")}
                  optionOnClick={(val: { id: string, name: string }) => {
                    methods.setValue("prefix", val?.id ?? "", { shouldValidate: true });
                    methods.setValue("prefixName", val?.name ?? "", { shouldValidate: true });
                  }}
                />
              </div>
              <div>
                <label>ชื่อ</label>
                <InputHook name="first_name" />
              </div>
              <div>
                <label>นามสกุล</label>
                <InputHook name="last_name" />
              </div>
              <div>
                <label>อีเมล</label>
                <InputHook name="email" />
              </div>
              {isSetPass
                ?
                <Fragment>
                  <div className="hidden md:block col-span-2"></div>
                  <div>
                    <label>รหัสผ่าน</label>
                    <InputHook name="password" />
                  </div>
                  <div>
                    <label>ยืนยันรหัสผ่าน</label>
                    <InputHook name="confirmPassword" />
                  </div>
                  <div className="mt-3 md:mt-6">
                    <Button onClick={() => setIsSetPss(false)}>ยกเลิก</Button>
                  </div>
                </Fragment>
                :
                <div className="col-span-1 md:col-span-2 mt-3 md:mt-6">
                  <Button onClick={() => setIsSetPss(true)}>เปลี่ยนรหัสผ่าน</Button>
                </div>
              }
            </div>
          </div>
          <Button type="submit" id="btnSubmit">อัพเดท</Button>
        </form>
      </FormProvider>
    </Fragment>
  )
}

export default MainSetting