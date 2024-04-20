"use client";

import { Title } from "@/components/common";
import Container from "@/components/layout/Container";
import { useEffect, useRef, useState } from "react";
import { AiTwotoneAudio } from "react-icons/ai";
import { IoPlay } from "react-icons/io5";
import { MdOutlinePause } from "react-icons/md";
import styled from "styled-components";

const UploadwayAudio = () => {
  const mediaRecorder = useRef<any | null>(null);
  const [audioData, setAudioData] = useState<string | null>(null);
  const [recording, setRecording] = useState<boolean>(false);
  const [recordStatus, setRecordStatus] = useState("prepare");

  const [recordTime, setRecordTime] = useState<number>(0);

  /**
   * @description 녹음 시작
   */
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorder.current = recorder;
      const chunks: any[] = [];
      recorder.ondataavailable = (event: BlobEvent) => {
        if (event.data.size > 0) {
          chunks.push(new Uint8Array(event.data));
        }
      };
      recorder.onstop = () => {
        const audioBlob = new Blob(chunks, { type: "audio/wav" });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          const base64data = reader.result as string;
          setAudioData(base64data);
        };
      };
      recorder.start();
      setRecording(true);
      setRecordStatus("record");
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  /**
   * @description 녹음중지
   */
  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      setRecording(false);
      setRecordStatus("complete");
    }
  };

  /**
   * @description 녹음재생
   * @returns
   */
  const playAudio = () => {
    if (!audioData) {
      console.error("No audio recorded.");
      return;
    }

    const audio = new Audio(audioData);
    audio.play();
  };

  /**
   * @description 다시녹음 시작하는 함수
   */
  const handleRecordAgain = () => {
    setAudioData(null);
    setRecordStatus("record");
    setRecordTime(0);
    startRecording();
  };

  const handleSaveAudio = () => {
    console.log("handleSaveAudio");
  };

  useEffect(() => {
    let timer = undefined;
    if (recording) {
      timer = setInterval(() => {
        setRecordTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (timer) {
        clearInterval(timer);
      }
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [recording]);

  return (
    <Container>
      <Title>Audio Record</Title>
      <RecordBox>
        {recordStatus === "complete" && (
          <button className="button" onClick={handleRecordAgain}>
            Record Again
          </button>
        )}
        <div>
          {recordStatus === "prepare" && (
            <button className="button" onClick={startRecording}>
              <AiTwotoneAudio />
            </button>
          )}
          {recordStatus === "record" && (
            <button className="button" onClick={stopRecording}>
              <div className="second">{recordTime}</div>
              <MdOutlinePause />
            </button>
          )}
          {recordStatus === "complete" && (
            <button className="button" onClick={playAudio}>
              <IoPlay />
            </button>
          )}
        </div>

        {recordStatus === "complete" && (
          <button className="button" onClick={handleSaveAudio}>
            Save
          </button>
        )}
      </RecordBox>

      <ResultBox>
        <div className="hidden">
          <audio src="" controls></audio>
        </div>
      </ResultBox>
    </Container>
  );
};

const ResultBox = styled.div`
  width: 100%;
  padding-top: 40px;
  .hidden {
    display: none;
  }
`;

const RecordBox = styled.div`
  padding-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;

  .button {
    outline: none;
    border: none;
    color: white;
    border-radius: 8px;
    padding: 10px 18px;
    background-color: rebeccapurple;
  }

  .second {
    text-align: center;
    color: white;
    font-size: 18px;
    font-weight: 600;
  }
`;

export default UploadwayAudio;
