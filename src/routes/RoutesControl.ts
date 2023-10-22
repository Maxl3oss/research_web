import { useRoutes } from "react-router-dom";
import { RoutesAuth, RoutesPrivate, RoutesPublic } from "./Routes";
import { useSelector } from "react-redux";
import { IRootState } from "@store/index";
import {  useMemo } from "react";

export default function RoutesControl() {
  const userInfo = useSelector((state: IRootState) => state.RDauth.user);
  const dataRoutes = useMemo(() => {
    if (userInfo?.id) {
      // console.log(userInfo)
      return [RoutesPublic, RoutesPrivate, RoutesAuth];
    } else {
      return [RoutesAuth];
    }
  }, [userInfo]);

  const routing = useRoutes(dataRoutes); //ใช้ match ในการแบ่ง route

  return routing;
}
