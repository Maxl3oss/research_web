import { redirect, useRoutes } from "react-router-dom";
import { RoutesAuth, RoutesPrivate, RoutesPublic, RoutesUser, RoutesAuthor } from "./Routes";
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
      switch (userInfo.role_id) {
        case 2:
          return [RoutesUser, RoutesAuthor, RoutesPrivate, RoutesAuth];
        case 3:
          return [RoutesUser, RoutesAuthor, RoutesAuth];
        default:
          return [RoutesUser, RoutesAuth, RoutesPublic];

      }
    }
  }, [userInfo]);

  const routing = useRoutes(dataRoutes); //ใช้ match ในการแบ่ง route

  return routing;
}
