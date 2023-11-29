import { AppDispatch, IRootState } from '@store/index';
import { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Entries, IReqUser } from '@interfaces/global.interface';
import { useForm, FormProvider } from 'react-hook-form';
import { Button, InputHook, InputHookUploadImage } from '@components/base';
import SelectSearchHook from '@components/base/input/SelectSearchHook';
import { prefix } from '@assets/json/prefix.json';
import { ChangeProfileById, UpdateUser } from '@services/user.service';
import { IResponse } from '@interfaces/research.interface';
import { Update } from '@store/auth.store/auth.actions';
import { useDispatch } from 'react-redux';
import ValidationSetting from './ValidationSetting';
import { yupResolver } from '@hookform/resolvers/yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation } from 'react-router-dom';
import { ManagementGetUserById } from '@services/private/users.services';

function MainSetting() {
  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useSelector((state: IRootState) => state.RDauth.user);
  const { userId } = useLocation().state || "";
  const [rawUser, setRawUser] = useState<IReqUser | null>(null);
  const methods = useForm<IReqUser>({
    resolver: yupResolver(ValidationSetting),
    defaultValues: {
      id: userInfo?.id ?? "",
      profile: userInfo?.profile ?? "",
      // profile: "",
      prefix: userInfo?.prefix ?? "",
      prefixName: "",
      email: userInfo?.email ?? "",
      first_name: userInfo?.first_name ?? "",
      last_name: userInfo?.last_name ?? "",
      password: "",
      confirmPassword: "",
      isChangePassword: false,
    },
  });
  const [isLoads, setIsLoads] = useState({
    profile: false,
    data: false
  });

  async function onSubmit(values: IReqUser) {
    if (userInfo?.id) {
      if (typeof values.profile !== "string" && values?.profile) {
        handleChangeProfile(userInfo.id, { profile: values.profile as File })
      } else {
        handleUpdateUser(userInfo.id, values);
      }
    }
  }

  async function handleChangeProfile(id: string, data: { profile: File }) {
    setIsLoads(prev => ({ ...prev, profile: true }));
    const res: Omit<IResponse, "pagin"> = await ChangeProfileById(id, data);
    if (res && (res.statusCode === 200 && res.taskStatus)) {
      dispatch(Update({ id }));
    }
    setIsLoads(prev => ({ ...prev, profile: false }));
  }

  async function handleUpdateUser(id: string, data: IReqUser) {
    setIsLoads(prev => ({ ...prev, data: true }));
    const res: Omit<IResponse, "pagin"> = await UpdateUser(id, data);
    setIsLoads(prev => ({ ...prev, data: false }));
    if (res && (res.statusCode === 200 && res.taskStatus)) {
      dispatch(Update({ id }));
    }
  }

  async function handleGetUserById(userId: string) {
    const res: Omit<IResponse<IReqUser>, "pagin"> = await ManagementGetUserById(userId);
    if (res && (res.statusCode === 200 && res.taskStatus)) {
      setRawUser(res.data);
    }
  }

  useEffect(() => {
    if (userId) {
      handleGetUserById(userId);
    }
  }, [userId]);

  useEffect(() => {
    if (rawUser) {
      for (const [key, value] of Object.entries(rawUser)) {
        methods.setValue(key as keyof IReqUser, value, { shouldValidate: true });
      }
    }
  }, [rawUser, methods]);

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
        <form autoComplete="off" onSubmit={methods.handleSubmit((values) => onSubmit(values))}>
          <div className="flex justify-center">
            <div className="w-full md:w-10/12">
              <h3 className="font-semibold text-xl sm:text-2xl mb-5">ตั้งค่า</h3>
              <div className="flex justify-between w-full mt-5 border-b border-zinc-800">
                <div className="flex items-center text-sm gap-2 text-zinc-400">
                  <span onClick={() => null} className={"border-b text-indigo-600 border-indigo-600 p-3 w-28 text-center cursor-pointer rounded-t"}>
                    โปรไฟล์
                  </span>
                </div>
                <Button type="submit" id="btnSubmit">
                  {isLoads.data
                    ?
                    <Fragment>
                      <FontAwesomeIcon className="animate-spin mr-2" icon={["fas", "circle-notch"]} />
                      กำลังโหลด
                    </Fragment>
                    : "อัพเดท"}
                </Button>
              </div>
            </div>
          </div>
          <div className="relative w-full flex flex-col items-center">
            <div className="w-full md:w-10/12 flex flex-wrap justify-center gap-5 pt-5 px-3">
              <div className="md:w-fit h-full w-full grid place-content-center text-center">
                <label>โปรไฟล์</label>
                <InputHookUploadImage
                  defaultValue={methods.getValues("profile") as string | File}
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
                {methods.getValues("isChangePassword")
                  ?
                  <Fragment>
                    <div className="hidden md:block col-span-2"></div>
                    <div>
                      <label>รหัสผ่าน</label>
                      <InputHook type="password" name="password" />
                    </div>
                    <div>
                      <label>ยืนยันรหัสผ่าน</label>
                      <InputHook type="password" name="confirmPassword" />
                    </div>
                    <div className="mt-3 md:mt-6">
                      <Button onClick={() => {
                        methods.setValue("isChangePassword", false, { shouldValidate: true });
                        methods.setValue("confirmPassword", "", { shouldValidate: true });
                        methods.setValue("password", "", { shouldValidate: true });
                      }}>
                        ยกเลิก
                      </Button>
                    </div>
                  </Fragment>
                  :
                  <div className="col-span-1 md:col-span-2 mt-3 md:mt-6">
                    <Button onClick={() => {
                      methods.setValue("isChangePassword", true, { shouldValidate: true })
                    }}>
                      เปลี่ยนรหัสผ่าน
                    </Button>
                  </div>
                }
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </Fragment>
  )
}

export default MainSetting