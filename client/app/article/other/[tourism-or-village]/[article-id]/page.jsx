'use client';
import { useParams } from 'next/navigation';
import { useStore } from '../../../../store/use-hooks';
import Detail from '../../../../components/detailPage/news';
import LastNews from '../../../../components/detailPage/lastNews';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../../../../components/loader/loader';
import Ads from '../../../../components/ads';
import { getCookie } from 'cookies-next';

const Artice = () => {
  const { latestNews, comments, setCmments, setLatestNews, baseUrl } =
    useStore();

  const [article, setArticle] = useState(null);

  const params = useParams();

  const token = getCookie('refreshToken');

  async function getArticle(id, cat) {
    if (cat == 'tourism') {
      const data = await axios.get(`${baseUrl}/api/tourism/${id}`, {
        withCredentials: true,
      });

      const trackView = axios.get(`${baseUrl}/api/tourism/trackView/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setArticle(data.data);
    } else {
      const data = await axios.get(`${baseUrl}/api/village/${id}`, {
        withCredentials: true,
      });

      const trackView = axios.get(`${baseUrl}/api/village/trackView/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setArticle(data.data);
    }
    // const parsed = JSON.parse(data);
  }

  async function getLatestNews() {
    const data = await axios.get(`${baseUrl}/api/article/latest`, {
      withCredentials: true,
    });

    setLatestNews(data.data);
  }

  useEffect(() => {
    const articleId = params?.['article-id'];
    const category = params?.['tourism-or-village'];

    getArticle(articleId, category);
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
