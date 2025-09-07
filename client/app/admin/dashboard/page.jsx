'use client';
import { useContext, useEffect } from 'react';
import Dashboard from '../../components/admin/Dashboard';
import { AuthContext } from '../../contexts/authContext';
import './dashboard.css';
import { getCookie } from 'cookies-next';
import Page404 from '../../404/page';
import { useRouter } from 'next/navigation';
const Main = () => {
  const { profileName } = useContext(AuthContext);
  const token = getCookie('refreshToken');
  const router = useRouter();

  useEffect(() => {
    if (!token) return window.location.replace(`/admin/auth`);
  }, []);

  return (
    <Dashboard title={'داشبورد'}>
      <h1>سلام {profileName} , به پنل مدیریت خوش اومدی</h1>
      <h3>امیدوارم خبرای خوبی داشته باشی.</h3>
    </Dashboard>
  );
};

export default Main;
