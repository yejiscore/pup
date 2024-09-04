/* eslint-disable import/no-extraneous-dependencies */
// import { Cookies } from 'react-cookie';

// const cookies = new Cookies();

// export const setCookie = (name: string, value: string, options?: any) => {
//   return cookies.set(name, value, { ...options });
// };

// export const getCookie = (name: string) => {
//   return cookies.get(name);
// };

import Cookies from 'js-cookie';

export const getCookie = (name: string): string | undefined => {
  return Cookies.get(name);
};

export const setCookie = (
  name: string,
  value: string,
  options?: Cookies.CookieAttributes
): void => {
  Cookies.set(name, value, options);
};

export const removeCookie = (name: string): void => {
  Cookies.remove(name);
};
