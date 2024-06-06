"use client";

import { Title } from "@/components/common";
import { LabelItemType } from "@/interface/common";
import { Button, Flex, Input, Layout, Select, Space } from "antd";
import { useState } from "react";

const sortOptions: LabelItemType[] = [
  { label: "최근생성", value: "dec_create" },
  { label: "과거생성", value: "asc_create" },
];
interface MemberDataFilter {
  sort: string;
  searchWord: string;
}

export const MemberList = () => {
  const [filter, setFilter] = useState<MemberDataFilter>({
    sort: "",
    searchWord: "",
  });

  return (
    <Layout.Content>
      <Title>Member Management</Title>
      <Space>
        <Flex>
          <Select options={sortOptions} />
          <Input.Search />
        </Flex>
        <Button>Create New Member</Button>
      </Space>
      <Space>preparing</Space>
    </Layout.Content>
  );
};
