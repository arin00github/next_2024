"use client";
import { useEffect, useState } from "react";

const UploadwayAudio = () => {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [audioData, setAudioData] = useState<string | null>(null);
  const [recording, setRecording] = useState<boolean>(false);
  const [recordStatus, setRecordStatus] = useState("prepare");

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      const chunks: Uint8Array[] = [];

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
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  const playAudio = () => {
    if (!audioData) {
      console.error("No audio recorded.");
      return;
    }

    const audio = new Audio(audioData);
    audio.play();
  };

  return (
    <div>
      {audioData && (
        <div>
          <audio src="" controls></audio>
        </div>
      )}
    </div>
  );
};

export default UploadwayAudio;
