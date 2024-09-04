import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import WalkingMain from './pages/walkingMain/WalkingMain';
import BaseLayout from './layouts/Layout';
import WalkingReport from './pages/walkingReport/WalkingReport';
import SearchMain from './pages/searchMain/SearchMain';
import SearchMap from './pages/searchMain/SearchMap';
import SearchStartWalking from './pages/searchMap/SearchStartWalking';
import SelectTrail from './pages/detail/SelectTrail';
import TrailStart from './pages/trailStart/TrailStart';
import FinishTrail from './pages/trailStart/FinishTrail';
import DetailPage from './components/Detail/Detail';
import { AppProvider } from './context/AppContext';
import GlobalStyle from './styles/GlobalStyle';

import LoginForm from './components/Login/LoginForm';
import SignupPage from './pages/SignUpPage';
import SignupMember from './pages/SignUpMember';
import SignUpFinal from './components/SignUp/common/SignUpFinal';
import SignupSocial from './pages/SignUpSocial';

import EditUser from './pages/EditUser';
import EditPet from './pages/EditPet';
import MyBoardPage from './pages/MyBoardPage/MyBoardPage';
import ProfileEditPage from './pages/MyBoardPage/ProfileEditPage';
import ProfileDogEditPage from './pages/MyBoardPage/ProfileDogEditPage';
import ProtectedRoute from './layouts/ProtectedRoute';

function App() {
  return (
    <AppProvider>
      <GlobalStyle />

      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <BaseLayout>
                  <MyBoardPage />
                </BaseLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile/user/edit"
            element={
              <ProtectedRoute>
                <BaseLayout>
                  <ProfileEditPage />
                </BaseLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile/dog/edit"
            element={
              <ProtectedRoute>
                <BaseLayout>
                  <ProfileDogEditPage />
                </BaseLayout>
              </ProtectedRoute>
            }
          />

          {/* 산책로 생성 */}
          <Route
            path="/walking_main"
            element={
              <ProtectedRoute>
                <BaseLayout>
                  <WalkingMain />
                </BaseLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/walking_main/report"
            element={
              <ProtectedRoute>
                <BaseLayout>
                  <WalkingReport />
                </BaseLayout>
              </ProtectedRoute>
            }
          />

          {/* 검색 */}
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <BaseLayout>
                  <SearchMain />
                </BaseLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/search/map"
            element={
              <ProtectedRoute>
                <BaseLayout>
                  <SearchMap />
                </BaseLayout>
              </ProtectedRoute>
            }
          />

          {/* 산책로 위치로 이동 */}
          <Route
            path="/trail/start/:id"
            element={
              <ProtectedRoute>
                <BaseLayout>
                  <SearchStartWalking />
                </BaseLayout>
              </ProtectedRoute>
            }
          />

          {/* 등산로 정보 확인 */}
          <Route
            path="/trail/select/:id"
            element={
              <ProtectedRoute>
                <BaseLayout>
                  <SelectTrail />
                </BaseLayout>
              </ProtectedRoute>
            }
          />

          {/* 유저가 만든 산책로 시작 */}
          <Route
            path="/trail/startTrail/:id"
            element={
              <ProtectedRoute>
                <BaseLayout>
                  <TrailStart />
                </BaseLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/trail/finish/:id"
            element={
              <ProtectedRoute>
                <BaseLayout>
                  <FinishTrail />
                </BaseLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <BaseLayout>
                <LoginForm />
              </BaseLayout>
            }
          />
          <Route
            path="/signup"
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
          <Route
            path="/edit_user"
            element={
              <BaseLayout>
                <EditUser />
              </BaseLayout>
            }
          />
          <Route
            path="/edit_pet"
            element={
              <BaseLayout>
                <EditPet />
              </BaseLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
