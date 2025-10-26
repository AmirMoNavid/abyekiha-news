'use client';

import { useStore } from '../../store/use-hooks';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import moment from 'jalali-moment';

import { useEffect } from 'react';
import axios from 'axios';
import './style.css';
import { useRouter } from 'next/navigation';
import Comments from './commentSection';
import CopyNewsUrl from './copyNewsUrl';

const Detail = ({ article }) => {
  if (!article) return;

  const { comments, setComments, setIsLoading, baseUrl, host } = useStore();

  const delta = JSON.parse(article.desc);
  const cfg = {};

  const converter = new QuillDeltaToHtmlConverter(delta, cfg);

  const converted = converter.convert();

  const formatedDesc = converted.replace(
    /src=\/api\/uploads\/images\//g,
    `src=${host}/api/uploads/images/`
  );

  // Comments

  async function getComments() {
    const data = await axios.get(`${baseUrl}/api/comment`);

    setComments(data.data);
  }

  useEffect(() => {
    setIsLoading(false);
    getComments();
  }, []);

  const postComments = comments?.filter(
    (c) => c.newsId == article.id && c.isActive
  );
  return (
    <div className="news p-5 w-[98%] md:w-1/2 ">
      <h1 className="font-bold text-xl">{article.title}</h1>
      <div className="p-3">
        <div className="">
          <ul className="flex flex-wrap mx-[-8px] ">
            <li className="mx-[8px] flex justify-center items-center text-[12px]">
              <a className="justify-center items-center flex">
                <span className="">
                  <i aria-hidden="true" className="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 pt-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  </i>
                </span>
                <span className="pr-[5px]">
                  {article.user ? article.user?.name : 'شهرداری قشلاق'}
                </span>
              </a>
            </li>
            <li className="mx-[8px] flex justify-center items-center text-[12px]">
              <a className="justify-center items-center flex">
                <span className="">
                  <i aria-hidden="true" className="fas fa-calendar ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6 pt-1"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </i>
                </span>
                <span className="pr-[5px]">
                  <time>
                    {moment(article.createdAt)
                      .locale('fa')
                      .format('DD MMMM ,YYYY')}
                  </time>
                </span>
              </a>
            </li>
            <li className="mx-[8px] flex justify-center items-center opacity-75 text-[12px]text-[12px]">
              <span className="">
                <i aria-hidden="true" className="far fa-clock">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6  pt-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </i>
              </span>
              <span className="pr-[5px]">
                <time>
                  {' '}
                  {moment(article.createdAt).locale('fa').format('HH:mm')}
                </time>
              </span>
            </li>
            <li className="mx-[8px] flex justify-center items-center">
              <a className="justify-center items-center flex">
                <span className="">
                  <i aria-hidden="true" className="far fa-comment-dots">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 pt-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                      />
                    </svg>
                  </i>
                </span>
                <span className="pr-[5px]">
                  {postComments.length > 0
                    ? `${postComments.length} کامنت`
                    : 'بدون کامنت'}
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <img className="" src={`${host}${article.url}`} alt="" />
      <h1 className="font-semibold p-1">{article.title}</h1>
      <p>{article.shortDesc}</p>
      <div dangerouslySetInnerHTML={{ __html: formatedDesc }}></div>
      <p className="p-2 font-bold mt-2">{`تعداد بازدید: ${article.numViews}`}</p>
      <CopyNewsUrl />
      <Comments article={article} />
    </div>
  );
};

export default Detail;
