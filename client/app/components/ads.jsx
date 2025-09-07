'use client';
import { useEffect, useState } from 'react';
import AdItem from './adItem';
import axios from 'axios';
import { useStore } from '../store/use-hooks';
import moment from 'jalali-moment';
import Wrapper from './wrapper';

const Ads = () => {
  const { host, baseUrl } = useStore();
  const [ads, setAds] = useState([]);

  async function getAds() {
    const { data } = await axios.get(`${baseUrl}/api/advertising`);

    setAds(data);
  }

  useEffect(() => {
    getAds();
  }, []);

  return (
    <div className=" w-[100%]  flex-row flex-wrap md:w-[15%] flex md:flex-col justify-center md:justify-start gap-1 md:gap-0 text-[#fff]">
      <div
        className="p-2  rounded-md my-2 text-sm hidden md:inline"
        style={{ backgroundColor: 'rgb(24, 129, 24)' }}
      >
        محل درج تبلیغات
      </div>
      <div className=" block w-full text-black md:hidden">
        <Wrapper text={'تبلیغات'} />
      </div>
      {ads.map((a, i) => (
        <AdItem
          key={i}
          date={moment(a.createdAt).locale('fa').format('YYYY/MM/DD')}
          link={a.link}
          text={a.title}
          image={`${host}${a.url}`}
        />
      ))}
    </div>
  );
};

export default Ads;
