import { useRoutes } from "react-router-dom";
import { RoutesPrivate, RoutesPublic } from "./Routes";

export default function RoutesControl() {

  const routing = useRoutes([RoutesPublic, RoutesPrivate]); //ใช้ match ในการแบ่ง route

  return routing;
}
