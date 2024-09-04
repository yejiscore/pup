import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  deleteData,
<<<<<<< HEAD
=======
  newDeleteData,
>>>>>>> feature/develop
  patchData,
  postData,
  putData,
} from '../services/apiService';

<<<<<<< HEAD
type HttpMethod = 'post' | 'put' | 'delete' | 'patch';
=======
type HttpMethod = 'post' | 'put' | 'delete' | 'patch' | 'newdelete';
>>>>>>> feature/develop

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
<<<<<<< HEAD
=======
    if (method === 'newdelete') {
      return newDeleteData(url, data);
    }
>>>>>>> feature/develop
    return Promise.reject(new Error('Invalid HTTP method'));
  };

  return useMutation(mutationFn, {
    onSuccess: (data) => {
      queryClient.invalidateQueries([key]);
    },
<<<<<<< HEAD
    onError: (error, variables, context) => {
    },
    onSettled: (data, error, variables, context) => {
    },
=======
    onError: (error, variables, context) => {},
    onSettled: (data, error, variables, context) => {},
>>>>>>> feature/develop
  });
};

export default useMutate;
