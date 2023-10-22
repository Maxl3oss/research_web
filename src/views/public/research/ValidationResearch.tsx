import { IReqResearch } from '@interfaces/global.interface';
import * as yup from 'yup';

const validationSchema: yup.ObjectSchema<IReqResearch> = yup.object({
  // title: yup.string().required("กรุณากรอกชื่อรายงาน"),
  // title_alternative: yup.string().required("กรุณากรอกชื่อรายงานทางเลือก"),
  // creator: yup.string().required("กรุณากรอกชื่อรายงาน"),
  // subject: yup.string().required("กรุณากรอกรายวิชา"),
  // description: yup.string().required("กรุณากรอกชื่อรายงาน"),
  // publisher: yup.string().required("กรุณากรอกรายวิชา"),
  // contributor: yup.string().required("กรุณากรอกรายวิชา"),
  // source: yup.string().required("กรุณากรอกเขียนโดย"),
  // rights: yup.string().required("กรุณากรอกชื่อรายงาน"),
  // year_creation: yup.string().required("กรุณากรอกรายวิชา"),
  // pdf: yup.string().required("กรุณากรอกชื่อรายงาน"),
  // image: yup.string().required("กรุณากรอกชื่อรายงาน"),
  // user_id: yup.string().required("กรุณากรอกชื่อรายงาน"),
  // tags_id: yup.number().required("กรุณากรอกชื่อรายงาน"),
  // tags_name: yup.string().required("กรุณากรอกชื่อรายงาน"),
});

export default validationSchema;