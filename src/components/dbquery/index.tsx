"use client";

import {
  useGetQueryDataQuery,
  usePostAddDataMutation,
} from "@/redux/api/dbqueryApi";
import styled from "styled-components";

const SContainer = styled.div`
  .btnWrap {
    button {
      border: none;
      outline: none;
      padding: 8px 20px;
      color: white;
      background-color: darkblue;
    }
  }
`;

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
    <SContainer>
      <div className="btnWrap">
        <button onClick={handleClickAdd}>Add Data</button>
      </div>
    </SContainer>
  );
};

export default DbQueryComponent;
