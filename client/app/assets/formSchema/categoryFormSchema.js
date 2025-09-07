import * as Yup from 'yup';
export const categoryFormSchema = {
  name: Yup.string().required('وارد کردن نام الزامی می باشد.'),
  slug: Yup.string()
    .matches(/^\S*$/, { message: 'اسلاگ نباید شامل هیچ فضای خالی باشد' })
    .required('وارد کردن اسلاگ الزامی می باشد.'),
  // showOnNavbar: Yup.string(),
  // parentId: Yup.string()
};
