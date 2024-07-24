import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import WalkingMain from './pages/walkingMain/WalkingMain';
import BaseLayout from './layouts/Layout';
import LoginMain from './pages/login/LoginMain.tsx';
import Footer from './components/common/Footer.tsx';
import WalkingReport from './pages/walkingReport/WalkingReport.tsx';
import SearchMain from './pages/searchMain/SearchMain.tsx';
import SearchMap from './pages/searchMain/SearchMap.tsx';
import SearchStartWalking from './pages/searchMap/SearchStartWalking.tsx';
import SelectTrail from './pages/detail/SelectTrail.tsx';
import TrailStart from './pages/trailStart/TrailStart.tsx';
import FinishTrail from './pages/trailStart/FinishTrail.tsx';
import DetailPage from './components/Detail/Detail.tsx';
import MyBoardPage from './components/MyWalkingBoard/MyBoardPage.tsx';

function App() {
  return (
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
      </Routes>
    </BrowserRouter>
  );
}
