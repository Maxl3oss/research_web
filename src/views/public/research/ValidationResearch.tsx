/* eslint-disable  @typescript-eslint/no-explicit-any */
import * as yup from 'yup';
import { FILE_SIZE, IReqResearch, SUPPORTED_FORMATS } from '@interfaces/global.interface';
interface CustomFile extends File {
  type: string;
}
// interface CustomFileList extends FileList {
//   type: string;
// }
const isUrl = (value: unknown) => typeof value === 'string' && value.startsWith('http');
const ValidationResearch: yup.ObjectSchema<IReqResearch> = yup.object({
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

  pdf: yup.mixed()
    .test("fileSize", "กรุณาอัปโหลดไฟล์ไม่เกิน 10 mb", (value: any) => {
      if (typeof value === "string") return true; 
      return value && value[0]?.size <= FILE_SIZE;
    })
    .test("fileFormat", "กรุณาอัปโหลดไฟล์ (.pdf)", (value: any) => {
      if (typeof value === "string") return true; 
      return value && SUPPORTED_FORMATS.pdf.includes(value[0]?.type);
    }).required('กรุณาอัปโหลดไฟล์'),

  pdf_name: yup.string(),
});

export default ValidationResearch;