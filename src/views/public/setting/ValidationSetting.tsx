import * as yup from 'yup';
import { FILE_SIZE, IReqUser, SUPPORTED_FORMATS } from '@interfaces/global.interface';
interface CustomFile extends File {
  type: string;
}

const isUrl = (value: unknown) => typeof value === 'string' && value.startsWith('http');

const ValidationSetting: yup.ObjectSchema<IReqUser> = yup.object({
  id: yup.string(),
  role_id: yup.string(),
  role_title: yup.string(),
  prefixName: yup.string().required(),
  prefix: yup.string().required("กรุณาเลือกคำนำหน้า"),
  first_name: yup.string().required("กรุณากรอกชือ"),
  last_name: yup.string().required("กรุณากรอกนามสกุล"),
  email: yup.string().required("กรุณากรอกอีเมล"),
  isChangePassword: yup.boolean(),

  password: yup.string()
    .when("isChangePassword", (isChangePassword, schema) => {
      return isChangePassword ? schema : schema.required("กรุณากรอกรหัสผ่าน");
    }),

  confirmPassword: yup.string()
    .when("isChangePassword", (isChangePassword, schema) => {
      return isChangePassword ? schema : schema.required("กรุณากรอกยืนยันรหัสผ่าน");
    })
    .test("passwords-match", "รหัสผ่านไม่ตรงกัน", function (value) {
      return this.parent.password === value;
    }),

  profile: yup.mixed<CustomFile>()
    .transform((value, originalValue) => { if (originalValue === "") { return ""; } return value; })
    .test("fileSize", "กรุณาอัปโหลดไฟล์ไม่เกิน 10 MB", (value) => !value || isUrl(value) || value.size <= FILE_SIZE)
    .test("fileFormat", "กรุณาอัปโหลดไฟล์ png, jpg", (value) => !value || isUrl(value) || SUPPORTED_FORMATS.image.includes(value.type))
    .test("isRequired", "กรุณาอัปโหลดรูปภาพ", (value) => {
      if ((typeof value === 'string') || (isUrl(value))) return true;
      return !!value;
    })
});

export default ValidationSetting;