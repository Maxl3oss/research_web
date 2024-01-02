import { redirect, useRoutes } from "react-router-dom";
import { RoutesAuth, RoutesPrivate, RoutesPublic, RoutesUser } from "./Routes";
import { useSelector } from "react-redux";
import { IRootState } from "@store/index";
import { useMemo } from "react";

export default function RoutesControl() {
  const userInfo = useSelector((state: IRootState) => state.RDauth.user);
  const dataRoutes = useMemo(() => {
    if (!userInfo?.id) {
      redirect("/");
      return [RoutesAuth, RoutesPublic];
    } else {
      if (userInfo.role_id === 2) {
        return [RoutesUser, RoutesPrivate, RoutesAuth];
      } else {
        return [RoutesUser, RoutesAuth];
      }
    }
  }, [userInfo]);

  const routing = useRoutes(dataRoutes); //ใช้ match ในการแบ่ง route

  return routing;
}
