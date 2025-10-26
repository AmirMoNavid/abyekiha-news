import * as Yup from "yup";

export const pollFormSchema = {
  title: Yup.string().required("عنوان الزامی است"),
  description: Yup.string(),
}