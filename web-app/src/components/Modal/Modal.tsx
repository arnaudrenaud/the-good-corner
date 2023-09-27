import { ReactNode } from "react";
import * as styled from "./Modal.styled";

const Modal = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <styled.ModalOverlay />
      <styled.Modal aria-modal>{children}</styled.Modal>
    </>
  );
};

export default Modal;
export { ModalContainer } from "./Modal.styled";
