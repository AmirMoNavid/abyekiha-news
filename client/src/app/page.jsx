'use client';

import { useStore } from './store/use-hooks';
import Atricle from './components/article';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Ads from './components/ads';
import Wrapper from './components/wrapper';
import MiniNews from './components/home/miniNews';
import MostViewed from './components/home/mostViewed';
import FAQs from './components/home/FAQs/FAQs';

export default function Home() {
  const { latestNews, setLatestNews, baseUrl, host } = useStore();
  const [lastTourism, setLastTourism] = useState();
  const [lastVillage, setLastVillage] = useState();
  const [video, setVideo] = useState();

  async function getLatestNews() {
    const data = await axios.get(`${baseUrl}/api/article/latest`);

    setLatestNews(data.data);
  }
  async function getLastTourism() {
    const data = await axios.get(`${baseUrl}/api/tourism/lasttourism`);

    setLastTourism(data.data);
  }
  async function getLatestVillage() {
    const data = await axios.get(`${baseUrl}/api/village/lastvillage`);

    setLastVillage(data.data);
  }

  async function getLastVideo() {
    const data = await axios.get(`${baseUrl}/api/singleVideo`);

    setVideo(data.data);
  }

  useEffect(() => {
    getLastVideo();
    getLatestNews();
    getLastTourism();
    getLatestVillage();
  }, []);

  return (
    <div className="w-full">
      <div className="px-4 md:flex-row flex flex-col w-full justify-content-between gap-4">
        <div className="md:hidden block">
          <Wrapper text={'آخرین اخبار'} />
        </div>
        <div className="flex md:flex-col  flex-row items-center justify-start md:w-1/2 w-full">
          <div className="md:block hidden w-full">
            <Wrapper text={'آخرین اخبار'} />
          </div>
          <div className="w-[95%]">
            {latestNews.map((n, i) => (
              <Atricle atricle={n} key={n.id} />
            ))}
          </div>
        </div>
        <div className="mini-news justify-center flex-wrap items-center gap-2 w-full md:w-[35%] h-max mt-6 flex  md:flex-col">
          <video
            className=" md:w-full w-[90%] h-[300px] rounded-md overflow-hidden "
            type="video/webm"
            controls
            src={`${host}${video?.url}`}
            style={{ WebkitBorderRadius: '10px' }}
          />
          {lastTourism && lastVillage ? (
            <>
              <MiniNews article={lastTourism[0]} category={'گردشگری'} />
              <MiniNews article={lastVillage[0]} category={'روستا ها'} />
            </>
          ) : (
            ''
          )}
        </div>
        <Ads />
      </div>
      <MostViewed />

      <FAQs />
    </div>
  );
}
