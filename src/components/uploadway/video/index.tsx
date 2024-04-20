"use client";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const VideoBox = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;

  video {
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: cover;
  }
`;

const UploadwayAudio = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [playSecond, setPlaySecond] = useState<number>(0);

  const [cameraAccess, setCameraAccess] = useState(false);
  const [recordStatus, setRecordStatus] = useState("prepare");
  const [videoUrl, setVideoUrl] = useState<string | undefined>(undefined);

  // 카메라 스트림 가져오기
  const getCameraStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (stream) {
        setCameraAccess(true);
      }
    } catch (err) {
      console.error("카메라 스트림을 가져올 수 없습니다.", err);
      setCameraAccess(false);
    }
  };

  const startRecord = async () => {
    if (!videoRef.current) return;
    if (!cameraAccess) {
      alert("카메라 권한이 없습니다.");
      return;
    }
    setRecordStatus("record");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (stream) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error("카메라 스트림을 가져올 수 없습니다.", err);
      //setCameraAccess(false);
    }
  };

  const stopRecord = () => {
    if (!videoRef.current) return;
    setRecordStatus("complete");
    videoRef.current.pause();
    console.log("stopRecord");
  };

  useEffect(() => {
    let timer = undefined;
    if (recordStatus === "record") {
      timer = setInterval(() => {
        const newValue = 1 + playSecond;
        setPlaySecond(newValue);
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [recordStatus]);

  // 컴포넌트가 마운트될 때 카메라 스트림 가져오기
  useEffect(() => {
    getCameraStream();
  }, []);

  return (
    <VideoBox>
      {recordStatus === "complete" && videoUrl && (
        <video src={videoUrl} controls></video>
      )}
      <video src="" controls ref={videoRef}></video>
    </VideoBox>
  );
};

export default UploadwayAudio;
