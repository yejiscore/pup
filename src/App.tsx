import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MyBoardPage from './pages/MyBoardPage';
import BaseLayout from './layouts/Layout';
import { AppProvider } from './context/AppContext';
import GlobalStyle from './styles/GlobalStyle';
import DetailPage from './components/Detail/Detail';
import LoginPage from './pages/LoginPage';
import SignupSocial from './pages/SignUpSocial';
import SignUpFinal from './components/SignUp/common/SignUpFinal';
import SignupMember from './pages/SignUpMember';
import SignupPage from './pages/SignUpPage';

function App() {
  return (
    <AppProvider>
      <GlobalStyle />
      <Routes>
        <Route
          path="/"
          element={
            <BaseLayout>
              <MyBoardPage />
            </BaseLayout>
          }
        />
        <Route
          path="/detail/:id"
          element={
            <BaseLayout>
              <DetailPage />
            </BaseLayout>
          }
        />
        <Route
          path="/walking_main"
          element={
            <BaseLayout>
              <div>산책하기 페이지</div>
            </BaseLayout>
          }
        />
        <Route
          path="/search"
          element={
            <BaseLayout>
              <div>산책로 찾기 페이지</div>
            </BaseLayout>
          }
        />
        <Route
          path="/login"
          element={
            <BaseLayout>
              <LoginPage />
            </BaseLayout>
          }
        />
        <Route
          path="/login/signup"
          element={
            <BaseLayout>
              <SignupPage />
            </BaseLayout>
          }
        />
        <Route
          path="/signup_member"
          element={
            <BaseLayout>
              <SignupMember />
            </BaseLayout>
          }
        />
        <Route
          path="/signup_social"
          element={
            <BaseLayout>
              <SignupSocial />
            </BaseLayout>
          }
        />
        <Route
          path="/signupfinal"
          element={
            <BaseLayout>
              <SignUpFinal />
            </BaseLayout>
          }
        />
      </Routes>
    </AppProvider>
  );
}

export default App;
