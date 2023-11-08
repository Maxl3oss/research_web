import Swal from "sweetalert2";
import { icon as Icons } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faQuestion, faX } from "@fortawesome/free-solid-svg-icons";

interface CustomAlertOptions {
  timer?: number;
  title?: string;
  text?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  icon?: "success" | "error" | "question";
  showCancelButton?: boolean;
  showConfirmButton?: boolean;
  showCloseButton?: boolean;
  focusConfirm?: boolean;
}

export default function ResearchAlert({
  cancelButtonText = "ยกเลิก",
  confirmButtonText = "ตกลง",
  icon = "question",
  title = "",
  text = "",
  timer = 1500,
  focusConfirm = false,
  showCloseButton = false,
  showCancelButton = false,
  showConfirmButton = false,
  ...props
}: CustomAlertOptions) {
  let bgColor = "";
  let iconName;

  switch (icon) {
    case "success":
      iconName = faCheck;
      bgColor = "bg-green-500";
      break;
    case "error":
      iconName = faX;
      bgColor = "bg-red-500";
      break;
    case "question":
      iconName = faQuestion;
      bgColor = "bg-yellow-500";
      break;
  }

  const htmlContents = `
    <div class="w-full">
      <div class="swal2-main-content mx-3 mt-10 text-left z-20">
        <div class="font-medium text-3xl">${title}</div>
        <div class="font-thin text-md mt-2">${text}</div>
      </div>
      <div class="bg-icon ${bgColor} z-10">
        <div class="h-14 text-white text-5xl flex items-center justify-center">
          ${Icons(iconName).html.join('')}
        </div>
      </div>
    </div>
  `;

  return Swal.fire({
    html: htmlContents,
    confirmButtonText: confirmButtonText,
    cancelButtonText: cancelButtonText,
    showCloseButton: showCloseButton,
    showCancelButton: showCancelButton,
    showConfirmButton: showConfirmButton,
    focusConfirm: focusConfirm,
    timer: timer,
    // icon: icon,
    ...props,
  });
}
