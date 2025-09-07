import styles from './faqs.module.css';

import FAQItem from './FAQItem';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { useEffect, useRef, useState } from 'react';
import { FaAngleRight } from 'react-icons/fa';
import axios from 'axios';
import { useStore } from '../../../store/use-hooks';
import '@splidejs/react-splide/css';
const FAQs = () => {
  const splideRef = useRef(null);
  const { baseUrl } = useStore();
  const [faqs, setFaqs] = useState([]);
  const [splideOptions, setSplideOptions] = useState({
    type: 'loop',
    padding: 40,
    perPage: 2,
    gap: 15,
    perMove: 1,
    autoplay: true,
    interval: 5000,
    speed: 1000,
    pauseOnHover: true,
    resetProgress: false,
    direction: 'rtl',
  });

  async function getFaqs() {
    const data = await axios.get(`${baseUrl}/api/faqs`);

    const filteredFaqs = data.data.filter((f) => f.isActive);
    console.log(filteredFaqs);
    setFaqs(filteredFaqs);
  }

  useEffect(() => {
    if (window.screen.width <= 640) {
      Object.assign(splideOptions, {
        padding: 20,
        perPage: 1,
        gap: 10,
      });
      setSplideOptions({ ...splideOptions });
    }

    getFaqs();

    splideRef.current.splide.Components.Autoplay.play();
  }, []);

  const filteredFaqs = faqs.filter((f) => f.isActivce);

  return (
    <div className={styles.container} id="faqs">
      <h3>آیا سوالی برایتان پیش آمده؟</h3>
      <Splide ref={splideRef} options={splideOptions} hasTrack={false}>
        <SplideTrack>
          {faqs ? (
            faqs?.map((faq, index) => (
              <SplideSlide key={index}>
                <FAQItem faq={faq} />
              </SplideSlide>
            ))
          ) : (
            <p>در حال حاضر هیچ سوالی وجود ندارد.</p>
          )}
        </SplideTrack>

        <div className="splide__arrows">
          <button className="splide__arrow splide__arrow--prev">
            <FaAngleRight />
          </button>
          <button className="splide__arrow splide__arrow--next">
            <FaAngleRight />
          </button>
        </div>
      </Splide>
    </div>
  );
};

export default FAQs;
