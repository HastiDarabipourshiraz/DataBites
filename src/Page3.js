import React, { useEffect, useState } from "react";
import axios from "axios";
import ImageGrid from "./ImageGrid";
import { Link } from 'react-router-dom';

const ImageGallery = () => {
  const [images1, setImages1] = useState([]);
  const [images2, setImages2] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response1 = await axios.get("https://jsonplaceholder.typicode.com/photos?_limit=20");
        const response2 = await axios.get("https://jsonplaceholder.typicode.com/photos?_start=20&_limit=20");
        setImages1(response1.data);
        setImages2(response2.data); 
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchImages();
  }, []);
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
  const verticalLineStyle = {
    borderLeft: '50px solid black', // Adjust thickness and color as needed
    height: '100%' // Adjust height as needed
  };

  return (
    <div >
      <div style={{textAlign:'center', padding:0}}>
        <h1>Based on your dataset, the computer has classified these images as sandwiches or pizzas.</h1>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <h2 style={{textAlign:'center', padding:0}}>Pizzas</h2>
          <ImageGrid images={images1} />
        </div>
        <div style={verticalLineStyle}></div>
        <div style={{ flex: 1 }}>
          <h2 style={{textAlign:'center', padding:0}}>Sandwiches</h2>
          <ImageGrid images={images2} />
        </div>
      </div>
      <div style={{textAlign:'center', padding:0}}>
        <h1>Tap the “Refresh” button to test out a new dataset.</h1>
      </div>
      <div>
        <Link to="/Page1">
            <button id="myButton"> </button>
        </Link>
        </div>
    </div>
  );
};


export default ImageGallery;
