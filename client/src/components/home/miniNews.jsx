import moment from 'jalali-moment';
// import './style.css';
import { useStore } from '../../store/use-hooks';
import { useRouter } from 'next/navigation';
const MiniNews = ({ article, category }) => {
  const router = useRouter();

  async function goToDetail(id) {
    const slug = category == 'گردشگری' ? 'tourism' : 'village';
    router.push(`/article/other/${slug}/${id}`);
  }

  const { host } = useStore();
  return (
    <div
      onClick={() => goToDetail(article?.id)}
      className="transition hover:translate-1 w-[48%] md:w-full text-white p-2 rounded-md overflow-hidden"
    >
      <div
        className="tourism w-full h-[250px] md:h-[300px] flex flex-col justify-end p-2"
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${host}${article?.url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          MozBorderRadius: '5px',
          WebkitBorderRadius: '5px',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div
          className="w-max p-1 text-sm rounded-md "
          style={{ backgroundColor: 'rgb(24, 129, 24)' }}
        >
          {category}
        </div>
        <h3 className="md:font-bold  text-sm md:text-lg ">{article?.title}</h3>
        <p className="hidden md:block">
          {moment(article?.createdAt).locale('fa').format('DD MMMM ,YYYY')}
        </p>
      </div>
    </div>
  );
};

export default MiniNews;
