import * as faceapi from "face-api.js";

export const loadModels = () => {
  Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
    faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
    faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
    faceapi.nets.faceExpressionNet.loadFromUri("/models"),
  ]).then(() => {
    faceDetection();
  });
};

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
