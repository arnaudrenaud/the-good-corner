import styled from "styled-components";
import { buttonStyle } from "./buttonStyle";
import { PRIMARY_COLOR } from "@/styles/constants";

export const PrimaryButton = styled.button`
  ${buttonStyle}

  background-color: ${PRIMARY_COLOR};
  color: white;
`;
