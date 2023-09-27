import styled from "styled-components";

export const ModalContainer = styled.div`
  position: relative;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  z-index: 2;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: black;
  opacity: 0.5;
`;

export const Modal = styled.div`
  position: absolute;
  z-index: 3;
  border-radius: 4px;
  background-color: #f5f5f5;

  min-width: 288px;
  max-width: 360px;
  min-height: 256px;
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
`;
