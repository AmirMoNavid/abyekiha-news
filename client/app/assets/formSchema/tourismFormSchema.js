import * as Yup from 'yup';

export const tourismFormSchema = {
  title: Yup.string().required('عنوان الزامی است'),
  shortDesc: Yup.string().required('توضیحات کوتاه الزامی است'),
  desc: Yup.string().required('توضیحات الزامی است'),
};
