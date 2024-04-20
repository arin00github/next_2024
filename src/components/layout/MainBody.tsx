"use client";

import { ReactNode } from "react";
import styled from "styled-components";

const SMainBody = styled.div`
  margin-left: 240px;
  width: calc(100% - 240px);
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  //left: 240px;
`;

interface MainBodyProps {
  children: ReactNode;
}

const MainBody = (props: MainBodyProps) => {
  return <SMainBody>{props.children}</SMainBody>;
};

export default MainBody;
