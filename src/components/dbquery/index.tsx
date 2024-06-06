"use client";

import {
  useGetQueryDataQuery,
  usePostAddDataMutation,
} from "@/redux/api/dbqueryApi";
import { Button, Layout, Space, Table } from "antd";

const { Content } = Layout;

const { Column, ColumnGroup } = Table;

const DbQueryComponent = () => {
  const { data } = useGetQueryDataQuery(null);

  const [postAddData] = usePostAddDataMutation();
  console.log("data", data);

  const handleClickAdd = async () => {
    const res = await postAddData(null).unwrap();
    console.log("postAddData", res);
    if (res.success) {
      //
    }
  };

  return (
    <Content>
      <Space>
        <Button onClick={handleClickAdd}>Add Data</Button>
      </Space>
      <Space>
        <Table dataSource={data} loading={!data}>
          <Column title="code" dataIndex="code" />
          <ColumnGroup title="review">
            <Column dataIndex="like" />
            <Column dataIndex="dislike" />
          </ColumnGroup>
        </Table>
      </Space>
    </Content>
  );
};

export default DbQueryComponent;
