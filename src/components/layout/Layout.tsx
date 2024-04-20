"use client";

import styled from "styled-components";
import Aside from "./Aside";
import { ReactNode } from "react";
import MainBody from "./MainBody";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

const SLayout = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

interface LayoutProps {
  children: ReactNode;
}

const Layout = (props: LayoutProps) => {
  return (
    <Provider store={store}>
      <SLayout>
        <Aside />
        <MainBody>{props.children}</MainBody>
      </SLayout>
    </Provider>
  );
};

export default Layout;
