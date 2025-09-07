import * as Yup from 'yup';
export const advertisingFormSchema = {
  title: Yup.string()
    .max(15, 'تعداد کاراکتر ها نباید بیشتر از ۱۵ باشد')
    .required('وارد کردن نام الزامی می باشد.'),
  link: Yup.string().required('وارد کردن لینک الزامی می باشد.'),
};
