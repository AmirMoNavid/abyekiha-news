'use client';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Page404 from '../../404/page';
import axios from 'axios';
import { useStore } from '../../store/use-hooks';
import Vote from '../../components/home/FAQs/vote/vote';
import './style.css';
import { END_POINTS } from '../../store/endPoints';
import { getCookie } from 'cookies-next';

const Faq = () => {
  const { baseUrl } = useStore();
  const [faq, setFaq] = useState([]);
  const params = useParams();
  const router = useRouter();
  const token = getCookie('refreshToken');

  async function getFaq(id) {
    try {
      const data = await axios.get(`${baseUrl}/api/faqs/${id}`);

      setFaq(data.data);
    } catch (err) {
      router.push('/');
    }
  }

  async function trackView(id) {
    const trackView = axios.get(`${baseUrl}/api/faqs/trackView/${id}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  useEffect(() => {
    const faqId = params?.['faq-id'];
    getFaq(faqId);
    trackView(faqId);
  }, []);

  return (
    <div className="py-5 md:w-4/5 w-11/12 mx-auto f-center flex-col opacity-90">
      <div className="flex f-center-between w-full mb-5 md:mb-10">
        <Link href={'/#faqs'} className="flex f-center-start w-1/3 gap-2">
          <FaArrowRight size={13} />
          بازگشت
        </Link>
        <h1 className="font-bold md:text-xl text-center">سوالات متداول</h1>
        <span className="w-1/3"></span>
      </div>

      <div className="flex flex-col border w-full gap-3 p-4 md:p-5 rounded-2xl">
        <h1 className="font-bold md:text-xl">{faq.question}</h1>
        <p className="text-base">{faq.answer}</p>
      </div>

      <div className="f-center-between w-full mt-5">
        <div>تعداد بازدید: {faq.viewCount ?? 0}</div>
        <Vote key={faq.id} faq={faq} />
      </div>
    </div>
  );
};

export default Faq;
