import * as Yup from 'yup';
export const userFormSchema = {
    name: Yup.string()
        .min(3, "تعداد کارکتر نباید کمتر از 3 باشد")
        .max(15, "تعداد کارکتر نباید بیشتر از 15 باشد")
        .required("وارد کردن نام کاربری الزامی است"),
    email: Yup.string()
        .email("ایمیل معتبر وارد کنید")
        .required("وارد کردن ایمیل الزامی است"),
    password: Yup.string()
        .min(4, "تعداد کارکتر نباید کمتر از 4 باشد")
        .max(20, "تعداد کارکتر نباید بیشتر از 20 باشد")
        .required("وارد کردن پسوورد الزامی است"),
    isAdmin: Yup.string().required("وارد کردن نقش کاربری الزامی است"),
};