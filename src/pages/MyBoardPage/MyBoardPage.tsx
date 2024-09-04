import React, { useEffect, useState } from 'react';
import Header from '../../components/MyWalkingBoard/Header';
import Tab from '../../components/MyWalkingBoard/Tab';
import BaseBox from '../../styles/common/BaseBox';
import Footer from '../../components/common/Footer';

function MyBoardPage() {
  return (
    <BaseBox>
      <Header />
      <Tab />
      <Footer />
    </BaseBox>
  );
}

export default MyBoardPage;
