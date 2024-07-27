/* eslint-disable no-shadow */
/* eslint-disable react/jsx-no-constructed-context-values */
import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from 'react';
import { DataItem } from '../types/DataItem';
import { fetchData } from '../services/apiService';
import { getCookie } from '../utils/cookiesUtils';

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
  isLoading: boolean;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isTrashIcon, setIsTrashIcon] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [myData, setMyData] = useState<DataItem[]>([]);
  const [likeData, setLikeData] = useState<DataItem[]>([]);
  const [filter, setFilter] = useState('전체');
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const accessToken = getCookie('pup_access');
      if (!accessToken) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const myDataResponse = await fetchData('/walking-trail');
        const likeDataResponse = await fetchData('/walking-trail/like');
        console.log('myDataResponse:', myDataResponse);
        console.log('likeDataResponse:', likeDataResponse);
        setMyData(myDataResponse);
        setLikeData(likeDataResponse);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to fetch data', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

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
        prevData.filter((item) => !selectedItems.includes(item.walkingTrailId))
      );
    } else if (activeSubTab === '찜한 산책로') {
      setLikeData((prevData) =>
        prevData.filter((item) => !selectedItems.includes(item.walkingTrailId))
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
            new Date(b.createdDate).getTime() -
            new Date(a.createdDate).getTime()
        );
    }
    if (filter === '과거순') {
      return data
        .slice()
        .sort(
          (a, b) =>
            new Date(a.createdDate).getTime() -
            new Date(b.createdDate).getTime()
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
        isLoading,
        isAuthenticated,
        setIsAuthenticated,
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
