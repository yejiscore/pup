/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/no-extraneous-dependencies */
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import MyBoardPage from './components/MyBoardPage.tsx';
import TabBar from './components/BottomTab.tsx';
import GlobalStyle from './styles/GlobalStyle.ts';

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
  background-color: #EDF9F6;
`;

function App() {
  return (
    <AppContainer>
      <GlobalStyle/>
      <Container>
        <Routes>
          <Route path="/" element={<MyBoardPage />} />
          <Route path="/walking" element={<div>산책하기 페이지</div>} />
          <Route path="/search" element={<div>산책로 찾기 페이지</div>} />
        </Routes>
        <TabBar/>
      </Container>
    </AppContainer>
  );
}

export default App;
