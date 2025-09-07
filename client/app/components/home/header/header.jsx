'use client';
import { useStore } from '../../../store/use-hooks';
import './style.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import DateAndTime from '../dateAndTime';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

const Header = () => {
  const { categories, setCategories, isLoading, setIsLoading, baseUrl } =
    useStore();
  const [showNav, setShowNav] = useState(false);
  async function getCats() {
    let categories = await axios.get(`${baseUrl}/api/category`);

    // const byId = {};
    // categories.data.forEach((i) => (byId[i.id] = { ...i, children: [] }));
    // categories.data.forEach((i) => {
    //   if (i.parentId !== null && byId[i.parentId]) {
    //     byId[i.parentId].children.push(byId[i.id]);
    //   }
    // });

    // categories = categories.data
    //   .filter((i) => i.parentId === null)
    //   .map((i) => byId[i.id]);

    setCategories(categories.data);
  }

  const path = usePathname();

  const isAdminPage = path.startsWith('/admin');

  useEffect(() => {
    if (isAdminPage) return;
    if (showNav) {
      document.querySelector('.nav-bar').style.transform = 'translateX(-100%)';
    } else {
      document.querySelector('.nav-bar').style.transform = 'translateX(100%)';
    }
  }, [showNav]);

  useEffect(() => {
    getCats();
  }, []);

  const router = useRouter();

  function handleCatalogs(name) {
    setShowNav(false);
    setIsLoading(true);
    router.push(`/catalogs/${name}`);
  }

  function goToFooter() {
    document.querySelector('.footer').scrollIntoView();
  }

  function handleCategory(id) {
    setShowNav(false);
    setIsLoading(true);
    router.push(`/articles/${id}`);
  }
  if (isAdminPage) return;
  return (
    <>
      <div
        className={`w-full ${isLoading ? 'opacity-85' : ''}  flex flex-col justify-center items-center bg-[#54595F]`}
      >
        <div className="time h-8 w-full flex justify-start items-center p-3">
          <DateAndTime />
        </div>

        <div
          className="flex justify-between items-center p-5 w-full  "
          style={{ backgroundColor: 'rgb(24, 129, 24)' }}
        >
          <Image width={150} height={150} alt="logo" src="/logo.png" />
          <img src="/jahan.png" className="bac-header" alt="bac" />
        </div>

        <div className="items hidden md:block">
          <ul className="flex-row-reverse flex w-full p-5 justify-center gap-2 ">
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => {
                  if (cat.name == 'گردشگری' || cat.name == 'روستا ها') {
                    handleCatalogs(cat.slug);
                  } else if (cat.name == 'تماس با ما') {
                    goToFooter();
                  } else {
                    handleCategory(cat.id);
                  }
                }}
                className="flex flex-col items-center relative "
              >
                <span
                  // onMouseOver={() => handleHover(cat.id)}
                  // onMouseLeave={() => handleLeave(cat.id)}
                  className="transition cursor-pointer group]: hover:text-[#012044] font-bold text-[#ffffff] category"
                >
                  {cat.name}
                </span>
              </div>
            ))}
            <div
              onClick={() => {
                setShowNav(false);
                router.push('/');
              }}
              className="flex font-bold flex-col items-center relative "
            >
              <span
                // onMouseOver={() => handleHover(cat.id)}
                // onMouseLeave={() => handleLeave(cat.id)}
                className="transition cursor-pointer group]: hover:text-[#012044] font-bold text-[#ffffff] category"
              >
                صفحه اصلی
              </span>
            </div>
          </ul>
        </div>

        <div className="items flex w-full py-2 px-5 justify-start md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="#fff"
            onClick={() => setShowNav(!showNav)}
            className="size-8 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
      </div>
      <div className="item absolute z-30  p-2 nav-bar h-screen md:hidden w-[50%] translate-x-[100%] transition  ">
        <ul className=" flex w-full p-5 flex-col-reverse justify-start gap-2  ">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                if (cat.name == 'گردشگری' || cat.name == 'روستا ها') {
                  handleCatalogs(cat.slug);
                } else if (cat.name == 'تماس با ما') {
                  goToFooter();
                } else {
                  handleCategory(cat.id);
                }
              }}
              className="flex flex-col items-start  border-b border-b-slate-400"
            >
              <span className="transition block cursor-pointer group]: hover:text-[#012044] font-bold text-[#ffffff] category ">
                {cat.name}
              </span>
            </div>
          ))}

          <div
            onClick={() => {
              setShowNav(false);
              router.push('/');
            }}
            className="flex flex-col items-start font-bold  border-b border-b-slate-400  "
          >
            <span
              // onMouseOver={() => handleHover(cat.id)}
              // onMouseLeave={() => handleLeave(cat.id)}
              className="transition cursor-pointer group]: hover:text-[#012044] font-bold text-[#ffffff] category"
            >
              صفحه اصلی
            </span>
          </div>
        </ul>
        <svg
          onClick={() => setShowNav(!showNav)}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="#fff"
          className="size-7 cursor-pointer absolute top-2 left-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </div>
    </>
  );
};

export default Header;
