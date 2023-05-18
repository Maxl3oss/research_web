import { Navigate } from "react-router-dom";
import SignIn from "../views/public/SignIn";
import FrontendLayout from '../components/layouts/public/FrontendLayout';
import NoPage from "../views/public/NoPage";
import PlayRedux from "../views/public/PlayRedux";
import ResearchMain from "../views/public/research/ResearchMain";

const routes = [
  {
    path: "/",
    name: "",
    element: <Navigate to={"signIn"} />,
  },
  {
    path: "/home",
    name: "/รายการวิจัย",
    element: <ResearchMain />,
    layout: <FrontendLayout />,
  },
  {
    path: "/signIn",
    name: "/เข้าสู่ระบบ",
    element: <SignIn />,
  },
  {
    path: "/test",
    name: "/test",
    element: <PlayRedux />,
  },
  {
    path: "*",
    name: "",
    element: <NoPage />,
  },
];


export default routes;