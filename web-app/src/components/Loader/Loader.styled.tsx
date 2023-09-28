import { PRIMARY_COLOR, TRANSPARENT_BACKGROUND } from "@/styles/constants";
import styled from "styled-components";

export const Loader = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid ${PRIMARY_COLOR};
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const GlobalLoaderWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  ${TRANSPARENT_BACKGROUND}
`;
