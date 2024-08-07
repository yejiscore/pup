import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  deleteData,
  newDeleteData,
  patchData,
  postData,
  putData,
} from '../services/apiService';

type HttpMethod = 'post' | 'put' | 'delete' | 'patch' | 'newdelete';

const useMutate = (key: string, url: string, method: HttpMethod) => {
  const queryClient = useQueryClient();

  const mutationFn = (data: any): Promise<any> => {
    if (method === 'post') {
      return postData(url, data);
    }
    if (method === 'put') {
      return putData(url, data);
    }
    if (method === 'delete') {
      return deleteData(url, data);
    }
    if (method === 'patch') {
      return patchData(url, data);
    }
    if (method === 'newdelete') {
      return newDeleteData(url, data);
    }
    return Promise.reject(new Error('Invalid HTTP method'));
  };

  return useMutation(mutationFn, {
    onSuccess: (data) => {
      queryClient.invalidateQueries([key]);
    },
    onError: (error, variables, context) => {},
    onSettled: (data, error, variables, context) => {},
  });
};

export default useMutate;
