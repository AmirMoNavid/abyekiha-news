import Link from 'next/link';

const Error = ({ errCode, errMsg }) => {
  const errTitle = {
    404: '404 پیدا نشد',
    500: '500 خطای سرور',
  };

  return (
    <div className="f-center flex-col my-[100px]">
      <h1 className="text-6xl">{errCode}</h1>
      <p>
        <span>{errMsg}</span>
        <Link className="mr-[10px]" href="/">
          صفحه اصلی
        </Link>
      </p>
    </div>
  );
};

export default Error;
