"use client";

import { MenuArray } from "@/constant/menu";
import Link from "next/link";
import styled from "styled-components";

const SAside = styled.div`
  width: 240px;
  height: 100vh;
  background-color: #040031;
  color: white;
  .head {
    height: 60px;
    padding: 20px;
  }

  .body {
    .navlist {
      display: flex;
      flex-direction: column;
      .navItem {
        padding: 0 30px;
        height: 36px;
        line-height: 36px;
      }
    }
  }
`;

const Aside = () => {
  return (
    <SAside>
      <div className="body">
        <div className="navlist">
          {MenuArray.map((menu) => {
            return (
              <div key={menu.key} className="navItem">
                <Link href={menu.url}>{menu.label}</Link>
              </div>
            );
          })}
        </div>
      </div>
    </SAside>
  );
};

export default Aside;
