import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import WalkingMain from './pages/walkingMain/WalkingMain';

import LoginMain from './pages/login/LoginMain';
import Footer from './components/common/Footer';
import WalkingReport from './pages/walkingReport/WalkingReport';
import SearchMain from './pages/searchMain/SearchMain';
import SearchMap from './pages/searchMain/SearchMap';
import SearchStartWalking from './pages/searchMap/SearchStartWalking';
import SelectTrail from './pages/detail/SelectTrail';
import TrailStart from './pages/trailStart/TrailStart';
import FinishTrail from './pages/trailStart/FinishTrail';
import MyBoardPage from './components/MyWalkingBoard/MyBoardPage';
import BaseLayout from './layouts/Layout';
import { AppProvider } from './context/AppContext';
import GlobalStyle from './styles/GlobalStyle';
import DetailPage from './components/Detail/Detail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <BaseLayout>
              Home <Footer />
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
        <Route
          path="/trail/select/:id"
          element={
            <BaseLayout>
              <SelectTrail />
            </BaseLayout>
          }
        />
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

        <Route
          path="/"
          element={
            <BaseLayout>
              <MyBoardPage />
            </BaseLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
