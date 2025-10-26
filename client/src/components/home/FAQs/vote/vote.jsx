import VoteButton from './vote.button';
import { axiosInstance } from '../../../../configs/configs';
import { END_POINTS } from '../../../../store/endPoints';

import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { decodeJwt } from '../../../../utils/decodeJwt';
import { useEffect, useState } from 'react';

const Vote = ({ faq }) => {
  const currentFaqId = String(faq?.id);
  const router = useRouter();
  const [vote, setVote] = useState();

  useEffect(() => {
    const votedFaqs = decodeJwt(getCookie('votedFaqs'));
    setVote(votedFaqs ? votedFaqs.votedFaqsId[currentFaqId] : null);
  }, []);

  const sendData = async (isUpVote) => {
    if (vote) return;

    const url = isUpVote
      ? END_POINTS.FAQ_ID_UPVOTE
      : END_POINTS.FAQ_ID_DOWNVOTE;
    const response = await axiosInstance.patch(
      url.replace(':faqId', currentFaqId)
    );
    window.location.reload();
  };

  return (
    <div
      className={`${
        vote && 'opacity-50 [&_button]:cursor-default'
      } f-center-between gap-x-2`}
    >
      <VoteButton key={vote} onClick={sendData} vote={vote} />
    </div>
  );
};

export default Vote;
