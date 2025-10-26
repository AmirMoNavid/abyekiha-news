'use client';
import Dashboard from '../../../components/admin/Dashboard';
import EditorBox from '../../../components/admin/inputs/editor/editorBox';
import { toast } from 'react-toastify';
import { useFormHandler, T_YupSchema } from '@erfanigh/use-form-handler';
import { toastConfig } from '../../../configs/configs';
import * as Yup from 'yup';
import { categoryFormSchema } from '../../../assets/formSchema/categoryFormSchema';
import { userFormSchema } from '../../../assets/formSchema/userFormSchema';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import { articleFormSchema } from '../../../assets/formSchema/articleFormSchema';
import { tourismFormSchema } from '../../../assets/formSchema/tourismFormSchema';
import { villageFormSchema } from '../../../assets/formSchema/villageFormSchema';
import { advertisingFormSchema } from '../../../assets/formSchema/advertisingFormSchema';
import { useAsyncEffect } from '../../../utils/useAsyncEffect';
import { useContext, useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../../../contexts/authContext';
import { faqSchema } from '../../../assets/formSchema/faqSchema';
import { END_POINTS } from '../../../store/endPoints';
import { pollFormSchema } from '../../../assets/formSchema/pollFormSchema';
import getServerData from '../../../utils/getServerData';
import { useStore } from '../../../store/use-hooks';
import './style.css';
const AddOrEdit = () => {
  const { categories, setCategories } = useStore();
  const { baseUrl } = useStore();

  // const getCategoryList = (mustHaveParentId) => {
  //   return categories?.map((val) => {
  //     if (mustHaveParentId)
  //       if (val.parentId)
  //         return {
  //           value: val.id,
  //           title: val.name,
  //         };
  //       else return null;

  //     if (!mustHaveParentId)
  //       if (val.parentId) return null;
  //       else
  //         return {
  //           value: val.id,
  //           title: val.name,
  //         };
  //   });
  // };

  const d = {
    category: {
      title: 'دسته بندی',
      endPoint: END_POINTS.CATEGORY,
      validationSchema: categoryFormSchema,
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'نام دسته بندی',
        },
        {
          name: 'slug',
          type: 'text',
          placeholder: 'اسلاگ دسته بندی',
        },

        {
          name: 'image',
          type: 'file',
          accept: '.jpg,.png,.jpeg',
          maxSize: {
            width: 1600,
            height: 900,
          },
          showFilePreview: true,
        },
      ],
    },
    faqs: {
      title: 'سوالات پرتکرار',
      validationSchema: faqSchema,
      endPoint: END_POINTS.FAQS,
      inputs: [
        {
          placeholder: 'سوال',
          name: 'question',
          type: 'text',
        },
        {
          placeholder: 'جواب',
          name: 'answer',
          type: 'text',
        },
        {
          name: 'isActive',
          type: 'options',
          showEmptyOption: false,
          options: [
            { value: 0, title: 'خیر' },
            { value: 1, title: 'بله' },
          ],
          placeholder: 'فعال بودن',
        },
      ],
    },
    slideshow: {
      title: 'اسلایدر',
      editAble: false,
      endPoint: END_POINTS.SLIDESHOW,
      validationSchema: {
        file: Yup.string(),
      },
      inputs: [
        {
          name: 'file',
          type: 'file',
          accept: '.jpg,.png,.jpeg',
          maxSize: {
            width: 1600,
            height: 900,
          },
          showFilePreview: true,
        },
      ],
    },
    article: {
      title: 'مقاله',
      endPoint: END_POINTS.ARTICLES,
      validationSchema: articleFormSchema,
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'عنوان',
        },
        {
          name: 'shortDesc',
          type: 'text',
          placeholder: 'توضیحات کوتاه',
        },
        {
          name: 'desc',
          label: 'توضیحات',
          type: 'rich-text',
        },

        {
          name: 'catId',
          type: 'options',
          placeholder: 'دسته بندی',
          options: categories,
        },
        {
          name: 'file',
          type: 'file',
          accept: '.jpg,.png,.jpeg',
          maxSize: {
            width: 1920,
            height: 1080,
          },
          placeholder: 'عکس',
          showFilePreview: true,
        },
      ],
    },
    tourism: {
      title: 'گردشگری',
      endPoint: '/api/tourism',
      validationSchema: tourismFormSchema,
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'عنوان',
        },
        {
          name: 'shortDesc',
          type: 'text',
          placeholder: 'توضیحات کوتاه',
        },
        {
          name: 'desc',
          type: 'rich-text',
          placeholder: 'توضیحات ',
        },

        {
          name: 'file',
          type: 'file',
          accept: '.jpg,.png,.jpeg',
          maxSize: {
            width: 1920,
            height: 1080,
          },
          placeholder: 'عکس',
          showFilePreview: true,
        },
      ],
    },
    village: {
      title: 'گردشگری',
      endPoint: '/api/village',
      validationSchema: villageFormSchema,
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'عنوان',
        },
        {
          name: 'shortDesc',
          type: 'text',
          placeholder: 'توضیحات کوتاه',
        },
        {
          name: 'desc',
          type: 'rich-text',
          placeholder: 'توضیحات ',
        },

        {
          name: 'file',
          type: 'file',
          accept: '.jpg,.png,.jpeg',
          maxSize: {
            width: 1920,
            height: 1080,
          },
          placeholder: 'عکس',
          showFilePreview: true,
        },
      ],
    },
    video: {
      title: 'ویدیو',
      endPoint: '/api/video',

      inputs: [
        {
          name: 'file',
          type: 'file',
          accept: '.mp4,.mkv',
          maxSize: {
            width: 1920,
            height: 1080,
          },
          placeholder: 'ویدیو',
          showFilePreview: true,
        },
      ],
    },
    advertising: {
      title: 'تبلیغات',
      endPoint: '/api/advertising',
      validationSchema: advertisingFormSchema,
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'عنوان',
        },
        {
          name: 'link',
          type: 'text',
          placeholder: 'لینک',
        },

        {
          name: 'file',
          type: 'file',
          accept: '.jpg,.png,.jpeg',
          maxSize: {
            width: 1920,
            height: 1080,
          },
          placeholder: 'عکس',
          showFilePreview: true,
        },
      ],
    },

    users: {
      title: 'کاربر',
      endPoint: END_POINTS.USERS,
      validationSchema: userFormSchema,
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'عنوان',
        },
        {
          name: 'email',
          type: 'text',
          placeholder: 'ایمیل',
        },
        {
          name: 'password',
          type: 'password',
          placeholder: 'پسورد',
        },
        // {
        //     name: 'confPassword',
        //     type: 'password',
        //     placeholder: 'تکرار پسورد',
        // },
        {
          name: 'isAdmin',
          type: 'options',
          options: [
            { value: 0, title: 'نویسنده' },
            { value: 1, title: 'مدیر' },
          ],
          placeholder: 'سطح دسترسی',
        },
        {
          name: 'file',
          type: 'file',
          accept: '.jpg,.png,.jpeg',
          maxSize: {
            width: 1080,
            height: 1080,
          },
          placeholder: 'آواتار',
          showFilePreview: true,
        },
      ],
    },
  };

  const { setEditorBoxState } = useContext(AuthContext);
  const params = useParams();
  const adminSubPage = params?.['admin-sub-page'];
  const isAddPage = params?.['add-or-edit'] === 'add';
  const data = d[adminSubPage];
  const token = getCookie('refreshToken');
  const router = useRouter();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setEditorBoxState({
      data: {},
      isEditMode: false,
    });
  }, [pathname, searchParams]);

  const theId = searchParams.get('id');

  useAsyncEffect(async () => {
    setCategories(await getServerData(END_POINTS.CATEGORY));

    if (!isAddPage) {
      const dataToEdit = await getServerData(`${data.endPoint}/${theId}`);
      setEditorBoxState({
        data: dataToEdit,
        isEditMode: true,
      });
    }
  }, []);

  if (data.editAble === undefined || data.editAble === null)
    data.editAble = true;

  const endPoint = isAddPage ? data.endPoint : `${data.endPoint}/${theId}`;

  const { send } = useFormHandler({
    endPoint: `${baseUrl}${endPoint}`,
    validationSchema: data.validationSchema,
    axiosConfigs: {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    onSuccess() {
      toast.success('عملیات موفقیت آمیز بود.', toastConfig);
      setTimeout(() => {
        router.push('/admin' + data.endPoint.replace('/api', ''));
      }, 1000);
    },
  });

  return !data.editAble && !isAddPage ? (
    <Page404 />
  ) : (
    <Dashboard title={`${isAddPage ? 'افزودن' : 'ویرایش'} ${data.title}`}>
      <EditorBox
        endPoint={data.endPoint}
        inputs={data.inputs}
        send={(e) => send(e, isAddPage ? 'post' : 'put')}
      />
    </Dashboard>
  );
};

export default AddOrEdit;
