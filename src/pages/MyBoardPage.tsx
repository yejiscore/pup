// src/pages/MyBoardPage.tsx
import React, { useEffect, useState } from 'react';
import Header from '../components/MyWalkingBoard/Header';
import Tab from '../components/MyWalkingBoard/Tab';
import BaseBox from '../styles/common/BaseBox';
import Footer from '../components/common/Footer';
import { useAppContext } from '../context/AppContext';

function MyBoardPage() {
  const [activeTab, setActiveTab] = useState('산책로');
  const { isAuthenticated, isLoading } = useAppContext();

  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = '/login';
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>Error: Not authenticated</div>;
  }

  return (
    <BaseBox>
      <Header />
      <Tab activeTab={activeTab} setActiveTab={setActiveTab} />
      <Footer />
    </BaseBox>
  );
}
