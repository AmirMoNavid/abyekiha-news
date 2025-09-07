'use client';

import axios from 'axios';
import Atricle from '../../components/article';
import { useStore } from '../../store/use-hooks';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import MiniNews from '../../components/home/miniNews';
import Ads from '../../components/ads';
import MostViewed from '../../components/home/mostViewed';
import Wrapper from '../../components/wrapper';

const filteredArticles = () => {
  const { articles, setArticles, isLoading, setIsLoading, baseUrl, host } =
    useStore();

  const [lastTourism, setLastTourism] = useState();
  const [lastVillage, setLastVillage] = useState();
  const [video, setVideo] = useState();
  const [category, setCategory] = useState();
  const params = useParams();

  async function getCategory(id) {
    const data = await axios.get(`${baseUrl}/api/category/${id}`);

    setCategory(data.data);
  }

  async function getArticles() {
    const data = await axios.get(`${baseUrl}/api/article`);

    setArticles(data.data);
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

  const catId = params?.['cat-id'];

  useEffect(() => {
    getLastTourism();
    getLastVideo();
    getLatestVillage();
    getCategory(catId);
    getArticles();
    setIsLoading(false);
  }, []);

  const filteredArticles = articles.filter((a, i) => {
    if (a.catId == catId && !undefined) return a;
    else return;
  });

  // return;
  return (
    <>
      <div className=" w-[95%] md:flex-row flex flex-col justify-between gap-4">
        <div className="w-full md:w-[80%] p-2 flex flex-col gap-4">
          <Wrapper text={`${category ? category?.name : 'درحال بارگذاری'}`} />
          {filteredArticles?.length > 0 ? (
            filteredArticles?.map((a, i) =>
              a !== undefined ? <Atricle key={a.id} atricle={a} /> : ''
            )
          ) : (
            <h2 className="italic text-center ">
              خبری مرتبط با این دسته بندی منتشر نشده است.
            </h2>
          )}
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
    </>
  );
};

export default filteredArticles;
