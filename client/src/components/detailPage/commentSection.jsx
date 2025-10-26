import { useEffect, useState } from 'react';

import './style.css';
import { getCookie } from 'cookies-next';
import axios from 'axios';
import { useStore } from '../../store/use-hooks';
import CommentItem from './commentItem';
import Wrapper from '../wrapper';
import { useRouter } from 'next/navigation';
const Comments = ({ article }) => {
  const { comments, setComments } = useStore();

  const [desc, setDesc] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const { baseUrl } = useStore();

  const token = getCookie('refreshToken');

  function sendData(e) {
    e.preventDefault();
    const sdata = {
      newsId: article.id,
      description: desc,
      name,
      email,
      subject,
    };

    const data = axios.post(`${baseUrl}/api/comment`, sdata, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    window.location.reload();
  }

  async function getComments(params) {
    const data = await axios.get(`${baseUrl}/api/comment`);

    setComments(data.data);
  }
  useEffect(() => {
    getComments();
  }, []);

  const postComments = comments?.filter(
    (c) => c.newsId == article.id && c.isActive
  );
  return (
    <div className="commentsection">
      <Wrapper text={'نظرات'} />
      <div className="comments mb-[10%]">
        {postComments?.map((c) => (
          <CommentItem comment={c} key={c.id} />
        ))}
      </div>
      <Wrapper text={'نظر شما چیست؟'} />
      <form>
        <div className="field">
          <textarea
            maxLength={300}
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
            name="description"
            className="textarea"
            placeholder="نظر شما"
          ></textarea>
        </div>
        <div className="columns">
          <div className="column">
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              name="name"
              type="text"
              className="input"
              placeholder="نام و نام خانوادگی "
            />
          </div>
          <div className="column">
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              name="email"
              type="email"
              className="input"
              placeholder="ایمیل"
            />
          </div>
        </div>
        <div className="field">
          <input
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
            }}
            name="subject"
            type="text"
            className="input"
            placeholder="موضوع"
          />
        </div>
        <div className="field">
          <button
            type=""
            onClick={sendData}
            className="button  mt-5 text-white bg-red-600 px-8 py-2 cursor-pointer rounded-md"
          >
            ارسال نظر
          </button>
        </div>
      </form>
    </div>
  );
};

export default Comments;
