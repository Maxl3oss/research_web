import { Navigate } from "react-router-dom";
import SignIn from "@views/public/home/SignIn";
import NoPage from "@views/public/error/NoPage";
// import PlayRedux from "@views/public/PlayRedux";
import MainResearch from "@views/public/research/MainResearch";
import DetailResearch from '@views/public/research/DetailResearch';
import MainDashBoard from "@views/private/dashboard/MainDashBoard";
import { BackendLayout, FrontendLayout } from "@components/layouts";

const RoutesPublic = {
  role: ['public'],
  path: "/",
  element: <FrontendLayout />,
  children: [
    { path: "/", name: "", element: <Navigate to={"research"} /> },
    { path: "/research", name: "/รายการวิจัย", element: <MainResearch /> },
    { path: "/research/detail-research", name: "/รายการวิจัย/รายละเอียดวิจัย", element: <DetailResearch /> },
    { path: "/signIn", name: "/เข้าสู่ระบบ", element: <SignIn /> },
    { path: "*", name: "", element: <NoPage /> },
  ],
}

const RoutesPrivate = {
  role: ['Private'],
  path: "/",
  element: <BackendLayout />,
  children: [
    { path: "/back/dashboard", name: "/รายการวิจัย", element: <MainDashBoard /> },
    { path: "*", name: "", element: <NoPage /> },
  ],
}

export { RoutesPublic, RoutesPrivate };