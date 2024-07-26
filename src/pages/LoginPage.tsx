import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginForm from '../components/Login/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
    </Routes>
  );
};

export default LoginPage;
