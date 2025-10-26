'use client';
import { useParams } from 'next/navigation';
import { useStore } from '../../store/use-hooks';
import Detail from '../../../app/components/detailPage/news';
import LastNews from '../../../app/components/detailPage/lastNews';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../../components/loader/loader';
import Ads from '../../components/ads';
import { getCookie } from 'cookies-next';

const Artice = () => {
  const { latestNews, comments, setCmments, setLatestNews, baseUrl } =
    useStore();

  const [article, setArticle] = useState(null);

  const params = useParams();

  const token = getCookie('refreshToken');

  async function getArticle(id) {
    const data = await axios.get(`${baseUrl}/api/article/${id}`, {
      withCredentials: true,
    });

    const trackView = axios.get(`${baseUrl}/api/article/trackView/${id}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // const parsed = JSON.parse(data);
    setArticle(data.data);
  }

  async function getLatestNews() {
    const data = await axios.get(`${baseUrl}/api/article/latest`, {
      withCredentials: true,
    });

    setLatestNews(data.data);
  }

  useEffect(() => {
    const articleId = params?.['article-id'];
    getArticle(articleId);
    getLatestNews();
  }, []);

  if (!article)
    return (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    );
  return (
    <div className=" w-full flex flex-col md:flex-row justify-center gap-3">
      <LastNews />
      {article ? <Detail article={article} /> : ''}
      <Ads />
    </div>
  );
};

export default Artice;
