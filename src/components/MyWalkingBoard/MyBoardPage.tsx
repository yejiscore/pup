import React, { useState } from 'react';
import Header from './Header.tsx';
import Tab from './Tab.tsx';
import BaseBox from '../../styles/common/BaseBox.ts';
import Footer from '../common/Footer.tsx';

function MyBoardPage() {
    const [activeTab, setActiveTab] = useState('산책로');

    return (
        <BaseBox>
            <Header />
            <Tab activeTab={activeTab} setActiveTab={setActiveTab} />
            <Footer />
        </BaseBox>
    );
}

export default MyBoardPage;
