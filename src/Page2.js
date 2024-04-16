import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';

const CameraComponent = () => {
  const webcamRef = useRef(null);
  const navigate = useNavigate();
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  const captureAndNavigate = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      await sendImageToBackend(imageSrc);
    }
    navigateToAnotherRoute(); // Always navigate after capturing
  };

  const sendImageToBackend = async (imageSrc) => {
    try {
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageSrc }),
      });

      if (response.ok) {
        console.log('Image uploaded successfully');
        setIsImageUploaded(true);
      } else {
        console.error('Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const navigateToAnotherRoute = () => {
    navigate('/Page3');
  };
    useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        // Assuming the button has an id or unique selector
        const button = document.getElementById('myButton');
        if (button) {
          button.click();
        }
      }
    };

    // Add event listener for key press
    document.addEventListener('keydown', handleKeyPress);

    // Clean up event listener when component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []); // Empty dependency array means this effect runs only once after the component mounts

  const handleClick = () => {
    // Handle button click
    console.log('Button clicked!');
  };

  return (
    <div>
      <div>
      <h1 style={{textAlign:'center', padding:0}}>
      Create examples of what a sandwich or pizza looks like using the available ingredients and toppings.
                </h1>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center'}}>
        <Webcam style={{top:0, width: '60%', height: '60%', justifyContent: 'center'}}
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={640}
          height={480}
        />
      </div>
      <div>
        <h1 style={{textAlign:'center', padding:0, marginBottom: '10px'}}>
      Tap the “Train” button once you feel ready to feed the created dataset into the computer.
                </h1>
      </div>        

      <button id="myButton" onClick={captureAndNavigate}></button>
      {isImageUploaded && (
        <Link to="/Page3"></Link>
      )}
    </div>
  );
};

export default CameraComponent;
