"use client";

import { DragEvent, useState } from "react";
import styled from "styled-components";
import Container from "../layout/Container";

interface CountryItem {
  label: string;
  id: string;
}

const initialList: CountryItem[] = [
  { label: "Korean", id: "KOR" },
  { label: "Japanese", id: "JPN" },
  { label: "English", id: "ENG" },
  { label: "Russian", id: "RUS" },
  { label: "Spanish", id: "SPA" },
  { label: "Chinese", id: "CHN" },
  { label: "Indonesian", id: "IND" },
  { label: "Vietnam", id: "VIE" },
];

const DragDropComponent = () => {
  const [dataList, setDataList] = useState<CountryItem[]>(initialList);

  const [isDragging, setIsDragging] = useState<boolean>(false);

  const [dragTarget, setDragTarget] = useState<CountryItem | null>(null);

  const dragStart = (data: CountryItem) => {
    setIsDragging(true);
    setDragTarget(data);
  };

  const dragMove = (id: string, index: number) => {
    //
    //console.log("dragmove", e);
    if (isDragging && dragTarget) {
      const targetIndex = dataList.findIndex((dt) => dt.id === dragTarget.id);
      console.log("dragMove", targetIndex, index);

      const newArray = [...dataList];
      newArray.splice(targetIndex, 1);
      console.log("newArray delete", newArray);
      newArray.splice(index, 0, dragTarget);
      setDataList(newArray);
    }
  };

  const dragEnd = () => {
    setIsDragging(false);
  };

  return (
    <Container>
      <StyledTable>
        <thead>
          <tr>
            <th>번호</th>
            <th>국가</th>
          </tr>
        </thead>
        <tbody>
          {dataList.map((dt, idx) => {
            return (
              <StyledRow
                key={`${dt.id}_${idx}`}
                draggable
                selected={dragTarget?.id === dt.id}
                onDragStart={() => dragStart(dt)}
                onDragOver={(e) => dragMove(dt.id, idx)}
                onDragEnd={dragEnd}
              >
                <td>{idx + 1}</td>
                <td>{dt.label}</td>
              </StyledRow>
            );
          })}
        </tbody>
      </StyledTable>
    </Container>
  );
};

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  tbody,
  thead {
    width: 100%;
  }
`;

const StyledRow = styled.tr<{ selected: boolean }>`
  width: 100%;
  height: 38px;
  line-height: 38px;
  cursor: grab;
  background-color: ${(props) => (props.selected ? "#312a46" : "transparent")};
  border: 1px solid #ffffff1d;
`;

export default DragDropComponent;
