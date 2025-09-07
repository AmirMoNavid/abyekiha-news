'use client';
import axios from 'axios';
import { deleteCookie, getCookie } from 'cookies-next';
import decode from 'jsonwebtoken';
import { useRouter } from 'next/navigation';
import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { axiosInstance, toastConfig } from '../configs/configs';
import { useStore } from '../store/use-hooks';

export const AuthContext = createContext(null);

export const AuthContextValues = () => {
  const { baseUrl } = useStore();
  const [confirmModalDisplay, setConfirmModalDisplay] = useState(false);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState('');
  // const [token] = useState(getCookie('refreshToken'));
  const [singlePost] = useState({});
  const [category, setCategory] = useState([]);
  const [registerError, setRegisterError] = useState('');
  const [users, setUsers] = useState([]);
  const [profilePhoto, setProfilePhoto] = useState('');
  const [profileName, setProfileName] = useState('');
  const [comments, setComments] = useState([]);
  const [token, setToken] = useState(getCookie('refreshToken'));
  const [file, setFile] = useState([]);
  const [editorBoxState, setEditorBoxState] = useState({});

  const _push = useRouter().push;
  const push = (url, options) => {
    const delay = options?.delay ?? true;

    setTimeout(
      () => {
        _push(url);
      },
      delay ? 1000 : 0
    );
  };

  // const token = getCookie('refreshToken');

  const router = useRouter();

  useEffect(() => {
    try {
      setUserId(decode(token)?.['userId']);
    } catch (err) {}

    // getAllUsers()
    // getAllComment()
    // profile();
  }, []);

  const axiosJWT = axios.create({
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const register = async (data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([name, val]) => {
      formData.append(name, String(val));
    });

    try {
      const res = await axiosInstance.post(`/api/users/register`, formData);

      if (res.data.error) {
        setRegisterError(res.data.error);
      } else {
        toast.success(res.data.message, toastConfig);
        push('/admin/users');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (inputs) => {
    try {
      const res = await axiosJWT.post(`${baseUrl}/api/users/login`, inputs, {
        withCredentials: true,
      });

      if (res.data.error) {
        setError(res.data.error);
      } else {
        toast.success(res.data.msg, toastConfig);
        location.replace('/admin/dashboard');
      }
      profile();
    } catch (error) {
      console.log(error);
    }
  };

  const getAllUsers = async () => {
    try {
      console.log();
      const res = await axiosJWT.get(`${baseUrl}/api/users`);
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createCategory = async (data) => {
    const formData = new FormData();

    Object.entries(data).forEach((name, val) => {
      formData.append(name, val);
    });

    try {
      const res = await axiosJWT.post(`${baseUrl}/api/category`, formData);
      toast.success(res.data.msg, toastConfig);
      push('/admin/category');
    } catch (error) {
      console.log(error);
    }
  };

  const getCategory = async () => {
    try {
      const res = await axiosJWT.get(`${baseUrl}/api/category`);
      setCategory(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const editCategory = async (data) => {
    const formData = new FormData();

    Object.entries(data).forEach((name, val) => {
      formData.append(name, val);
    });

    try {
      const res = await axiosJWT.put(
        `${baseUrl}/api/category/${data.id}`,
        formData
      );
      toast.success(res.data, toastConfig);
      push('/admin/category');
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      const res = await axiosJWT.delete(`${baseUrl}/api/category/${id}`);
      toast.success(res.data, toastConfig);
      getCategory();
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async (data) => {
    const formData = new FormData();

    Object.entries(data).forEach((name, val) => {
      formData.append(name, val);
    });

    try {
      const res = await axiosJWT.put(
        `${baseUrl}/api/users/${data.id}`,
        formData
      );
      toast.success(res.data.message, toastConfig);
      push('/admin/users');
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const res = await axiosJWT.delete(`${baseUrl}/api/users/${id}`);
      toast.success(res.data.message, toastConfig);
      getAllUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const Logout = async () => {
    deleteCookie('refreshToken');
    toast.success('خروج شما با موفقیت انجام شد', toastConfig);
    push('/');
  };

  const updateProfile = async (data) => {
    try {
      const formData = new FormData();

      Object.entries(data).forEach((name, val) => {
        formData.append(name, val);
      });
      formData.append('userId', userId);

      const res = await axiosJWT.put(
        `${baseUrl}/api/users/profile/${data.id}`,
        formData
      );
      console.log(res);
      toast.success(res.data, toastConfig);
    } catch (error) {
      console.log(error);
    }
  };

  const profile = async () => {
    try {
      const res = await axiosJWT.get(`${baseUrl}/api/users/profile`);
      setProfilePhoto(res.data.url);
      setProfileName(res.data.name);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllComment = async () => {
    try {
      const res = await axiosJWT.get(`${baseUrl}/api/comment`);
      setComments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteComment = async (id) => {
    try {
      const res = await axiosJWT.delete(`${baseUrl}/api/comment/${id}`);
      toast.success(res.data, toastConfig);
      getAllComment();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = async (endpoint, id) => {
    try {
      const res = await axiosJWT.delete(`${String(endpoint)}/${id}`);
      toast.success(res.data?.title ?? 'عملیات موفقیت آمیز بود.', toastConfig);
      window.location.reload();
    } catch (error) {
      const errMsg =
        error.response?.data?.title ??
        error.message ??
        'عملیات با خطا مواجه شد';
      console.log(error);
      toast.error(errMsg, toastConfig);
    }
  };

  const activeComment = async (id) => {
    const data = {
      isActive: true,
    };
    try {
      const res = await axiosJWT.put(
        `${baseUrl}/api/comment/active/${id}`,
        data
      );
      getAllComment();
      toast.success(res.data, toastConfig);
    } catch (error) {
      console.log(error);
    }
  };

  const unActiveComment = async (id) => {
    const data = {
      isActive: false,
    };
    try {
      const res = await axiosJWT.put(
        `${baseUrl}/api/comment/unactive/${id}`,
        data
      );
      toast.success(res.data, toastConfig);
      getAllComment();
    } catch (error) {
      console.log(error);
    }
  };

  return {
    login,
    error,
    getAllUsers,
    axiosJWT,
    token,
    singlePost,
    createCategory,
    getCategory,
    category,
    editCategory,
    deleteCategory,
    register,
    registerError,
    users,
    updateUser,
    deleteUser,
    Logout,
    userId,
    updateProfile,
    profile,
    profilePhoto,
    profileName,
    getAllComment,
    comments,
    deleteComment,
    activeComment,
    unActiveComment,
    confirmModalDisplay,
    setConfirmModalDisplay,
    file,
    setFile,
    editorBoxState,
    setEditorBoxState,
    deleteItem,
  };
};

export const AuthContextProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={AuthContextValues()}>
      {children}
    </AuthContext.Provider>
  );
};
