import * as Yup from "yup";

export const commonFormSchema = {
  title: Yup.string().required("عنوان خبر الزامی است"),
  desc: Yup.string().required("متن خبر الزامی است"),
  shortDesc: Yup.string().required("متن کوتاه خبر الزامی است"),
  catId: Yup.string().required("انتخاب دسته بندی الزامی است"),
}