import ResearchAlert from "@components/customs/alert";
import { IResponse } from "@interfaces/research.interface";

export function ResponseAlert(res: Omit<IResponse, 'pagin'>, title = "สำเร็จ !!!"): { success: boolean; message: string | undefined } {
  try {
    if (res && (res.statusCode === 200 && res.taskStatus)) {
      ResearchAlert({
        timer: 1000,
        title: title,
        icon: "success",
      });
      return { success: true, message: undefined };
    } else {
      console.error(`Failed to save data: ${res.message}`);
      ResearchAlert({
        timer: 0,
        title: "ไม่สำเร็จ !!!",
        icon: "error",
        text: `บันทึกข้อมูลไม่สำเร็จ: ${res.message}`,
        showConfirmButton: true,
      });
      return { success: false, message: res.message };
    }
  } catch (err) {
    ResearchAlert({
      timer: 0,
      title: "ไม่สำเร็จ !!!",
      icon: "error",
      text: "Server Error! Please try again later.",
      showConfirmButton: true,
    });
    return { success: false, message: 'Server Error' };
  }
}