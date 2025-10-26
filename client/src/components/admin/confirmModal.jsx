import { useContext } from 'react';
import { AuthContext } from '../../contexts/authContext';

const ConfirmModal = ({ onSuccessCallback = () => {} }) => {
  const { confirmModalDisplay, setConfirmModalDisplay } =
    useContext(AuthContext);

  return (
    confirmModalDisplay && (
      <div className="modal-overlay" style={{ position: 'fixed' }}>
        <div className="modal-news has-text-centered">
          <h1 className="has-text-centered">آیا از حذف این آیتم مطمئنید؟</h1>
          <button
            className="button is-danger  rounded-md p-1 px-4  ml-3"
            onClick={() => {
              onSuccessCallback();
              setConfirmModalDisplay(false);
            }}
          >
            بله مطمئنم
          </button>
          <button
            className="button is-success  rounded-md p-1 px-4  ml-3"
            onClick={() => setConfirmModalDisplay(false)}
          >
            خیر
          </button>
        </div>
      </div>
    )
  );
};

export default ConfirmModal;
