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

export const patchData = async (url: string, data?: any) => {
  const response = await APIInstance.patch(url, data);
  return response.data;
};

export const newDeleteData = async (url: string, params?: any) => {
  let queryParams = '';

  if (params && Array.isArray(params.walkingTrailIdList)) {
    queryParams = params.walkingTrailIdList
      .map((id: number) => `walkingTrailIdList=${id}`)
      .join('&');
  } else if (params && typeof params === 'object') {
    queryParams = `?${Object.entries(params)
      .map(([key, value]) => `${key}=${value}`)
      .join('&')}`;
  }

  const response = await APIInstance.delete(`${url}?${queryParams}`);
  return response.data;
};
