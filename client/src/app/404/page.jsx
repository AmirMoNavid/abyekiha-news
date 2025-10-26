import Error from '../components/httpError';
const Page404 = () => {
  return <Error errCode={404} errMsg="صفحه مورد نظر یافت نشد." />;
};

export default Page404;
