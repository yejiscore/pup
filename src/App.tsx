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

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Container = styled.div`
  width: 376px;
  height: 812px;
  position: relative;
  margin: 0 auto;
  overflow: hidden;
  background-color: #edf9f6;
`;

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
        <Route path="/walking" element={<div>산책하기 페이지</div>} />
        <Route path="/search" element={<div>산책로 찾기 페이지</div>} />
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
