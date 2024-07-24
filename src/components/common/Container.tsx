import React, { ReactNode } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    height: calc(100% - 255px);
    box-sizing: border-box;
    align-items: center;
    position: absolute;
    top: 196px;
    overflow-y: auto;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
`;

interface ContainerLayoutProps {
    children: ReactNode;
}

function ContainerLayout({ children }: ContainerLayoutProps) {
    return <Container>{children}</Container>;
}

export default ContainerLayout;
