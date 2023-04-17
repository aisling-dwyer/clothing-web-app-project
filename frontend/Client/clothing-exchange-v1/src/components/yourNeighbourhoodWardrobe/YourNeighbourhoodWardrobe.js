import React from 'react';

const YourNeighbourhoodWardrobe = (props) => {
    const { clothingItems, onAdd } = props;
    return (
        <div>
            <h1>Your Neighbourhood Wardrobe</h1>
            <h3>Clothes Available to Borrow</h3>
            {clothingItems && clothingItems.map((clothingItem, index) => {
                return (
                    <div key={index}>
                        <p>Type: {clothingItem.type}</p>
                        <p>Size: {clothingItem.size}</p>
                        <p>Colour: {clothingItem.colour}</p>
                        {/* <p>Available: {clothingItem.available}</p> */}
                        <img src={clothingItem.url} alt={clothingItem.type}></img>
                        <button onClick={() => onAdd(clothingItem)}>Add To Basket</button>
                    </div>
                );
            })}     

        </div>
    )
}

export default YourNeighbourhoodWardrobe;