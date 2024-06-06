"use client";

import Aside from "./Aside";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { Layout } from "antd";

interface LayoutProps {
  children: ReactNode;
}

const Template = (props: LayoutProps) => {
  return (
    <Provider store={store}>
      <Layout>
        <Aside />
        <Layout.Content>{props.children}</Layout.Content>
      </Layout>
    </Provider>
  );
};

export default Template;
