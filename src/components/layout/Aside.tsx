"use client";

import { Link, useRouter } from "@/i18n/route";
import { Layout, Menu } from "antd";

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
          router.push(info.key);
        }}
      />
      <div>
        <div>
          <Link href="/language">Language</Link>
        </div>
      </div>
    </Sider>
  );
};

export default AsideContainer;
