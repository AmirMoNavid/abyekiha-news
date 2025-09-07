import * as Yup from "yup";

export const commentSchema = {
  writeId: Yup.string().required("آیدی مقاله الزامی است"),
  name: Yup.string().required("نام الزامی است"),
  description: Yup.string().required("توضیحات الزامی است"),
  subject: Yup.string().required("عنوان الزامی است"),
  email: Yup.string().email('ایمیل نامعتبر میباشد').required("ایمیل الزامی است"),
}