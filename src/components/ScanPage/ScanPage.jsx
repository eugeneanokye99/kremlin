import React from 'react';
import Webcam from 'react-webcam';
import './ScanPage.css'; 

function ScanPage() {
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(
    () => {
      const imageSrc = webcamRef.current.getScreenshot();
      console.log(imageSrc);
    },
    [webcamRef]
  );

  const videoConstraints = {
    width: { min: 480 },
    height: { min: 720 },
    aspectRatio: 0.3,
    facingMode: "user"
  };
  
  return (
    <div className="camera-container">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="webcam"
        width={480} 
        height={720} 
        videoConstraints={videoConstraints}
      />
      <button className="capture-button" onClick={capture}>Capture</button>
    </div>
  );
}

export default ScanPage;
