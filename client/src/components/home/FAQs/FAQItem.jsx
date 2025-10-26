import Link from 'next/link';
import styles from './faqs.module.css';
import { FaArrowLeft } from 'react-icons/fa';

const FAQItem = ({ faq }) => {
  return (
    <Link className={styles.question} href={`/faqs/${faq.id}`}>
      <h1 style={{ maxWidth: '88%', wordBreak: 'break-word', lineHeight: 1.7 }}>
        {faq.question}
      </h1>
      <FaArrowLeft />
    </Link>
  );
};

export default FAQItem;
