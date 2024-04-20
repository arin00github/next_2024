"use client";
import { ReactNode } from "react";
import styled from "styled-components";

const STitle = styled.div`
  h2 {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 20px;
  }
`;

interface TitleProps {
  children: ReactNode;
}

export const Title = (props: TitleProps) => {
  return <STitle>{props.children}</STitle>;
};
