import { Link, useNavigate } from "react-router-dom";
import { Input } from "@components/base";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Fragment, useEffect } from "react";
import Logo2 from "../../../assets/images/logo2.svg"
import { useDispatch } from "react-redux";
import { Login } from "@store/auth.store/auth.actions";
import { SignInUserArgs } from "@store/auth.store/auth.interface";
import { AppDispatch } from "@store/index";
import ResearchAlert from "@components/customs/alert";

type IRemember = {
  isRemember: boolean;
  email: string;
  password: string;
}

const validationSchema = yup.object({
  isRemember: yup.boolean(),
  email: yup.string().email("กรุณาตรวจสอบอีเมล").required("กรุณากรอกอีเมล"),
  password: yup.string().required("กรุณากรอกรหัสผ่าน"),
});

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const remember: IRemember | null = JSON.parse(localStorage.getItem("remember") || "");
  const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  async function onSubmit(data: SignInUserArgs) {
    const isRemember = !getValues("isRemember");
    const dataRemember = {
      isRemember: isRemember,
      email: isRemember ? getValues("email") : "",
      password: isRemember ? getValues("password") : "",
    }
    localStorage.setItem("remember", JSON.stringify(dataRemember));

    dispatch(Login(data)).unwrap()
      .catch((err) => {
        ResearchAlert({
          timer: 0,
          title: "ไม่สำเร็จ !!!",
          icon: "error",
          text: err,
          showConfirmButton: true,
        });
      })
      .then((res) => { if (res) navigate("/") });
  }

  useEffect(() => {
    if (remember && remember.isRemember) {
      setValue("isRemember", remember.isRemember, { shouldValidate: true });
      setValue("email", remember.email);
      setValue("password", remember.password);
    }
  }, []);

  return (
    <Fragment>
      {/* <CustomAlert onChange={(is) => setRsAlert((prev) => ({ ...prev, isShow: is }))} alert={rsAlert} /> */}
      <section className="flex justify-center items-center h-screen w-full layout-theme px-5">
        <div className="md:w-6/12 lg:w-4/12 gap-3 hidden md:flex items-center justify-center">
          <img className="w-16 h-16" src={Logo2} alt="logo" />
          <h1 className="text-4xl font-bold text-slate-800 dark:text-white">Research</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-10/12 md:w-6/12 lg:w-4/12 space-y-6 h-fit md:mb-0 mb-20">
          <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
            เข้าสู่ระบบ
          </h3>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">
              อีเมล
            </label>
            <Input register={register} error={errors.email} name="email" placeholder="example@mail.com" />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">
              รหัสผ่าน
            </label>
            <Input
              onClick={() => null}
              register={register}
              error={errors.password}
              type="password"
              name="password"
              autoCorrect="off"
              autoCapitalize="off"
              placeholder="• • • • • • • •"
            />
          </div>
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                className="bg-gray-50 border border-gray-300 focus:ring-3 focus:ring-indigo-300 h-4 w-4 rounded dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-indigo-600 dark:ring-offset-gray-800"
                defaultChecked={getValues("isRemember")}
                onClick={() => {
                  const isRemember = getValues("isRemember");
                  setValue("isRemember", !isRemember);
                }}
              />
            </div>
            <div className="text-sm ml-3">
              <label
                htmlFor="remember"
                className="text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                จดจำรหัสผ่าน
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:border-indigo-500 focus:ring-indigo-400 focus:outline-none focus:ring-opacity-40 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
          >
            ข้าสู่ระบบ
          </button>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            ยังไม่มีบัญชีใช่ไหม?
            <Link
              to="/signUp"
              className="text-indigo-700 hover:underline dark:text-indigo-500"
            >
              สร้างบัญชีผู้ใช้
            </Link>
          </div>
        </form>
        {/* alert */}
      </section>
      <section className="flex flex-col items-center justify-center h-96 layout-theme2">
        <h1 className="text-2xl font-bold text-red-800 dark:text-red-500">คำเตือน</h1>
        <h3 className="text-xl text-red-800 dark:text-red-400">โปรเจคนี้สร้างขึ้นเพื่อเป็นโปรเจคจบเท่านั้น!!!</h3>
        <h1 className="mt-5 text-2xl text-black dark:text-zinc-400">ติดต่อ</h1>
        <div className="flex gap-2 items-center">
          <a href="https://www.facebook.com/PoundNarongrid" className="w-8 h-8">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 48 48">
              <path fill="#3F51B5" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"></path><path fill="#FFF" d="M34.368,25H31v13h-5V25h-3v-4h3v-2.41c0.002-3.508,1.459-5.59,5.592-5.59H35v4h-2.287C31.104,17,31,17.6,31,18.723V21h4L34.368,25z"></path>
            </svg>
          </a>
          <a href="https://www.facebook.com/PoundNarongrid" className="w-8 h-8">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 48 48">
              <path fill="#00c300" d="M12.5,42h23c3.59,0,6.5-2.91,6.5-6.5v-23C42,8.91,39.09,6,35.5,6h-23C8.91,6,6,8.91,6,12.5v23C6,39.09,8.91,42,12.5,42z"></path><path fill="#fff" d="M37.113,22.417c0-5.865-5.88-10.637-13.107-10.637s-13.108,4.772-13.108,10.637c0,5.258,4.663,9.662,10.962,10.495c0.427,0.092,1.008,0.282,1.155,0.646c0.132,0.331,0.086,0.85,0.042,1.185c0,0-0.153,0.925-0.187,1.122c-0.057,0.331-0.263,1.296,1.135,0.707c1.399-0.589,7.548-4.445,10.298-7.611h-0.001C36.203,26.879,37.113,24.764,37.113,22.417z M18.875,25.907h-2.604c-0.379,0-0.687-0.308-0.687-0.688V20.01c0-0.379,0.308-0.687,0.687-0.687c0.379,0,0.687,0.308,0.687,0.687v4.521h1.917c0.379,0,0.687,0.308,0.687,0.687C19.562,25.598,19.254,25.907,18.875,25.907z M21.568,25.219c0,0.379-0.308,0.688-0.687,0.688s-0.687-0.308-0.687-0.688V20.01c0-0.379,0.308-0.687,0.687-0.687s0.687,0.308,0.687,0.687V25.219z M27.838,25.219c0,0.297-0.188,0.559-0.47,0.652c-0.071,0.024-0.145,0.036-0.218,0.036c-0.215,0-0.42-0.103-0.549-0.275l-2.669-3.635v3.222c0,0.379-0.308,0.688-0.688,0.688c-0.379,0-0.688-0.308-0.688-0.688V20.01c0-0.296,0.189-0.558,0.47-0.652c0.071-0.024,0.144-0.035,0.218-0.035c0.214,0,0.42,0.103,0.549,0.275l2.67,3.635V20.01c0-0.379,0.309-0.687,0.688-0.687c0.379,0,0.687,0.308,0.687,0.687V25.219z M32.052,21.927c0.379,0,0.688,0.308,0.688,0.688c0,0.379-0.308,0.687-0.688,0.687h-1.917v1.23h1.917c0.379,0,0.688,0.308,0.688,0.687c0,0.379-0.309,0.688-0.688,0.688h-2.604c-0.378,0-0.687-0.308-0.687-0.688v-2.603c0-0.001,0-0.001,0-0.001c0,0,0-0.001,0-0.001v-2.601c0-0.001,0-0.001,0-0.002c0-0.379,0.308-0.687,0.687-0.687h2.604c0.379,0,0.688,0.308,0.688,0.687s-0.308,0.687-0.688,0.687h-1.917v1.23H32.052z"></path>
            </svg>
          </a>
          <a href="https://www.facebook.com/PoundNarongrid" className="w-6 h-6 bg-[#8c9eff] rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 48 48">
              <path fill="#fff" d="M32.59,16.24c0,0-2.6-2.01-5.68-2.24l-0.27,0.55c2.78,0.67,4.05,1.64,5.38,2.83 C29.73,16.21,27.46,15,23.5,15s-6.23,1.21-8.52,2.38c1.33-1.19,2.85-2.27,5.38-2.83L20.09,14c-3.23,0.31-5.68,2.24-5.68,2.24 S11.5,20.43,11,28.62c2.94,3.36,7.39,3.38,7.39,3.38l0.92-1.23c-1.57-0.54-3.36-1.51-4.9-3.27c1.84,1.38,4.61,2.5,9.09,2.5 s7.25-1.12,9.09-2.5c-1.54,1.76-3.33,2.73-4.9,3.27L28.61,32c0,0,4.45-0.02,7.39-3.38C35.5,20.43,32.59,16.24,32.59,16.24z M20,27 c-1.1,0-2-1.12-2-2.5s0.9-2.5,2-2.5s2,1.12,2,2.5S21.1,27,20,27z M27,27c-1.1,0-2-1.12-2-2.5s0.9-2.5,2-2.5s2,1.12,2,2.5 S28.1,27,27,27z"></path>
            </svg>
          </a>
        </div>
      </section>
    </Fragment>
  );
}
