'use client';
import { useStore } from '../../store/use-hooks';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Catalog from '../../components/catalog';
import moment from 'jalali-moment';
import './style.css';
import Ads from '../../components/ads';

const Catalogs = () => {
  const { baseUrl, host } = useStore();

  const [catalogs, setCatalogs] = useState([]);

  async function getCatalogs(cat) {
    const data = await axios.get(`${baseUrl}/api/${cat}`);
    setCatalogs(data.data);
  }

  const params = useParams();

  const category = params?.category;
  useEffect(() => {
    getCatalogs(category);
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-between w-[95%] px-2">
      <div className="md:w-[80%] w-full flex flex-wrap">
        {catalogs.length > 0 ? (
          catalogs.map((c, i) => (
            <Catalog
              id={c.id}
              image={`${host}${c.url}`}
              key={i}
              slug={category}
              category={category == 'tourism' ? 'گردشگری' : 'روستا ها'}
              date={moment(c.createdAt).locale('fa').format('DD MMMM ,YYYY')}
              numViews={c.numViews}
              shortDesc={c.shortDesc}
              title={c.title}
            />
          ))
        ) : (
          <p className="text-center p-2 w-1/2">
            خبری مرتبط با این موضوع منتشر نشده است
          </p>
        )}
      </div>
      <Ads />
    </div>
  );
};

export default Catalogs;
