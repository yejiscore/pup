import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MyBoardPage from './components/MyWalkingBoard/MyBoardPage';
import BaseLayout from './layouts/Layout';
import { AppProvider } from './context/AppContext';
import GlobalStyle from './styles/GlobalStyle';
import DetailPage from './components/Detail/Detail';

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
            </Routes>
        </AppProvider>
    );
}

export default App;
