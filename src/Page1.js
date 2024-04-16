// Page1.js
import React from 'react';
import { Link } from 'react-router-dom';
import  { useEffect } from 'react';
import image1 from './bg.jpg'

const Page1 = () => {
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
                <h1 style={{textAlign:'center', padding:30, marginBottom: '10px'}}>
                  Welcome to DataBites! Explore the world of machine learning, where computers learn
from examples to identify patterns, empowering them to make informed decisions.
                </h1>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img src={image1} alt='img1' style={{ display: 'block', width: '45vw', height: 'auto'}}></img>
              </div>
              <div>
                <h1 style={{textAlign:'center', padding:30, marginBottom: '10px'}}>Tap the “Start” button to begin creating a dataset.</h1></div>
              <div>
        <Link to="/Page2">
            <button id="myButton" ></button>
        </Link>
        </div>
      </div>
    );
  };
  
  

export default Page1;
