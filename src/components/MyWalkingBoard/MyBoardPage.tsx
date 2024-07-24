import React, { useState } from 'react';
import Header from './Header';
import Tab from './Tab';
import BaseBox from '../../styles/common/BaseBox';
import Footer from '../common/Footer';

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
