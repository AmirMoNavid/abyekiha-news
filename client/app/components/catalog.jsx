'use client';
import { useRouter } from 'next/navigation';
import { BsEye } from 'react-icons/bs';

const Catalog = ({
  category,
  date,
  slug,
  numViews,
  title,
  shortDesc,
  image,
  id,
}) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/article/other/${slug}/${id}`)}
      className=" transition text-sm hover:translate-1 text-white p-4 rounded-md overflow-hidden h-[450px] w-1/2 md:w-1/3"
    >
      <div
        className="catalog relative w-full h-[100%] flex flex-col justify-end p-2"
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          MozBorderRadius: '5px',
          WebkitBorderRadius: '5px',
        }}
      >
        <div className="bg-blue-600 w-max  p-1 px-3 text-sm  rounded-md ">
          {category}
        </div>
        <h1 className="font-bold text-lg ">{title}</h1>
        <p>{shortDesc}</p>
        <p className="text-end  p-1">{date}</p>
        <div className=" flex items-center gap-1 absolute top-6 left-[5%]">
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
          <span>{numViews}</span>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
