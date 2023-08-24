import { Link } from "react-router-dom";
import { Input } from "@components/base";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const validationSchema = yup.object({
  email: yup.string().email("กรุณาตรวจสอบอีเมล").required("กรุณากรอกอีเมล"),
  password: yup.string().required("กรุณากรอกรหัสผ่าน"),
});

export default function SignIn() {
  // const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = (data: any) => console.log(data);

  // const SignIn = async () => {
  //   await axios
  //     .post("/auth/signIn", {
  //       email: email,
  //       pass: pass,
  //     })
  //     .then((res) => {
  //       if (res?.status === 200) {
  //         localStorage.setItem("user", JSON.stringify(res.data.data[0]));
  //         localStorage.setItem("token", JSON.stringify(res.data.token));
  //         Swal.fire({
  //           position: "center",
  //           icon: "success",
  //           text: "Successfully sign in.",
  //           showConfirmButton: false,
  //           timer: 1000,
  //         });
  //         if (remember) localStorage.setItem("remember", JSON.stringify({ email: email, pass: pass, remember: true }));
  //         // update context
  //         //  context.update();
  //         navigate("/home");
  //       }
  //     })
  //     .catch((err) => {
  //       setErrMsg(err.response.data.message);
  //     });
  // };

  return (
    <div className="bg-eff flex h-screen gap-1 w-screen bg-slate-300 dark:bg-zinc-950">
      <div className="flex md:flex-1 object-cover">
      </div>
      <div className="flex md:mr-32 min-w-fit w-[400px] md:w-96 h-fit m-auto md:h-full">
        <div className="justify-center w-full shadow-xl bg-white border border-gray-200 rounded-lg m-5 dark:bg-zinc-900/75 dark:border-zinc-700">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-sm p-8">
            <h3 className="text-xl font-medium text-center text-gray-900 dark:text-white">
              Sign in
            </h3>
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">
                Email
              </label>
              <Input register={register} error={errors.email} name="email" placeholder="example@mail.com" />
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">
                Password
              </label>
              <Input
                register={register}
                error={errors.password}
                type="password"
                name="password"
                placeholder="• • • • • • • •"
              />
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  className="bg-gray-50 border border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                // defaultChecked={remember}
                // onClick={onClickRemember}
                />
              </div>
              <div className="text-sm ml-3">
                <label
                  htmlFor="remember"
                  className="font-medium text-gray-900 dark:text-gray-300"
                >
                  Remember me
                </label>
              </div>
              <span className="text-sm text-blue-700 hover:underline ml-auto dark:text-blue-500">
                Lost Password?
              </span>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:border-blue-500 focus:ring-blue-400 focus:outline-none focus:ring-opacity-40 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Sign In to your account
            </button>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Not registered?
              <Link
                to="/signUp"
                className="text-blue-700 hover:underline dark:text-blue-500"
              >
                Create account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
