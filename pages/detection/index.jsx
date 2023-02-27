import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as faceapi from "face-api.js";
import Link from "next/link";

export default function Detection() {
  const router = useRouter();
  const videoRef = useRef();
  const canvasRef = useRef();
  const [expression, setExpression] = useState();
  const [result, setResult] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    startVideo();
    videoRef && loadModels();
  }, []);

  const loadModels = () => {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models"),
    ]).then(() => {
      faceDetection();
    });
  };

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((currentStream) => {
        videoRef.current.srcObject = currentStream;
      })
      .catch((err) => {
        console.error(err);

      });
  };

  const handleExpressions = () => {
    setLoading(true);
    const sortable = Object.fromEntries(
      Object.entries(expression).sort(([, a], [, b]) => a - b)
    );

    const res = Object.keys(sortable).pop();
    setResult(res);
    console.log(result);

    videoRef.current.srcObject = null;

    setTimeout(() => {
      setOpen(true);
      setLoading(false);
    }, 5000);
  };

  const faceDetection = async () => {
    const interval = setInterval(async () => {
      if (!open) {
        const detections = await faceapi
          ?.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
          ?.withFaceLandmarks()
          ?.withFaceExpressions();
        setExpression(detections[0]?.expressions);



        canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(
          videoRef.current
        );
        faceapi.matchDimensions(canvasRef.current, {
          width: 940,
          height: 650,
        });
        const resized = faceapi.resizeResults(detections, {
          width: 940,
          height: 650,
        });
        // to draw the detection onto the detected face i.e the box
        faceapi.draw.drawDetections(canvasRef.current, resized);
        //to draw the the points onto the detected face
        faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);
        //to analyze and output the current expression by the detected face
        faceapi.draw.drawFaceExpressions(canvasRef.current, resized);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex justify-center items-center flex-col bg-gradient-to-tr from-slate-700 to-slate-900">
      <h1 className="text-red-800">MOODIFY</h1>
      <div className="relative mb-16 w-[940px] h-[650px]">
        <video
          crossOrigin="anonymous"
          className="w-full h-full"
          ref={videoRef}
          autoPlay
        ></video>
        <canvas
          ref={canvasRef}
          width="100%"
          height="100%"
          className="absolute top-0 left-0 bg-black bg-opacity-25"
        />
      </div>

      <button
        className="pointer border p-5"
        onClick={() => handleExpressions()}
      >
        Stop
      </button>
      {loading ? "loading..." : null}
      {open && <Link href="/dashboard">Find Music</Link>}

      <p>You seem {result} </p>
    </div>
  );
}
