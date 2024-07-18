/* eslint-disable no-unused-vars */
import React from 'react';
import styled from 'styled-components';

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  background-color: #ffffff;
  padding: 10px 0;
`;

const FilterButton = styled.button<{ active: boolean }>`
  background-color: ${(props) => (props.active ? '#00AE80' : '#B7CAC4')};
  border: none;
  padding: 10px;
  cursor: pointer;
  flex: 1;
  font-size: 1em;
  color: ${(props) => (props.active ? '#fff' : '#000')};
`;

interface FilterProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

function Filter({ activeFilter, setActiveFilter }: FilterProps) {
  return (
    <FilterContainer>
      <FilterButton
        active={activeFilter === 'Filter'}
        onClick={() => setActiveFilter('Filter')}
      >
        Filter
      </FilterButton>
    </FilterContainer>
  );
}

export default Filter;
