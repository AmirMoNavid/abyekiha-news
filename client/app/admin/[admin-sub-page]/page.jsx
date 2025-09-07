'use client';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/authContext';
import Dashboard from '../../components/admin/Dashboard';
import DataTable, {
  T_EditButton,
  T_DataTableColumn,
} from '../../components/admin/dataTable';
import { useParams, useRouter } from 'next/navigation';
import Page404 from '../../404/page';
import { END_POINTS } from '../../store/endPoints';
import { axiosInstance } from '../../configs/configs';
import getServerData from '../../utils/getServerData';
import { useAsyncEffect } from '../../utils/useAsyncEffect';
import ViewMoreModal from '../../components/admin/viewMoreModal';
import { useStore } from '../../store/use-hooks';
import { getCookie } from 'cookies-next';

const ViewItems = () => {
  const { deleteItem } = useContext(AuthContext);
  const [polls, setPolls] = useState([]);
  const { baseUrl, host } = useStore();
  const token = getCookie('refreshToken');
  const router = useRouter();

  // const {admin-sub-page} = useParams();
  const params = useParams();

  const subPage = params?.['admin-sub-page'];

  useAsyncEffect(async () => {
    const polls = await getServerData(END_POINTS.POLL);
    setPolls(polls);
  }, []);

  const d = {
    slideshow: {
      title: 'اسلایدر',
      editAble: false,
      addNewLink: {
        href: '/admin/slideshow/add',
        label: 'افزودن اسلاید',
      },
      dataTable: {
        dataSourceEndpoint: END_POINTS.SLIDESHOW,
        columns: [
          {
            title: 'اسلاید',
            key: 'url',
          },
        ],
      },
    },
    faqs: {
      title: 'سوالات پرتکرار',
      editAble: true,
      addNewLink: {
        href: '/admin/faqs/add',
        label: 'افزودن سوال',
      },
      dataTable: {
        dataSourceEndpoint: END_POINTS.FAQS,
        columns: [
          {
            title: 'سوال',
            key: 'question',
          },
          {
            title: 'جواب',
            key: 'answer',
          },
          {
            title: 'لایک',
            key: 'upVote',
          },
          {
            title: 'دیسلایک',
            key: 'downVote',
          },
          {
            title: 'وضعیت',
            key: 'isActive',
            value: (val) => {
              return Boolean(val) ? (
                <p style={{ color: 'green' }}>فعال</p>
              ) : (
                <p style={{ color: 'red' }}>غیر فعال</p>
              );
            },
          },
        ],
      },
    },
    category: {
      title: 'دسته بندی',
      addNewLink: {
        href: '/admin/category/add',
        label: 'افزودن دسته بندی',
      },
      dataTable: {
        dataSourceEndpoint: END_POINTS.CATEGORY,
        columns: [
          {
            title: 'نام دسته بندی',
            key: 'name',
          },
          {
            title: 'اسلاگ',
            key: 'slug',
          },
        ],
      },
    },
    users: {
      title: 'کاربران',
      addNewLink: {
        href: '/admin/users/add',
        label: 'افزودن کاربر',
      },
      dataTable: {
        dataSourceEndpoint: END_POINTS.USERS,
        columns: [
          {
            title: 'نام و نام خانوادگی',
            key: 'name',
          },
          {
            title: 'ایمیل',
            key: 'email',
          },
          {
            title: 'نقش',
            key: 'isAdmin',
            value: (val) => {
              return Boolean(val) ? 'ادمین' : 'نویسنده';
            },
          },
        ],
      },
    },
    article: {
      title: 'مقالات',
      addNewLink: {
        href: '/admin/article/add',
        label: 'افزودن مقاله',
      },
      dataTable: {
        dataSourceEndpoint: END_POINTS.ARTICLES,
        columns: [
          {
            title: 'عنوان',
            key: 'title',
          },
          {
            title: 'توضیح کوتاه',
            key: 'shortDesc',
          },

          {
            title: 'عکس',
            key: 'url',
          },
        ],
      },
    },

    tourism: {
      title: 'گردشگری',
      addNewLink: {
        href: '/admin/tourism/add',
        label: 'افزودن مقاله گردشگری',
      },
      dataTable: {
        dataSourceEndpoint: '/api/tourism',
        columns: [
          {
            title: 'عنوان',
            key: 'title',
          },
          {
            title: 'توضیح کوتاه',
            key: 'shortDesc',
          },

          {
            title: 'عکس',
            key: 'url',
          },
        ],
      },
    },
    village: {
      title: 'گردشگری',
      addNewLink: {
        href: '/admin/village/add',
        label: 'افزودن مقاله گردشگری',
      },
      dataTable: {
        dataSourceEndpoint: '/api/village',
        columns: [
          {
            title: 'عنوان',
            key: 'title',
          },
          {
            title: 'توضیح کوتاه',
            key: 'shortDesc',
          },

          {
            title: 'عکس',
            key: 'url',
          },
        ],
      },
    },
    advertising: {
      title: 'تبلیغات',
      addNewLink: {
        href: '/admin/advertising/add',
        label: 'افزودن تبلیغ',
      },
      dataTable: {
        dataSourceEndpoint: '/api/advertising',
        columns: [
          {
            title: 'عنوان',
            key: 'title',
          },
          {
            title: 'لینک',
            key: 'link',
          },

          {
            title: 'عکس',
            key: 'url',
          },
        ],
      },
    },
    video: {
      title: 'ویدیو',
      addNewLink: {
        href: '/admin/video/add',
        label: 'افزودن ویدیو',
      },
      dataTable: {
        dataSourceEndpoint: '/api/video',
        columns: [
          {
            title: 'ویدیو',
            key: 'video',
          },
        ],
      },
    },

    comments: {
      title: 'نظرات',
      dataTable: {
        dataSourceEndpoint: END_POINTS.COMMENTS,
        customEditButton(item) {
          const setCommentStatus = (isActive) => {
            const url = isActive
              ? END_POINTS.COMMENTS_DEACTIVATE
              : END_POINTS.COMMENTS_ACTIVATE;
            axiosInstance.put(url.replace(':commentId', String(item.id)));
          };
          return (
            <button
              onClick={() => setCommentStatus(Boolean(item.isActive))}
              className="button is-warning"
            >
              {item.isActive ? 'غیر فعال' : 'فعال'}
            </button>
          );
        },
        columns: [
          {
            title: 'موضوع',
            key: 'subject',
          },
          {
            title: 'متن',
            key: 'description',
          },
          {
            title: 'ایمیل',
            key: 'email',
          },
          {
            title: 'وضعیت',
            key: 'isActive',
            value: (val) => {
              return Boolean(val) ? (
                <p style={{ color: 'green' }}>فعال</p>
              ) : (
                <p style={{ color: 'red' }}>غیر فعال</p>
              );
            },
          },
        ],
      },
    },
  };

  const data = d[subPage];

  // if (!data) return <Page404 />;

  // if (data.editAble === undefined || data.editAble === null)
  //   data.editAble = true;
  useEffect(() => {
    if (!token) return window.location.replace(`/admin/auth`);
  }, []);
  return (
    <Dashboard
      title={data.title}
      button={
        data.addNewLink && (
          <Link
            href={data.addNewLink.href}
            className="button px-6 p-2 rounded-md  is-success"
          >
            {data.addNewLink.label}
          </Link>
        )
      }
    >
      <DataTable
        dataSourceEndpoint={data.dataTable.dataSourceEndpoint}
        deleteItem={{
          onDelete(_data) {
            deleteItem(
              `${baseUrl}${data.dataTable.dataSourceEndpoint}`,
              _data.id
            );
          },
          isBtnDisabled(_data) {
            return Boolean(_data.isAdmin);
          },
        }}
        editItem={{
          onEdit(_data) {
            const route = `/admin${data.dataTable.dataSourceEndpoint.replace('/api', '')}/edit?id=${_data.id}`;
            router.push(route);
          },
          isBtnDisabled() {
            return !data.editAble;
          },
        }}
        columns={data.dataTable.columns}
      />
    </Dashboard>
  );
};

export default ViewItems;
