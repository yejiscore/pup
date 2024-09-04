import { useQuery } from '@tanstack/react-query';
import { fetchData } from '../services/apiService';

const useNoCache = (key: string, url: string, params?: any, enabled = true) => {
  return useQuery([key, params], () => fetchData(url, params), {
    staleTime: 0,
    cacheTime: 0,
    retry: 2,
    enabled,
  });
};

export default useNoCache;
