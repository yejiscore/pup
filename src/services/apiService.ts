import APIInstance from './axiosInstance';

export const fetchData = async (url: string, params?: any) => {
  const response = await APIInstance.get(url, { params });
  return response.data;
};

export const postData = async (url: string, data: any) => {
  const response = await APIInstance.post(url, data);
  return response.data;
};

export const putData = async (url: string, data: any) => {
  const response = await APIInstance.put(url, data);
  return response.data;
};

export const deleteData = async (url: string, data?: any) => {
  const response = await APIInstance.delete(url, { data });
  return response.data;
};
