import React from "react";

const ClothingItemDetailsDisplay = ({ yourClothingItems }) => {
    return (
        <div>
            
            {yourClothingItems && yourClothingItems.map((clothingItem, index) => {
                return (
                    <div key={index}>
                        <p>Type: {clothingItem.type}</p>
                        <p>Size: {clothingItem.size}</p>
                        <p>Colour: {clothingItem.colour}</p>
                        <p>Available to lend: {clothingItem.available}</p>
                        <img src={clothingItem.url} alt={clothingItem.type}></img>
                    </div>
                );
            })}            
        </div>
    );
};

export default ClothingItemDetailsDisplay;