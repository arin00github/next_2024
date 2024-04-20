"use client";
import { Title } from "@/components/common";
import {
  useGetResourceQuery,
  usePostUploadImageMutation,
} from "@/redux/api/resourceApi";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import styled from "styled-components";

const SUploadContain = styled.div`
  width: 100%;

  .content {
    padding: 0 30px;

    .imageBox {
      width: 300px;
    }

    .hidden {
      display: none;
    }
    .uploadBtn {
      padding: 8px 18px;
      border: none;
      outline: none;
      background-color: blue;
      color: white;
    }
  }
`;

const UploadwayImage = () => {
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const { data } = useGetResourceQuery("image");
  console.log("data", data);

  const [newFile, setNewFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string>();

  const [postUploadImage, { isError }] = usePostUploadImageMutation();

  const handleClickUploadBtn = () => {
    if (!inputFileRef.current) return;
    inputFileRef.current.click();
  };

  console.log("newFile", newFile);
  console.log("url", fileUrl);

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("handleChangeFile", e.target);
    if (!e.target.files) {
      alert("업로드할 파일을 선택해주세요.");
      return;
    }
    const newFile = e.target.files[0];
    const url = URL.createObjectURL(newFile);
    setFileUrl(url);
    setNewFile(newFile);
  };

  const handleUpload = async (newFile: File) => {
    const formData = new FormData();
    formData.append("imageFile", newFile);
    try {
      const res = await postUploadImage(formData).unwrap();
      console.log("res, upload", res);
      if (res.success) {
        setFileUrl(undefined);
        setNewFile(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SUploadContain>
      <Title>Upload Image</Title>
      <div className="content">
        <div className="imageBox">
          {fileUrl && (
            <Image src={fileUrl} alt="upload image" width={300} height={400} />
          )}
        </div>
        <div>
          <button className="uploadBtn" onClick={handleClickUploadBtn}>
            Select Image
          </button>
          <button
            className="uploadBtn"
            onClick={() => {
              if (!newFile) return;
              handleUpload(newFile);
            }}
          >
            Save
          </button>
        </div>

        <input
          type="file"
          className="hidden"
          onChange={handleChangeFile}
          ref={inputFileRef}
        />
      </div>
    </SUploadContain>
  );
};

export default UploadwayImage;
