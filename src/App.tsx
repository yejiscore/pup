import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import React from 'react';
import WalkingMain from './pages/walkingMain/WalkingMain';
import BaseLayout from './layouts/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route
          path="/walking_main"
          element={
            <BaseLayout>
              <WalkingMain />
            </BaseLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
