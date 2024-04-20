import { ReactNode } from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  width: 100%;
  padding: 0 30px;
`;

interface ContainerProps {
  children: ReactNode;
}

const Container = (props: ContainerProps) => {
  return <StyledContainer>{props.children}</StyledContainer>;
};

export default Container;
