import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchData } from '../services/apiService';

const useInfiniteFetch = (
  key: string,
  url: string,
  params?: any,
  enabled = true
) => {
  return useInfiniteQuery(
    [key, params],
    ({ pageParam = 1 }) => fetchData(url, { ...params, page: pageParam }),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.data.length === params?.limit) {
          return allPages.length + 1;
        }
        return null;
      },
      staleTime: 5 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
      retry: 2,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchOnMount: true,
      refetchInterval: false,
      enabled,
    }
  );
};
export default useInfiniteFetch;
