import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { AuthContext } from '../../../contexts/authContext';
import './sidebar.css';
const Sidebar = () => {
  const [showNews, setShowNews] = useState(false);
  const [showSlideShow, setShowSlideShow] = useState(false);
  const [showFaq, setShowFaq] = useState(false);

  const [showCategory, setShowCategory] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showAd, setShowAd] = useState(false);
  const [showTourism, setShowTourism] = useState(false);
  const [showVillage, setShowVillage] = useState(false);
  const { Logout } = useContext(AuthContext);

  return (
    <div className="flex flex-col sidebar h-[800px] pb-4">
      <div className="logo has-text-centered">
        <img width={200} src={'/logo.png'} alt="" />
      </div>

      <div className="list flex-col flex h-full">
        <Link href="/admin/dashboard" className="a">
          داشبورد
        </Link>

        <div onClick={() => setShowNews(!showNews)} className="a">
          <span>نوشتن</span>

          {showNews && (
            <span className="flex flex-col">
              <Link href="/admin/article/add" className="a">
                افزودن نوشته
              </Link>
              <Link href="/admin/article" className="a">
                مشاهده نوشته
              </Link>
            </span>
          )}
        </div>

        <div onClick={() => setShowFaq(!showFaq)} className="a">
          <span>سوالات متداول</span>
          {showFaq && (
            <span className="flex-col flex">
              <Link href="/admin/faqs/add" className="a">
                درج سوال
              </Link>
              <Link href="/admin/faqs" className="a">
                مشاهده سوال ها
              </Link>
            </span>
          )}
        </div>

        <div onClick={() => setShowCategory(!showCategory)} className="a">
          <span>دسته بندی ها</span>
          {showCategory && (
            <span className="flex-col flex">
              <Link href="/admin/category/add" className="a">
                افزودن
              </Link>
              <Link href="/admin/category" className="a">
                مشاهده
              </Link>
            </span>
          )}
        </div>
        <div onClick={() => setShowTourism(!showTourism)} className="a">
          <span>گردشگری</span>
          {showTourism && (
            <span className="flex-col flex">
              <Link href="/admin/tourism/add" className="a">
                افزودن
              </Link>
              <Link href="/admin/tourism" className="a">
                مشاهده
              </Link>
            </span>
          )}
        </div>
        <div onClick={() => setShowVillage(!showVillage)} className="a">
          <span>روستا ها</span>
          {showVillage && (
            <span className="flex-col flex">
              <Link href="/admin/village/add" className="a">
                افزودن
              </Link>
              <Link href="/admin/village" className="a">
                مشاهده
              </Link>
            </span>
          )}
        </div>
        <div onClick={() => setShowAd(!showAd)} className="a">
          <span>تبلیغات</span>
          {showAd && (
            <span className="flex-col flex">
              <Link href="/admin/advertising/add" className="a">
                افزودن
              </Link>
              <Link href="/admin/advertising" className="a">
                مشاهده
              </Link>
            </span>
          )}
        </div>
        <div onClick={() => setShowVideo(!showVideo)} className="a">
          <span>ویدِئو </span>
          {showVideo && (
            <span className="flex-col flex">
              <Link href="/admin/video/add" className="a">
                افزودن
              </Link>
              <Link href="/admin/video" className="a">
                مشاهده
              </Link>
            </span>
          )}
        </div>

        <div onClick={() => setShowUsers(!showUsers)} className="a">
          <span>کاربران</span>
          {showUsers && (
            <span className="flex-col flex">
              <Link href="/admin/users/add" className="a">
                افزودن کاربر
              </Link>
              <Link href="/admin/users" className="a">
                نمایش کاربران
              </Link>
            </span>
          )}
        </div>

        <Link href="/admin/comments" className="a">
          نظرات
        </Link>

        <div onClick={Logout} className="my-6 " style={{ color: '#dd3939' }}>
          خروج
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
