import * as Yup from "yup";

export const articleFormSchema = {
  title: Yup.string().required("عنوان الزامی است"),
  shortDesc: Yup.string().required("توضیحات کوتاه الزامی است"),
  desc: Yup.string().required("توضیحات الزامی است"),
  catId: Yup.string().required("انتخاب دسته بندی الزامی است"),
}