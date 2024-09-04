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
<<<<<<< HEAD
import MyBoardPage from './pages/MyBoardPage';
=======
import MyBoardPage from './pages/MyBoardPage/MyBoardPage';
import ProfileEditPage from './pages/MyBoardPage/ProfileEditPage';
import ProfileDogEditPage from './pages/MyBoardPage/ProfileDogEditPage';
import ProtectedRoute from './layouts/ProtectedRoute';
>>>>>>> feature/develop

function App() {
  return (
    <AppProvider>
      <GlobalStyle />

      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
<<<<<<< HEAD
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
=======
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
>>>>>>> feature/develop
            }
          />

          {/* 산책로 생성 */}
          <Route
            path="/walking_main"
            element={
<<<<<<< HEAD
              <BaseLayout>
                <WalkingMain />
              </BaseLayout>
=======
              <ProtectedRoute>
                <BaseLayout>
                  <WalkingMain />
                </BaseLayout>
              </ProtectedRoute>
>>>>>>> feature/develop
            }
          />
          <Route
            path="/walking_main/report"
            element={
<<<<<<< HEAD
              <BaseLayout>
                <WalkingReport />
              </BaseLayout>
=======
              <ProtectedRoute>
                <BaseLayout>
                  <WalkingReport />
                </BaseLayout>
              </ProtectedRoute>
>>>>>>> feature/develop
            }
          />

          {/* 검색 */}
          <Route
            path="/search"
            element={
<<<<<<< HEAD
              <BaseLayout>
                <SearchMain />
              </BaseLayout>
=======
              <ProtectedRoute>
                <BaseLayout>
                  <SearchMain />
                </BaseLayout>
              </ProtectedRoute>
>>>>>>> feature/develop
            }
          />
          <Route
            path="/search/map"
            element={
<<<<<<< HEAD
              <BaseLayout>
                <SearchMap />
              </BaseLayout>
=======
              <ProtectedRoute>
                <BaseLayout>
                  <SearchMap />
                </BaseLayout>
              </ProtectedRoute>
>>>>>>> feature/develop
            }
          />

          {/* 산책로 위치로 이동 */}
          <Route
            path="/trail/start/:id"
            element={
<<<<<<< HEAD
              <BaseLayout>
                <SearchStartWalking />
              </BaseLayout>
=======
              <ProtectedRoute>
                <BaseLayout>
                  <SearchStartWalking />
                </BaseLayout>
              </ProtectedRoute>
>>>>>>> feature/develop
            }
          />

          {/* 등산로 정보 확인 */}
          <Route
            path="/trail/select/:id"
            element={
<<<<<<< HEAD
              <BaseLayout>
                <SelectTrail />
              </BaseLayout>
=======
              <ProtectedRoute>
                <BaseLayout>
                  <SelectTrail />
                </BaseLayout>
              </ProtectedRoute>
>>>>>>> feature/develop
            }
          />

          {/* 유저가 만든 산책로 시작 */}
          <Route
            path="/trail/startTrail/:id"
            element={
<<<<<<< HEAD
              <BaseLayout>
                <TrailStart />
              </BaseLayout>
=======
              <ProtectedRoute>
                <BaseLayout>
                  <TrailStart />
                </BaseLayout>
              </ProtectedRoute>
>>>>>>> feature/develop
            }
          />
          <Route
            path="/trail/finish/:id"
            element={
<<<<<<< HEAD
              <BaseLayout>
                <FinishTrail />
              </BaseLayout>
=======
              <ProtectedRoute>
                <BaseLayout>
                  <FinishTrail />
                </BaseLayout>
              </ProtectedRoute>
>>>>>>> feature/develop
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
