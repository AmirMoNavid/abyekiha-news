import { ToastContainer } from 'react-toastify';
import MainHead from '../../components/mainHead';
import Sidebar from './sidebar/Sidebar';
import Information from './information/Information';

const Dashboard = ({ children, title, isAuthPage = false, button }) => {
  const head = <MainHead title={title} robots={'nofollow, noindex'} />;

  if (isAuthPage)
    return (
      <>
        {head}
        {children}
      </>
    );
  else if (!isAuthPage) {
    return (
      <>
        {head}
        <div className="dashboard-wrapper">
          <Sidebar />
          <div className="main-info">
            <Information />
            <div className="main">
              <div
                className="is-flex mb-5"
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>
                  {title}
                </h2>
                {button}
              </div>
              {children}
            </div>
          </div>
        </div>
        <ToastContainer />
      </>
    );
  }
};

export default Dashboard;
