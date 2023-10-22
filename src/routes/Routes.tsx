import { Navigate } from "react-router-dom";
import SignIn from "@views/public/home/SignIn";
import NoPage from "@views/public/error/NoPage";
import MainResearch from "@views/public/research/MainResearch";
import DetailResearch from '@views/public/research/DetailResearch';
import MainDashBoard from "@views/private/dashboard/MainDashBoard";
import { BackendLayout, FrontendLayout } from "@components/layouts";
import MainResearchBack from "@views/private/researchBack/MainResearchBack";
import MainUsersBack from "@views/private/usersBack/MainUsersBack";
import { FormResearch } from "@views/public/research/FormResearch";
import MainResultSearch from "@views/public/result-search/MainResultSearch";
import MainProfile from "@views/public/profile/MainProfile";

const RoutesAuth = {
  role: ['none-auth'],
  path: "/",
  children: [
    { path: "*", name: "/เข้าสู่ระบบ", element: <SignIn /> },
    { path: "/", name: "/เข้าสู่ระบบ", element: <SignIn /> },
    { path: "/signIn", name: "/เข้าสู่ระบบ", element: <SignIn /> },
  ],
}

const RoutesPublic = {
  role: ['public'],
  path: "/",
  element: <FrontendLayout />,
  children: [
    { path: "/", name: "", element: <Navigate to={"research"} /> },
    { path: "/research/", name: "/รายการวิจัย", element: <MainResearch /> },
    { path: "/research/detail-research", name: "/รายการวิจัย/รายละเอียดวิจัย", element: <DetailResearch /> },
    { path: "/research/create", name: "/รายการวิจัย/เพิ่มข้อมูลวิจัย", element: <FormResearch /> },
    { path: "/research/update", name: "/รายการวิจัย/แก้ไขข้อมูลวิจัย", element: <FormResearch /> },
    { path: "/research/result", name: "/รายการวิจัย/แสดงรายการ", element: <MainResultSearch /> },
    { path: "/user/profile", name: "/ผู้ใช้/ข้อมูลผู้ใช้", element: <MainProfile /> },
    { path: "*", name: "", element: <NoPage /> },
  ],
}

const RoutesPrivate = {
  role: ['Private'],
  path: "/",
  element: <BackendLayout />,
  children: [
    { path: "/back/dashboard", name: "/แดชบอร์ด", element: <MainDashBoard /> },
    { path: "/back/research", name: "/งานวิจัย", element: <MainResearchBack /> },
    { path: "/back/users", name: "/งานวิจัย", element: <MainUsersBack /> },
    { path: "*", name: "", element: <NoPage /> },
  ],
}

export { RoutesPublic, RoutesPrivate, RoutesAuth };