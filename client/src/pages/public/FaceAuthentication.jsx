import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import images from './../../assets/images/'

const FaceAuthentication = () => {
    const webcamRef = useRef(null);
    const [status, setStatus] = useState(null);
    const [modelsLoaded, setModelsLoaded] = useState(false);
    const [mobileLink, setMobileLink] = useState(true);
    const [endTime, setEndTime] = useState(false);
    const [timeLeft, setTimeLeft] = useState(30);

    useEffect(() => {
        const loadModels = async () => {
            try {
                await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
                setModelsLoaded(true);
                console.log("Face detection model loaded successfully.");
            } catch (error) {
                console.error("Error loading models:", error);
            }
        };
        loadModels();

        // Countdown Timer
        const timerInterval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timerInterval);
                    setMobileLink(false);
                    setEndTime(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timerInterval); // Cleanup
    }, []);

    return (
        <div className="min-h-screen w-screen p-6 py-16">
            <div className="w-full flex justify-center">
                <div className="flex justify-center w-fit space-x-6">
                    {/* Webcam for Registration */}
                    <div className="w-full flex-col items-center relative z-20" >
                        <Webcam ref={webcamRef} screenshotFormat="image/jpeg" className="rounded-4xl shadow-md border border-white max-h-[70vh]" />
                        <div className="flex justify-center p-6 space-x-4">
                            <button
                                className="bg-green text-dark px-16 cursor-pointer py-4 rounded-full text-xl font-sfpro"
                                disabled={!modelsLoaded}
                            >
                                {modelsLoaded ? "Register" : "Loading..."}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Authentication */}
                    <div className="w-full flex flex-col items-center justify-between h-full max-w-[25vw] bg-black p-4 rounded-4xl relative z-10 ">
                        <img src={images.QRCode} alt="" srcset="" className="bg-white rounded-3xl scale-90 " />
                        <div className="relative flex justify-between w-full h-full left-0   " > 
                            <div className="bg-dark w-16 h-16 rounded-full absolute -left-12 z-20" ></div>
                            <div className="w-full border-white border-2 border-dashed top-7 opacity-40    absolute  " ></div>
                            <div className="bg-dark w-16 h-16 rounded-full absolute -right-12 " ></div>
                        </div>
                        <div className="flex-col items-center p-6 space-y-3 space-x-4 w-full  ">
                            <button
                                className="bg-white text-dark px-10 min-w-full disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer py-4 rounded-full text-xl font-sfpro"
                                disabled={mobileLink}
                            >
                                {endTime ? "Copy Link" : `Open in ${timeLeft} secs`}
                            </button>
                            <button
                                className="bg-green text-dark px-10 min-w-full disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer py-4 rounded-full text-xl font-sfpro"
                                disabled={mobileLink}
                            >
                                {endTime ? "Share with Mail" : `Open in ${timeLeft} secs`}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Status Message */}
            {status && (
                <p className={`mt-4 text-lg font-semibold ${status.type === "error" ? "text-red-400" : "text-green-400"}`}>
                    {status.message}
                </p>
            )}
        </div>
    );
};

export default FaceAuthentication;
