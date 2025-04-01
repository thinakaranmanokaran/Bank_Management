import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import { useAuth } from './../../contexts';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

const FaceAuthentication = () => {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const [detectedFace, setDetectedFace] = useState(null);

    const { currentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const loadModels = async () => {
            try {
                await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
                await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
                await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
                console.log("Models Loaded");
            } catch (error) {
                console.error("Error loading models:", error);
                alert("Failed to load models. Check console for details.");
            }
        };

        loadModels();
    }, []);

    const captureAndDetect = async () => {
        try {
            const imageSrc = webcamRef.current?.getScreenshot();
            if (!imageSrc) {
                alert("Failed to capture image from webcam.");
                return;
            }

            const img = document.createElement("img");
            img.src = imageSrc;
            img.onload = async () => {
                const displaySize = { width: webcamRef.current.video.videoWidth, height: webcamRef.current.video.videoHeight };
                faceapi.matchDimensions(canvasRef.current, displaySize);

                const detections = await faceapi.detectAllFaces(img, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors();

                if (detections.length === 0) {
                    alert("No face detected. Try again.");
                    return;
                }

                alert(`Detected ${detections.length} face(s).`);

                const resizedDetections = faceapi.resizeResults(detections, displaySize);
                const context = canvasRef.current.getContext("2d");
                context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
                faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);

                // Extract and display the first detected face
                const box = resizedDetections[0].detection.box;
                const faceCanvas = document.createElement("canvas");
                const faceContext = faceCanvas.getContext("2d");

                faceCanvas.width = box.width;
                faceCanvas.height = box.height;

                faceContext.drawImage(
                    img,
                    box.x, box.y, box.width, box.height,
                    0, 0, box.width, box.height
                );

                const detectedFaceData = faceCanvas.toDataURL("image/jpeg");
                setDetectedFace(detectedFaceData);

                // Send data to backend
                const formData = new FormData();
                formData.append('image', dataURItoBlob(detectedFaceData));
                formData.append('email', currentUser?.email);

                await axios.post(`${API_URL}/api/users/store-face`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                }).then((response) => {
                    const faceToken = response.data.faceToken;
                    if (faceToken) {
                        localStorage.setItem('faceToken', faceToken);
                        // alert('Face data sent to backend successfully and token stored!');
                        navigate('/user/dashboard')
                    } else {
                        alert('Face data sent, but no token received.');
                    }
                }).catch((error) => {
                    console.error("Error sending face data:", error);
                    alert("Failed to send face data.");
                });
                
            };
        } catch (error) {
            console.error("Error during face detection:", error);
            alert("Error detecting face. Check console for details.");
        }
    };

    const dataURItoBlob = (dataURI) => {
        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    };

    return (
        <div className="min-h-screen w-screen p-6 py-10">
            {/* <div>{currentUser?.email}</div> */}
            <div className="w-full flex justify-center">
                <div className="flex justify-center w-fit space-x-6">
                    <div className="w-full flex-col items-center relative z-20">
                        <Webcam ref={webcamRef} screenshotFormat="image/jpeg" className="rounded-4xl shadow-md border border-white max-h-[70vh]" />
                        <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
                        <div className="flex justify-center p-6 space-x-4 absolute left-1/2 -translate-x-1/2 z-50">
                            <button onClick={captureAndDetect} className="bg-green text-dark px-16 cursor-pointer py-4 rounded-full text-xl font-sfpro focus:bg-white disabled:cursor-not-allowed hover:scale-110 ">Detect Face</button>
                        </div>
                    </div>
                    {detectedFace && (
                        <div className="flex flex-col items-center">
                            <h2 className="text-xl font-semibold mb-4">Detected Face</h2>
                            <img src={detectedFace} alt="Detected Face" className="rounded-lg shadow-md" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FaceAuthentication;
