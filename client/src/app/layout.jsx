import { Geist, Geist_Mono } from 'next/font/google';
import FotterLink from './components/footer/Footer';
import './globals.css';
import Header from './components/home/header/header';
import { AuthContextProvider } from './contexts/authContext';
import path from 'path';

export const metadata = {
  title: 'شهرداری قشلاق',
  description: 'خبرگذاری شهرداری قشلاق',
  lang: 'fa',
};

export default function RootLayout({ children }) {
  return (
    <AuthContextProvider>
      <html lang="fa" dir="rtl">
        <head>
          <link
            href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css"
            rel="stylesheet"
            type="text/css"
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
        </head>

        <body>
          <Header />

          {children}
          <FotterLink />
        </body>
      </html>
    </AuthContextProvider>
  );
}
