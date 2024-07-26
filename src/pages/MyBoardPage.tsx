import React, { useState } from 'react';
import Header from '../components/MyWalkingBoard/Header';
import Tab from '../components/MyWalkingBoard/Tab';
import BaseBox from '../styles/common/BaseBox';
import Footer from '../components/common/Footer';
// import useFetch from '../../hooks/useFetch';

function MyBoardPage() {
  const [activeTab, setActiveTab] = useState('산책로');

  // const {
  //   data: myWalkingBoardData,
  //   error,
  //   isLoading,
  // } = useFetch('myData', 'walking-trail', {});

  // console.log(myWalkingBoardData);

  return (
    <BaseBox>
      <Header />
      <Tab activeTab={activeTab} setActiveTab={setActiveTab} />
      <Footer />
    </BaseBox>
  );
}

export default MyBoardPage;
