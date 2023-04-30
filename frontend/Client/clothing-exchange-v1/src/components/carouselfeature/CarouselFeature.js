import React, { useState } from 'react';
import './CarouselFeature.css';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';

const CarouselFeature = ({ clothingitems }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % clothingitems.length);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex(
      currentImageIndex === 0 ? clothingitems.length - 1 : currentImageIndex - 1
    );
  };

  return (
    <div className='clothingitems-carousel-container'>
      <Carousel autoPlay = {false} navButtonsAlwaysVisible index={currentImageIndex} onChange={(index) => setCurrentImageIndex(index)}>
         
        {clothingitems?.map((clothingitem) => {
          return (

            <Paper key={clothingitem.id}>
            <div className='clothingitem-card-container'>
            <p><br />Here are some of the clothing items available to borrow from our community</p>
              <div className='clothingitem-card'>
                <div className='clothingitem-img'>
                  <img src={clothingitem.image} alt='clothing item'></img>
                </div>
              </div>
            </div>
          </Paper>
        );
      })}
    </Carousel>
  </div>
);
};

export default CarouselFeature;
