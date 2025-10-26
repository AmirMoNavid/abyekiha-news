import { useEffect, useState } from 'react';
import Wrapper from '../wrapper';
import axios from 'axios';
import moment from 'jalali-moment';
import { useStore } from '../../store/use-hooks';
import { useRouter } from 'next/navigation';

const MostViewed = () => {
  const [catalogs, setCatalogs] = useState([]);
  const { setIsLoading, baseUrl } = useStore();

  const router = useRouter();

  async function getMostViewd() {
    const { data } = await axios.get(
      `${baseUrl}/api/article?orderBy=numViews&limit=4`
    );

    setCatalogs(data);
  }

  useEffect(() => {
    getMostViewd();
  }, []);

  function handleClick(id) {
    setIsLoading(true);
    router.push(`/article/${id}`);
  }

  return (
    <>
      <Wrapper text={'اخبار پربازدید'} />
      <div className="w-[95%] gap-2 flex flex-wrap md:flex-nowrap  justify-center md:justify-between items-center p-2 ">
        {catalogs.map((c, i) => (
          <div
            onClick={() => handleClick(c.id)}
            key={i}
            className="relative text-white transition hover:translate-1 w-[100%] md:w-[25%] p-2 rounded-md overflow-hidden  most-viewed cursor-pointer "
            style={{
              background: `
    linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${c.url})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
          >
            <div className=" w-full h-[250px] flex flex-col justify-end p-2">
              <h1 className="font-bold text-sm">{c.title}</h1>

              <div className="flex items-end justify-start gap-4">
                <span className="font-semibold">{c.user?.name}</span>
                <time className="opacity-75 text-sm">
                  {moment(c.createdAt).locale('fa').format('YYYY/MM/DD')}
                </time>
              </div>
            </div>
            <div className="w-full p-1 flex items-center justify-end gap-0.5 opacity-85 text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              {c.numViews}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MostViewed;
