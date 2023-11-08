import * as yup from 'yup';
import { IReqResearch } from '@interfaces/global.interface';

const FILE_SIZE = 5000000; // 5MB in bytes
const SUPPORTED_FORMATS = {
  pdf: ['application/pdf'],
  image: ['image/jpeg', 'image/png']
};
interface CustomFile extends File {
  type: string;
}
const isUrl = (value: unknown) => typeof value === 'string' && value.startsWith('http');

const validationSchema: yup.ObjectSchema<IReqResearch> = yup.object({
  title: yup.string().required("กรุณากรอกชื่อรายงาน"),
  title_alternative: yup.string().required("กรุณากรอกชื่อรายงานทางเลือก"),
  creator: yup.string().required("กรุณากรอกจัดทำโดย"),
  subject: yup.string().required("กรุณากรอกรายวิชา"),
  description: yup.string().required("กรุณากรอกรายละเอียด"),
  publisher: yup.string().required("กรุณากรอกผู้จัดพิมพ์"),
  contributor: yup.string().required("กรุณากรอกผู้ร่วมให้ข้อมูล"),
  source: yup.string().required("กรุณากรอกแหล่งที่มา"),
  rights: yup.string().required("กรุณากรอกสิทธิ"),
  year_creation: yup.string().required("กรุณาใส่ปีที่จัดทำ"),

  user_id: yup.string().required(),
  tags_id: yup.string().required(),
  tags_name: yup.string().required("กรุณาเลือกประเภท"),

  image: yup.mixed<CustomFile>()
    .transform((value, originalValue) => { if (originalValue === "") { return null; } return value; })
    .test('fileSize', 'กรุณาอัปโหลดไฟล์ไม่เกิน 10 MB', (value) => !value || isUrl(value) || value.size <= FILE_SIZE)
    .test('fileFormat', 'กรุณาอัปโหลดไฟล์ png, jpg', (value) => !value || isUrl(value) || SUPPORTED_FORMATS.image.includes(value.type))
    .test('isRequired', 'กรุณาอัปโหลดรูปภาพ', (value) => {
      if (typeof value === 'string' && (isUrl(value))) return true;
      return !!value;
    })
    .required('กรุณาอัปโหลดรูปภาพ'),

  // pdf: yup.array().min(1, 'กรุณาอัปโหลดไฟล์'),
  pdf: yup.mixed().required("ss"),
  // pdf: yup.array()
  //   .min(1, 'กรุณาอัปโหลดไฟล์')
  //   .of(
  //     yup.mixed<CustomFile>()
  //       .test("type-files", "กรุณาอัปโหลดไฟล์ (.png, .jpg, .jpeg)", (value) => {
  //         if (typeof value === "string") return true; // Allow strings, skip validation
  //         return !value || SUPPORTED_FORMATS.pdf.includes(value.type)
  //       })
  //       .test('fileSize', 'กรุณาอัปโหลดไฟล์ไม่เกิน 10 mb', (value) => {
  //         if (typeof value === "string") return true;
  //         return !value || value.size <= FILE_SIZE
  //       })
  //   ).required('กรุณาอัปโหลดไฟล์'),
});

export default validationSchema;