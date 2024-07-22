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
import SearchMap from './pages/searchMap/SearchMap.tsx';
import SearchStartWalking from './pages/searchMap/SearchStartWalking.tsx';

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
        <Route
          path="/search"
          element={
            <BaseLayout>
              <SearchMain />
            </BaseLayout>
          }
        />
        <Route
          path="/search_map"
          element={
            <BaseLayout>
              <SearchMap />
            </BaseLayout>
          }
        />
        <Route
          path="/search_map/start/:id"
          element={
            <BaseLayout>
              <SearchStartWalking />
            </BaseLayout>
          }
        />

        <Route path="/walking" element={<div>산책하기 페이지</div>} />
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

export default App;
// 예지님이 작업 하신 부분
// function App() {
//   return (
//     <AppContainer>
//       <GlobalStyle/>
//       <Container>
//         <Routes>
//           <Route path="/" element={<MyBoardPage />} />
//           <Route path="/walking" element={<div>산책하기 페이지</div>} />
//           <Route path="/search" element={<div>산책로 찾기 페이지</div>} />
//         </Routes>
//         <TabBar/>
//       </Container>
//     </AppContainer>
//   );
// }
