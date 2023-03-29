import React from 'react';
import './CarouselFeature.css';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';

const CarouselFeature = ({clothingitems}) => {
    return (
        <div className = 'clothingitems-carousel-container'>
            <Carousel>
                {
                    clothingitems?.map((clothingitem) => {
                        return(
                            <Paper>
                                <div className = 'clothingitem-card-container'>
                                    <div className = "clothingitem-card">
                                        <div className = "clothingitem-img">
                                            <img src={clothingitem.url}></img>
                                        </div>

                                    </div>
                                </div>
                            </Paper>
                        )
                    })
                }
            </Carousel>
        </div>
    )
}

export default CarouselFeature;