import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import { useAuth } from "./../../contexts";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const FaceAuthentication = () => {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    const [detectedFace, setDetectedFace] = useState(null);
    const [loading, setLoading] = useState(false);
    const [time, setTime] = useState(5);

    const { currentUser } = useAuth();
    const navigate = useNavigate();

    // ✅ Load only required models (optimized)
    useEffect(() => {
        const loadModels = async () => {
            try {
                await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
                await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
                console.log("✅ Models Loaded");
            } catch (error) {
                console.error("❌ Model loading error:", error);
                alert("Failed to load models.");
            }
        };

        loadModels();
    }, []);

    // ✅ Capture + Detect Face
    const captureAndDetect = async () => {
        if (loading) return;

        try {
            setLoading(true);

            const imageSrc = webcamRef.current?.getScreenshot();
            if (!imageSrc) {
                alert("Failed to capture image.");
                setLoading(false);
                return;
            }

            // ✅ Faster image loading
            const img = await faceapi.fetchImage(imageSrc);

            // ✅ Optimized detection options
            const options = new faceapi.TinyFaceDetectorOptions({
                inputSize: 224,
                scoreThreshold: 0.5,
            });

            const detections = await faceapi
                .detectAllFaces(img, options)
                .withFaceLandmarks();

            if (detections.length === 0) {
                alert("No face detected. Try again.");
                setLoading(false);
                return;
            }

            const displaySize = {
                width: webcamRef.current.video.videoWidth,
                height: webcamRef.current.video.videoHeight,
            };

            faceapi.matchDimensions(canvasRef.current, displaySize);

            const resizedDetections = faceapi.resizeResults(
                detections,
                displaySize
            );

            // ✅ Clear canvas
            const context = canvasRef.current.getContext("2d");
            context.clearRect(
                0,
                0,
                canvasRef.current.width,
                canvasRef.current.height
            );

            // ✅ Draw only box (no landmarks → faster)
            faceapi.draw.drawDetections(
                canvasRef.current,
                resizedDetections
            );

            // ✅ Crop face
            const box = resizedDetections[0].detection.box;

            const faceCanvas = document.createElement("canvas");
            const faceContext = faceCanvas.getContext("2d");

            faceCanvas.width = box.width;
            faceCanvas.height = box.height;

            faceContext.drawImage(
                img,
                box.x,
                box.y,
                box.width,
                box.height,
                0,
                0,
                box.width,
                box.height
            );

            const detectedFaceData = faceCanvas.toDataURL("image/jpeg");
            setDetectedFace(detectedFaceData);

            // ✅ Send to backend
            const formData = new FormData();
            formData.append("image", dataURItoBlob(detectedFaceData));
            formData.append("email", currentUser?.email);

            const response = await axios.post(
                `${API_URL}/api/users/store-face`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            const faceToken = response.data.faceToken;

            if (faceToken) {
                localStorage.setItem("faceToken", faceToken);
                setTimeout(() => {
                    navigate("/user/dashboard");
                }, 5000);
            } else {
                alert("No token received.");
            }
        } catch (error) {
            console.error("❌ Detection error:", error);
            alert("Error detecting face.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (detectedFace && time > 0) {
            const timer = setTimeout(() => {
                setTime(time - 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [detectedFace, time]);

    // ✅ Convert base64 → blob
    const dataURItoBlob = (dataURI) => {
        const byteString = atob(dataURI.split(",")[1]);
        const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);

        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ab], { type: mimeString });
    };

    return (
        <div className="min-h-screen w-screen p-6 py-10">
            <div className="w-full flex justify-center">
                <div className="flex justify-center w-fit space-x-6">

                    {/* Webcam Section */}
                    <div className="relative">
                        <Webcam
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            videoConstraints={{
                                width: 640,
                                height: 480,
                                facingMode: "user",
                            }}
                            className="rounded-3xl shadow-md border border-white"
                        />

                        <canvas
                            ref={canvasRef}
                            className="absolute top-0 left-0 w-full h-full"
                        />

                        <div className="flex justify-center p-6 absolute left-1/2 -translate-x-1/2">
                            <button
                                onClick={captureAndDetect}
                                disabled={loading}
                                className={`px-10 py-3 rounded-full text-lg ${loading
                                    ? "bg-gray-400"
                                    : "bg-green-500 hover:scale-105"
                                    }`}
                            >
                                {loading ? "Processing..." : "Detect Face"}
                            </button>
                        </div>
                    </div>

                    {/* Detected Face Preview */}
                    {detectedFace && (
                        <div className="flex flex-col items-center">
                            <h2 className="text-lg font-semibold mb-2">
                                Detected Face
                            </h2>
                            <img
                                src={detectedFace}
                                alt="Detected Face"
                                className="rounded-lg shadow-md"
                            />
                            <div className="mt-2">Redirecting to Dashboard : <span className="text-green font-bold">{time}</span> sec</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FaceAuthentication;
