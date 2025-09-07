import React, { useState } from 'react';
import {
  BsFillCapslockFill,
  BsFillPersonPlusFill,
  BsChatDots,
} from 'react-icons/bs';
import { useAsyncEffect } from '../../../utils/useAsyncEffect';
import getServerData from '../../../utils/getServerData';
import { END_POINTS } from '../../../store/endPoints';
import './information.css';
const Information = () => {
  const [infos, setInfos] = useState({
    comments: null,
    article: null,
    users: null,
  });

  useAsyncEffect(async () => {
    if (Object.values(infos).includes(null)) {
      const data = {
        comments: await getServerData(END_POINTS.COMMENTS_COUNT),
        article: await getServerData(END_POINTS.ARTICLES_COUNT),
        users: await getServerData(END_POINTS.USERS_COUNT),
      };
      setInfos(data);
    }
  }, []);

  return (
    <div className="information">
      <div className="view-web is-flex is-align-items-center is-justify-content-space-between mb-5">
        <div className="view-webpage">
          <a href="/" className="button has-background-success has-text-white">
            مشاهده وب سایت
          </a>
        </div>
        {/* <div className="view-profile">
          <span>
            <Link href={`/update-profile/${userId}`}>
              <img src={profilePhoto ? profilePhoto : profileImg} alt="" className='image profile-photo' />
            </Link>
          </span>
        </div> */}
      </div>
      <div className="info text-nowrap ">
        <div className="info-item ">
          <h4>نوشته ها</h4>
          <span>{infos.article ?? 0}</span>
          <BsFillCapslockFill />
        </div>
        <div className="info-item">
          <h4>کاربران</h4>
          <span>{infos.users ?? 0}</span>
          <BsFillPersonPlusFill />
        </div>
        <div className="info-item">
          <h4>نظرات</h4>
          <span>{infos.comments ?? 0}</span>
          <BsChatDots />
        </div>
      </div>
    </div>
  );
};

export default Information;
