import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetchData } from '../services/apiService';

const useFetch = <T>(
  key: string,
  url: string,
  params?: any,
  enabled = true
): UseQueryResult<T> => {
  return useQuery<T>([key, params], () => fetchData(url, params), {
    staleTime: 5 * 60 * 1000, // 5분 동안은 캐시된 데이터를 사용
    cacheTime: 30 * 60 * 1000, // 30분 동안은 캐시된 데이터를 사용
    retry: 2, // 2번 재시도
    refetchOnWindowFocus: true, // 창이 다시 포커스 될 때마다 다시 요청
    refetchOnReconnect: true, // 인터넷 연결이 다시 연결될 때마다 다시 요청
    refetchOnMount: true, // 컴포넌트가 마운트될 때마다 다시 요청
    refetchInterval: false, // 5 * 60 * 1000, // 5분마다 다시 요청
    enabled, // false로 설정하면 요청을 보내지 않음
  });
};

export default useFetch;

// import { useQuery, UseQueryResult } from '@tanstack/react-query';
// import { fetchData } from '../services/apiService';

// const useFetch = <T>(
//   key: string,
//   url: string,
//   params?: any,
//   enabled = true
// ): UseQueryResult<T> => {
//   return useQuery<T>([key, params], () => fetchData(url, params), {
//     staleTime: 5 * 60 * 1000,
//     cacheTime: 30 * 60 * 1000,
//     retry: 2,
//     refetchOnWindowFocus: true,
//     refetchOnReconnect: true,
//     refetchOnMount: true,
//     refetchInterval: false,
//     enabled,
//   });
// };

// export default useFetch;
