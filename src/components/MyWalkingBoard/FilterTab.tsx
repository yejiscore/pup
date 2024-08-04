// src/components/FilterTab.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContext';
import ListIcon from '../../assets/List.png';
import CalendarIcon from '../../assets/Calendar.png';

const Container = styled.div`
  width: 100%;
  height: 49px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  box-sizing: border-box;
  position: absolute;
  top: 147px;
`;

interface FilterSelectContainerProps {
  'data-active'?: string;
}

const FilterSelectContainer = styled.div<FilterSelectContainerProps>`
  position: relative;
  width: 98px;
  height: 29px;
  border: 2px solid #00ae80;
  border-radius: 100px;
  background-color: ${(props) =>
    props['data-active'] === 'true' ? '#00ae80' : 'white'};
  color: ${(props) => (props['data-active'] === 'true' ? 'white' : '#00ae80')};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SelectedOption = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OptionList = styled.div`
  position: absolute;
  top: 34px;
  left: 0;
  width: 100%;
  overflow: hidden;
  background-color: white;
  border: 1px solid #00ae80;
  border-radius: 12px;
  z-index: 10;
`;

const Option = styled.div`
  width: 100%;
  padding: 8px 0;
  text-align: center;
  color: #00ae80;
  cursor: pointer;

  &:hover {
    background-color: #99dfcc;
  }

  &:active {
    background-color: #00ae80;
    color: white;
  }
`;

const CalendarButton = styled.img`
  cursor: pointer;
`;

interface FilterTabProps {
  activeSubTab: string;
}

function FilterTab({ activeSubTab }: FilterTabProps) {
  const { showCalendar, toggleCalendar, filter, setFilter } = useAppContext();
  const [showOptions, setShowOptions] = useState(false);

  const handleFilterChange = (value: string) => {
    setFilter(value);
    setShowOptions(false);
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <Container>
      <FilterSelectContainer
        data-active={filter !== '전체' ? 'true' : 'false'}
        onClick={toggleOptions}
      >
        <SelectedOption>{filter}</SelectedOption>
        {showOptions && (
          <OptionList>
            {['전체', '최신순', '과거순'].map((option) => (
              <Option key={option} onClick={() => handleFilterChange(option)}>
                {option}
              </Option>
            ))}
          </OptionList>
        )}
      </FilterSelectContainer>
      {activeSubTab !== '찜한 산책로' && (
        <CalendarButton
          src={showCalendar ? ListIcon : CalendarIcon}
          alt="Calendar Button"
          onClick={toggleCalendar}
        />
      )}
    </Container>
  );
}

export default FilterTab;
