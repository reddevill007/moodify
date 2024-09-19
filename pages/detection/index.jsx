import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import * as faceapi from "face-api.js";
import Head from "next/head";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useSession, signOut, getSession } from "next-auth/react";

export default function Detection() {
  const { data: session } = useSession();
  const router = useRouter();
  const videoRef = useRef();
  const canvasRef = useRef();
  const [expression, setExpression] = useState();
  const [result, setResult] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    startVideo();

    videoRef && loadModels();
  }, []);

  const faceDetection = async () => {
    setInterval(async () => {
      if (!open) {
        const detections = await faceapi
          ?.detectAllFaces(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          )
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

  const getExpression = () => {
    if (expression) {
      const sortable = Object.fromEntries(
        Object.entries(expression).sort(([, a], [, b]) => a - b)
      );
      const res = Object.keys(sortable).pop();
      return res;
    }
    return "detecting...";
  }

  const handleExpressions = () => {
    setLoading(true);
    if (expression) {
      const sortable = Object.fromEntries(
        Object.entries(expression).sort(([, a], [, b]) => a - b)
      );
      const res = Object.keys(sortable).pop();
      setResult(res);
      console.log(result);

      videoRef.current.srcObject = null;

      setOpen(true);
      setLoading(false);
    } else {
      console.log("no expression")
    }
  };

  function onClick() {
    window.location.href = `/dashboard/${result}`
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen p-10 md:p-20">
      <Head>
        <title>Moodify: Emotion Detection</title>
      </Head>
      <h1 className="mb-2 text-2xl font-bold text-center text-white md:text-4xl">Moodify</h1>
      <p className="text-gray-300 max-w-[100ch] text-center mx-auto mb-3">Transform Your Listening Experience with Moodifys Mood-Based Music Selection</p>
      <div className="relative overflow-hidden md:w-[500px] md:h-[500px] w-[300px] h-[300px] rounded-lg border bg-[#15171C] border-[#F97535] mb-3">
        {open &&
          <div className="flex flex-col items-center justify-center w-full h-full gap-2">
            <p className="text-gray-300 font-medium text-xl max-w-[100ch] text-center">You seem {result}</p>
            <div className="md:w-[300px] md:h-[300px] w-[200px] h-[200px] flex items-center justify-center border border-blue-800 rounded-full overflow-hidden">
              <Image
                src="/images/face.gif"
                height={20}
                width={20}
                alt="recognition"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        }
        <video
          crossOrigin="anonymous"
          className={`w-full h-full ${open ? 'hidden' : 'block'} rounded`}
          ref={videoRef}
          autoPlay
        ></video>
        <canvas
          ref={canvasRef}
          width="100%"
          height="100%"
          className={`absolute top-0 left-0 w-full h-full ${open ? 'hidden' : 'block'} rounded`}
        />
      </div>

      {!open && <div className="flex flex-col items-center justify-center">
        <p className="text-white font-medium text-xl max-w-[100ch] text-center -mt-2">You seem: {getExpression()}</p>
        {expression ? <button
          className="bg-[#F97535] hover:bg-[#F97535]/90 text-white h-10 px-8 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 mt-7"
          onClick={() => handleExpressions()}
        >
          Stop
        </button> : <button
          className="bg-[#F97535] hover:bg-[#F97535]/90 text-white h-10 px-10 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 mt-7"
        >
          <AiOutlineLoading3Quarters className="animate-spin" />
        </button>}
      </div>}
      {open &&
        <div
          className="bg-[#F97535] hover:bg-[#F97535]/90 text-white h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 mt-7"
          onClick={onClick}
        >
          Find Music
        </div>}
    </div>
  );
}


export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }

  return {
    props: { session },
  };
}