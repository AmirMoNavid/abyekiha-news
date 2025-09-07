import { useRouter } from 'next/navigation';
import { useStore } from '../store/use-hooks';

const Atricle = ({ atricle }) => {
  const { setIsLoading, isLoading, host } = useStore();
  const router = useRouter();

  function handleClick(id) {
    setIsLoading(true);
    router.push(`/article/${id}`);
  }
  return (
    <div
      className={`flex transition hover:translate-1 items-center p-2 my-2 relative  gap-2 ${isLoading ? 'opacity-80' : ''} article-box`}
      key={atricle.id}
    >
      <img
        className="w-[15%] h-auto cursor-pointer"
        src={`${host}${atricle.url}`}
        onClick={() => handleClick(atricle.id)}
      />
      <div className="flex flex-col items-start justify-start">
        <h2
          onClick={() => handleClick(atricle.id)}
          className="font-bold text-[16px] cursor-pointer transition hover:text-[#0D6EFD]"
        >
          {atricle.title}
        </h2>
        <p className="text-sm">{atricle.shortDesc}</p>
        <div className="w-full p-1 flex items-center justify-end gap-0.5 opacity-75 text-sm">
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
          {atricle.numViews}
        </div>
      </div>
    </div>
  );
};

export default Atricle;
