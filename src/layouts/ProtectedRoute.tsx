import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }: any) => {
  const pupAccessToken = Cookies.get('pup_access');
  const isAuthenticated = !!pupAccessToken; // 쿠키에 accessToken이 있는지 확인

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
