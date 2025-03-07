import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";

const FaceAuthentication = () => {
    const webcamRef = useRef(null);
    const [status, setStatus] = useState(null);
    const [modelsLoaded, setModelsLoaded] = useState(false);

    useEffect(() => {
        const loadModels = async () => {
            try {
                // Load models from the public folder
                await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
                setModelsLoaded(true);
                console.log("Face detection model loaded successfully.");
            } catch (error) {
                console.error("Error loading models:", error);
            }
        };
        loadModels();
    }, []);

    return (
        <div className="min-h-screen w-screen p-6 py-16">
            <div className="w-full flex justify-center">
                <Webcam ref={webcamRef} screenshotFormat="image/jpeg" className="rounded-4xl shadow-md border border-white max-h-[70vh]" />
            </div>
            <div className="flex justify-center p-6">
                <button className="bg-green text-dark px-16 cursor-pointer py-4 rounded-full text-xl font-sfpro" disabled={!modelsLoaded}>
                    {modelsLoaded ? "Register" : "Loading..."}
                </button>
            </div>
            {status && (
                <p className={`mt-4 text-lg font-semibold ${status.type === "error" ? "text-red-400" : "text-green-400"}`}>
                    {status.message}
                </p>
            )}
        </div>
    );
};

export default FaceAuthentication;
