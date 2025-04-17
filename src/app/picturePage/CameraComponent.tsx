"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { CameraPermissionPopup } from "./CameraPermissionPopup";
import { CameraTips } from "./CameraTips";
import { PictureSquares } from "./PictureSquares";

interface CameraComponentProps {
  onCapture: (imageData: string) => void; // Callback to handle the captured image
  onCameraActive?: () => void; // Optional callback when camera becomes active
  isFullScreen?: boolean; // Whether the camera should take up the full screen
  initialStream: MediaStream | null;
  onStreamChange: (stream: MediaStream | null) => void;
  onExitFullscreen?: () => void; // Add this prop
}

const CameraComponent: React.FC<CameraComponentProps> = ({
  onCapture,
  onCameraActive,
  isFullScreen,
  initialStream,
  onStreamChange,
  onExitFullscreen,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showPermissionPopup, setShowPermissionPopup] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [capturedImageData, setCapturedImageData] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    let mounted = true;
    let timeoutId: NodeJS.Timeout;

    const initializeVideo = async () => {
      if (initialStream && videoRef.current && isFullScreen && mounted) {
        try {
          const video = videoRef.current;

          // Clear any existing source
          if (video.srcObject) {
            video.srcObject = null;
            video.load();
          }

          // Set new stream
          video.srcObject = initialStream;

          // Wait for metadata to load
          await new Promise<void>((resolve) => {
            timeoutId = setTimeout(() => {
              if (mounted) {
                console.warn(
                  "Metadata loading taking longer than expected, but continuing..."
                );
                resolve();
              }
            }, 10000);

            video.onloadedmetadata = () => {
              if (mounted) {
                clearTimeout(timeoutId);
                resolve();
              }
            };

            // Also resolve if we already have metadata
            if (video.readyState >= 2) {
              clearTimeout(timeoutId);
              resolve();
            }
          });

          if (!mounted) return;

          try {
            await video.play();

            // Start loading animation
            if (mounted) {
              setIsLoading(true);
              // Wait for loading animation
              setTimeout(() => {
                if (mounted) {
                  setIsLoading(false);
                  setVideoReady(true);
                }
              }, 3000);
            }
          } catch (playError) {
            console.error("Error playing video:", playError);
          }
        } catch (error) {
          console.error("Error initializing video:", error);
          if (mounted) {
            setVideoReady(false);
          }
        }
      }
    };

    initializeVideo();

    return () => {
      mounted = false;
      if (timeoutId) clearTimeout(timeoutId);
      if (videoRef.current) {
        const video = videoRef.current;
        if (video.srcObject) {
          video.srcObject = null;
          video.load();
        }
      }
    };
  }, [initialStream, isFullScreen]);

  useEffect(() => {
    if (stream) {
      const video = videoRef.current;
      if (video) {
        video.srcObject = stream;
        video.play().catch((error) => {
          console.error("Error playing video:", error);
        });
      }

      return () => {
        const video = videoRef.current;
        if (video) {
          video.srcObject = null;
        }
        stream.getTracks().forEach((track) => track.stop());
      };
    }
  }, [stream]);

  useEffect(() => {
    if (initialStream) {
      setStream(initialStream);
    }
  }, [initialStream]);

  useEffect(() => {}, [isFullScreen, videoReady, initialStream]);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const startCamera = async () => {
    try {
      if (isMobile) {
        // Create a file input element for mobile devices
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.capture = 'environment'; // Use back camera if available
        
        input.onchange = async (e) => {
          const file = (e.target as HTMLInputElement).files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
              if (event.target?.result) {
                setCapturedImageData(event.target.result as string);
                if (onCapture) {
                  onCapture(event.target.result as string);
                }
              }
            };
            reader.readAsDataURL(file);
          }
        };
        
        input.click();
        return;
      }

      if (initialStream) {
        initialStream.getTracks().forEach((track) => {
          track.stop();
        });
        onStreamChange(null);
      }

      const newStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: window.innerWidth },
          height: { ideal: window.innerHeight },
          aspectRatio: window.innerWidth / window.innerHeight
        },
      });

      onStreamChange(newStream);

      if (onCameraActive) {
        onCameraActive();
      }
    } catch (error) {
      console.error("Error in startCamera:", error);
      alert(
        "Unable to access the camera. Please check your device permissions."
      );
    }
  };

  const stopCamera = () => {
    if (initialStream) {
      initialStream.getTracks().forEach((track) => {
        track.stop();
      });

      if (videoRef.current) {
        videoRef.current.srcObject = null;
        videoRef.current.load();
      }
      onStreamChange(null);
      setVideoReady(false);
    }
  };

  const handleCameraClick = () => {
    setShowPermissionPopup(true);
  };

  const handleAllowCamera = async () => {
    setShowPermissionPopup(false);
    await startCamera();
  };

  const handleDenyCamera = () => {
    setShowPermissionPopup(false);
  };

  const handleCaptureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL("image/png");
        setCapturedImageData(imageData);
        stopCamera();
      }
    }
  };

  const handleProceed = () => {
    if (capturedImageData) {
      onCapture(capturedImageData);
    }
  };

  const handleBackClick = () => {
    stopCamera();
    if (onExitFullscreen) {
      onExitFullscreen();
    }
  };

  useEffect(() => {
    if (!isFullScreen && !initialStream) {
      setShowPermissionPopup(false);
    }
  }, [isFullScreen]);

  return (
    <div
      className={`${
        isFullScreen
          ? "absolute inset-0 z-10"
          : "w-full h-full flex items-center justify-center relative"
      }`}
    >
      {showPermissionPopup && !isFullScreen && (
        <CameraPermissionPopup
          onAllow={handleAllowCamera}
          onDeny={handleDenyCamera}
        />
      )}
      {!isFullScreen ? (
        <>
          <div className="absolute xl:top-[45%] xl:left-[25%] lg:top-[45%] lg:left-[25%] md:top-[45%] md:left-[10%] sm:top-[45%] sm:left-[5%] top-[60%] -left-[44%]">
            <div className="relative">
              <div className="xl:w-[400px] xl:h-[400px] lg:w-[400px] lg:h-[400px] md:w-[380px] md:h-[380px] sm:w-[350px] sm:h-[350px] w-[350px] h-[350px]">
                <PictureSquares size="small" />
              </div>
              <div className="w-50 h-50 absolute xl:-top-[15%] xl:left-[31%] lg:-top-[15%] lg:left-[31%] md:-top-[13%] md:left-[18%] sm:-top-[13%] sm:left-[18%] top-[13%] left-[18%]">
                <div className="w-full h-full relative">
                  <label htmlFor="camera-input">
                    <Image
                      src="/camera-icon.png"
                      alt="camera icon"
                      width={100}
                      height={100}
                      className="absolute xl:left-[10%] lg:left-[10%] md:left-[40%] sm:left-[36%] left-[36%] xl:top-[2%] lg:top-[2%] md:top-[4%] sm:top-[4%] -top-[43%] peer hover:scale-110 hover:rotate-180 hover:cursor-pointer transition-all duration-700 ease-in-out z-2 w-[80px] 2xl:w-[100px] xl:w-[100px] lg:w-[100px] md:w-[80px] sm:w-[80px]"
                      style={{ height: "auto" }}
                      onClick={handleCameraClick}
                    />
                  </label>
                </div>
              </div>
              <Image
                src="/ai-camera-text.png"
                alt="camera text"
                width={230}
                height={230}
                className="absolute xl:-top-[26%] lg:-top-[26%] md:-top-[20.5%] sm:-top-[21%] -top-[22%] xl:left-[56%] lg:left-[56%] md:left-[55%] sm:left-[56%] left-[56%] w-[170px] 2xl:w-[230px] xl:w-[230px] lg:w-[230px] md:w-[170px] sm:w-[170px]"
                style={{ height: "auto" }}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="w-full h-full relative bg-black">
          {!capturedImageData ? (
            <>
              <div className={`absolute inset-0 bg-white flex items-center justify-center transition-opacity duration-300 ${!isLoading ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                <div className="relative w-full h-full flex flex-col items-center justify-center">
                  <div className="relative w-[600px] h-[600px]">
                    <PictureSquares 
                      largeRotation="-rotate-[15deg]"
                      mediumRotation=""
                      smallRotation="rotate-[15deg]"
                      size="large"
                      isLoadingScreen={true}
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                      <Image
                        src="/camera-icon.png"
                        alt="camera icon"
                        width={100}
                        height={100}
                        className="animate-spin xl:w-[100px] lg:w-[100px] md:w-[80px] sm:w-[80px] w-[70px]"
                        style={{ height: "auto" }}
                      />
                      <div className="text-black font-semibold xl:text-sm lg:text-sm md:text-xs sm:text-xs text-[10px] xl:mt-4 lg:mt-4 md:mt-4 sm:mt-2 mt-2 text-center">
                        SETTING UP CAMERA...
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <CameraTips className={`absolute bottom-[15%] z-30 ${!isLoading ? "opacity-0 pointer-events-none" : "opacity-100"}`} textColor="text-black" />
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover transition-opacity duration-300 ${!isLoading && videoReady ? "opacity-100" : "opacity-0"}`}
                style={{
                  transform: "scaleX(-1)",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 1,
                  backgroundColor: "transparent",
                  minWidth: "100%",
                  minHeight: "100%",
                  display: "block"
                }}
              />
              {videoReady && (
                <div className="absolute top-[50%] right-[2%] transform -translate-y-1/2 z-10 flex items-center">
                  <div className="text-white mr-6">TAKE PICTURE</div>
                  <Image
                    src="/take-picture-button.png"
                    alt="take picture"
                    width={50}
                    height={50}
                    className="hover:cursor-pointer active:opacity-70 active:transform active:scale-95 transition-all duration-150"
                    style={{ height: "auto" }}
                    onClick={handleCaptureImage}
                  />
                </div>
              )}
              <CameraTips className={`absolute bottom-[15%] z-30 ${!isLoading && videoReady ? "opacity-100" : "opacity-0 pointer-events-none"}`} textColor="text-white" />
            </>
          ) : (
            <>
              <div className="absolute top-0 left-0 w-full h-full">
                <Image
                  src={capturedImageData}
                  alt="Captured"
                  width={640}
                  height={480}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-[30%] left-1/2 transform -translate-x-1/2 text-white text-xl font-medium z-20">
                GREAT SHOT!
              </div>
              <div
                className="absolute bottom-[3%] right-[2%] z-50 w-[120px] h-[46px] cursor-pointer"
                onClick={handleProceed}
              >
                <Image
                  src="/button-icon-text-proceed.png"
                  alt="proceed"
                  width={120}
                  height={120}
                  className="invert"
                  style={{ height: "auto" }}
                />
              </div>
            </>
          )}
          <div
            className="absolute bottom-[4%] left-[2%] z-50 w-[100px] h-[46px] cursor-pointer"
            onClick={handleBackClick}
          >
            <Image
              src="/button-icon-text-back.png"
              alt="back button"
              width={100}
              height={100}
              className="invert"
              style={{ height: "auto" }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CameraComponent;
