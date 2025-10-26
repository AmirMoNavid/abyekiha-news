import * as Yup from "yup";
export const faqSchema = {
    question: Yup.string().required(),
    answer: Yup.string().required(),
    isActive: Yup.string().required(),
};