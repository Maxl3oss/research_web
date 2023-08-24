import { useRoutes } from "react-router-dom";
import { RoutesAuth, RoutesPrivate, RoutesPublic } from "./Routes";

export default function RoutesControl() {

  const routing = useRoutes([RoutesPublic, RoutesPrivate, RoutesAuth]); //ใช้ match ในการแบ่ง route

  return routing;
}
