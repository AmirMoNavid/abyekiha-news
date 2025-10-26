'use client';
import React from 'react';
import Link from 'next/link';
import { socialLinks } from '../../data/socialLinks';
import dynamic from 'next/dynamic';
import './footer.css';
import { usePathname } from 'next/navigation';
const FooterLink = ({ href, title }) => (
  <li className="">
    <a className="social-link transition font-bold text-[#f5f5f5]" href={href}>
      {title}
    </a>
  </li>
);

const SocialLink = ({ href, img, title }) => (
  <li>
    <Link href={href} className="majazi-footer">
      <img width={30} src={img} alt={title} />
      <div className="majazi-footer-title pr-2">{title}</div>
    </Link>
  </li>
);

const Footer = () => {
  const DynamicMap = dynamic(() => import('./map'), { ssr: false });

  const path = usePathname();

  const isAdminPage = path.startsWith('/admin');

  const links = [
    {
      href: 'https://abyek.ostan-qz.ir',
      title: 'فرمانداری شهرستان آبیک',
    },
    {
      href: 'https://abyek.ir',
      title: 'شهرداری و شورای اسلامی شهر آبیک',
    },
    {
      href: 'https://shohadahospital.qums.ac.ir',
      title: 'بیمارستان دولتی شهداء شهر آبیک',
    },
    { href: 'https://dadgostari-qz.eadl.ir', title: 'دادگستری کل استان قزوین' },
    { href: 'https://www.intamedia.ir/', title: 'سازمان امور مالیاتی کشور' },
  ];

  if (isAdminPage) return;

  return (
    <footer className="footer text-sm text-center md:text-start">
      <div className="container-footer">
        <div className="columns flex-col md:flex-row flex ">
          <div className="column is-one-third p-[0.75rem]">
            <div className="logo-footer pb-[50px]">
              <Link href="/">
                <img src={'/logo.png'} alt="Logo" />
              </Link>
              <div className="titr-logo-footer">
                <h1>پایگاه جامع رسانه ای شهرستان آبیک</h1>
                <h2>Comprehensive media base of Abyek city</h2>
              </div>
            </div>

            <h1 className="footer-titr-desc">درباره ما:</h1>
            <div className="footer-desc">
              <p>
                مجموعه بزرگ آبیکی ها از سال هزار و سیصد و نود مطالبه گری را آغاز
                کرد و با همراهی شهروندان همیشه همراه تبدیل به صدای مردمی شد
                <br></br>
                <br></br>
                آدرس: قزوین - آبیک - بلوار آیت اله طالقانی - خیابان بهشتی
                <br></br>
                <br></br>
                تلفن : 09128815208 - 02832893480
                <br></br>
              </p>
            </div>
          </div>

          <div className="column is-one-third p-[0.75rem]">
            <div className="peivandha">
              <h1 className="footer-titr-desc mb-3">پیوندها:</h1>
              <ul className="text-[16px] p-1">
                {links.map((link, index) => (
                  <FooterLink key={index} {...link} />
                ))}
              </ul>
            </div>
          </div>

          <div className="column is-one-third p-[0.75rem]">
            <h1 className="footer-titr-desc">شبکه های اجتماعی:</h1>
            <ul className="mb-3">
              {socialLinks.map((link, index) => (
                <SocialLink key={index} {...link} />
              ))}
            </ul>
            <DynamicMap />
          </div>
        </div>
        <div className="columns bottom-header mt-6 text-center is-flex is-justify-content-center">
          <h1>
            تمام حقوق مادی و معنوی سایت متعلق به
            <Link
              href="/"
              className="bottom-header-link"
              style={{ color: 'rgb(24, 129, 24)' }}
            >
              خبرگذاری آبیکی ها
            </Link>
            میباشد.
          </h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
