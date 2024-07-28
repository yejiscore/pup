import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import WalkingMain from './pages/walkingMain/WalkingMain';
import BaseLayout from './layouts/Layout';
import LoginMain from './pages/login/LoginMain';
import Footer from './components/common/Footer';
import WalkingReport from './pages/walkingReport/WalkingReport';
import SearchMain from './pages/searchMain/SearchMain';
import SearchMap from './pages/searchMain/SearchMap';
import SearchStartWalking from './pages/searchMap/SearchStartWalking';
import SelectTrail from './pages/detail/SelectTrail';
import TrailStart from './pages/trailStart/TrailStart';
import FinishTrail from './pages/trailStart/FinishTrail';
// import MyBoardPage from './components/MyWalkingBoard/MyBoardPage';
import DetailPage from './components/Detail/Detail';
import { AppProvider } from './context/AppContext';
import GlobalStyle from './styles/GlobalStyle';
import MyBoardPage from './pages/MyBoardPage';

function App() {
  return (
    <AppProvider>
      <GlobalStyle />

      <BrowserRouter>
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

          {/* 산책로 생성 */}
          <Route
            path="/walking_main"
            element={
              <BaseLayout>
                <WalkingMain />
              </BaseLayout>
            }
          />
          <Route
            path="/walking_main/report"
            element={
              <BaseLayout>
                <WalkingReport />
              </BaseLayout>
            }
          />

          {/* 검색 */}
          <Route
            path="/search"
            element={
              <BaseLayout>
                <SearchMain />
              </BaseLayout>
            }
          />
          <Route
            path="/search/map"
            element={
              <BaseLayout>
                <SearchMap />
              </BaseLayout>
            }
          />

          {/* 산책로 위치로 이동 */}
          <Route
            path="/trail/start/:id"
            element={
              <BaseLayout>
                <SearchStartWalking />
              </BaseLayout>
            }
          />

          {/* 등산로 정보 확인 */}
          <Route
            path="/trail/select/:id"
            element={
              <BaseLayout>
                <SelectTrail />
              </BaseLayout>
            }
          />

          {/* 유저가 만든 산책로 시작 */}
          <Route
            path="/trail/startTrail/:id"
            element={
              <BaseLayout>
                <TrailStart />
              </BaseLayout>
            }
          />
          <Route
            path="/trail/finish/:id"
            element={
              <BaseLayout>
                <FinishTrail />
              </BaseLayout>
            }
          />

          <Route
            path="/login"
            element={
              <BaseLayout>
                <LoginMain />
                <Footer />
              </BaseLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
