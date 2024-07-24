/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/function-component-definition */
import React, { createContext, useState, ReactNode, useContext } from 'react';
import { myData as initialMyData } from '../data/mydata';
import { likeData as initialLikeData } from '../data/likedata';
import { DataItem } from '../types/DataItem';

interface AppContextProps {
    isTrashIcon: boolean;
    toggleTrashIcon: () => void;
    isModalOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
    selectedItems: number[];
    toggleSelectItem: (id: number) => void;
    deleteSelectedItems: (activeSubTab: string) => void;
    myData: DataItem[];
    setMyData: React.Dispatch<React.SetStateAction<DataItem[]>>;
    likeData: DataItem[];
    setLikeData: React.Dispatch<React.SetStateAction<DataItem[]>>;
    filter: string;
    setFilter: (filter: string) => void;
    showCalendar: boolean;
    toggleCalendar: () => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [isTrashIcon, setIsTrashIcon] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [myData, setMyData] = useState<DataItem[]>(initialMyData);
    const [likeData, setLikeData] = useState<DataItem[]>(initialLikeData);
    const [filter, setFilter] = useState('전체');
    const [showCalendar, setShowCalendar] = useState<boolean>(false);

    const toggleTrashIcon = () => {
        if (isTrashIcon && selectedItems.length === 0) {
            setIsTrashIcon(false);
        } else {
            setIsTrashIcon(!isTrashIcon);
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const toggleSelectItem = (id: number) => {
        setSelectedItems((prevState) =>
            prevState.includes(id)
                ? prevState.filter((item) => item !== id)
                : [...prevState, id]
        );
    };

    const deleteSelectedItems = (activeSubTab: string) => {
        if (activeSubTab === '내 산책로') {
            setMyData((prevData) =>
                prevData.filter((item) => !selectedItems.includes(item.id))
            );
        } else if (activeSubTab === '찜한 산책로') {
            setLikeData((prevData) =>
                prevData.filter((item) => !selectedItems.includes(item.id))
            );
        }
        setSelectedItems([]);
        closeModal();
        setIsTrashIcon(false);
    };

    const toggleCalendar = () => {
        setShowCalendar((prevShowCalendar) => !prevShowCalendar);
    };

    const filterData = (data: DataItem[], filter: string) => {
        if (filter === '최신순') {
            return data
                .slice()
                .sort(
                    (a, b) =>
                        new Date(b.date).getTime() - new Date(a.date).getTime()
                );
        }
        if (filter === '과거순') {
            return data
                .slice()
                .sort(
                    (a, b) =>
                        new Date(a.date).getTime() - new Date(b.date).getTime()
                );
        }
        return data;
    };

    return (
        <AppContext.Provider
            value={{
                isTrashIcon,
                toggleTrashIcon,
                isModalOpen,
                openModal,
                closeModal,
                selectedItems,
                toggleSelectItem,
                deleteSelectedItems,
                myData: filterData(myData, filter),
                setMyData,
                likeData: filterData(likeData, filter),
                setLikeData,
                filter,
                setFilter,
                showCalendar,
                toggleCalendar,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
