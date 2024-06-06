"use client";

import { Layout, Menu } from "antd";
import { useRouter } from "next/navigation";

const { Sider, Content } = Layout;

export const MenuArray = [
  { label: "image upload", key: "/uploadway/image" },
  { label: "audio upload", key: "/uploadway/audio" },
  { label: "video upload", key: "/uploadway/video" },
  { label: "mongodb query", key: "/dbquery" },
  { label: "drag and drop", key: "/dragdrop" },
];

const AsideContainer = () => {
  const router = useRouter();

  return (
    <Sider style={{ height: "100vh", background: "white" }}>
      <Menu
        items={MenuArray}
        onClick={(info) => {
          console.log("info", info);
          router.push(info.key);
        }}
      />
    </Sider>
  );
};

export default AsideContainer;
