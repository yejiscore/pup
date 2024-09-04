// src/components/Modal/CopyModal.tsx
import React, { useEffect } from 'react';
import styled from 'styled-components';

interface CopyModalProps {
  show: boolean;
  onClose: () => void;
  url: string;
}

<<<<<<< HEAD
const Modal = styled.div<{ show: boolean }>`
=======
const Modal = styled.div<{ $show: boolean }>`
>>>>>>> feature/develop
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1000;
<<<<<<< HEAD
  opacity: ${(props) => (props.show ? 1 : 0)};
=======
  opacity: ${(props) => (props.$show ? 1 : 0)};
>>>>>>> feature/develop
  transition: opacity 1s ease-out;
`;

function CopyModal({ show, onClose, url }: CopyModalProps) {
  useEffect(() => {
    if (show) {
      navigator.clipboard.writeText(url).then(() => {
        setTimeout(onClose, 1000);
      });
    }
  }, [show, onClose, url]);

<<<<<<< HEAD
  return <Modal show={show}>URL이 복사되었습니다!</Modal>;
=======
  return <Modal $show={show}>URL이 복사되었습니다!</Modal>;
>>>>>>> feature/develop
}

export default CopyModal;
