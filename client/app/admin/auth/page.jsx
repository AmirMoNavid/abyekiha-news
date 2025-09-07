'use client';
import Dashboard from '../../components/admin/Dashboard';
import { useFormHandler } from '@erfanigh/use-form-handler';
import { userFormSchema } from '../../assets/formSchema/userFormSchema';
import { toastConfig } from '../../configs/configs';
import { toast } from 'react-toastify';
import './auth.css';
import { useStore } from '../../store/use-hooks';
import { getCookie } from 'cookies-next';

const Login = () => {
  // const test = getCookie('refreshToken');
  const { baseUrl } = useStore();
  const { send } = useFormHandler({
    endPoint: `${baseUrl}/api/users/login`,
    validationSchema: userFormSchema,
    axiosConfigs: {
      withCredentials: true,
    },
    onSuccess({ data }) {
      console.log(data.accessToken);
      toast.success('عملیات موفقیت آمیز بود.', toastConfig);
      setTimeout(() => {
        location.replace('/admin/dashboard');
      }, 1000);
    },
  });

  return (
    <Dashboard title={'ورود'} isAuthPage={true}>
      <section className="hero has-background-grey-light is-fullheight is-fullwidth">
        <div className="background-overlay"></div>
        <div className="hero-body" style={{ justifyContent: 'center' }}>
          <div className="container columns is-centered">
            <div className="column is-4">
              <h1 className="title has-text-centered mb-5">
                ورود به پنل مدیریت
              </h1>
              <form className="box" style={{ padding: '40px' }} onSubmit={send}>
                <div className="field">
                  <label className="label">ایمیل</label>
                  <div className="control">
                    <input
                      style={{ borderColor: '#58a5a7', outline: 'none' }}
                      name="email"
                      type="email"
                      className="input"
                      placeholder="مثال * Example@gmail.com"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">پسوورد</label>
                  <div className="control">
                    <input
                      style={{ borderColor: '#58a5a7', outline: 'none' }}
                      name="password"
                      type="password"
                      className="input"
                      placeholder="رمز عبور"
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <button
                    type="submit"
                    style={{
                      color: '#fff !important',
                      padding: '10px !important',
                    }}
                    className=" w-full rounded-md py-4 text-center  bg-[#48c78e] text-white"
                  >
                    ورود
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Dashboard>
  );
};

export default Login;
