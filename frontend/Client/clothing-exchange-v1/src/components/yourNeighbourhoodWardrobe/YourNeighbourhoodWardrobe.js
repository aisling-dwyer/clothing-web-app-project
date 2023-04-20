import React, { useState } from 'react';


const YourNeighbourhoodWardrobe = (props) => {

    const { clothingItems } = props;
    // const [showMessage, setShowMessage] = useState(null);
    const handleAdd = (clothingItem) => {
        
        const clothingItemIdString = JSON.stringify(clothingItem.id);
        
        let basketItems = JSON.parse(localStorage.getItem("basketItems")) || [];

       
        const itemExists = basketItems.find(
            (item) => (((JSON.stringify(item.id)) === clothingItemIdString) 
                        && (item.type === clothingItem.type) 
                        && (item.size === clothingItem.size)
                        && (item.colour) === clothingItem.colour));
        if(itemExists) {
            alert("This item is already in your basket");
    
        } else {
            basketItems.push({...clothingItem, qty: 1});
            localStorage.setItem("basketItems", JSON.stringify(basketItems));
            // setShowMessage(null);
        }
        
    }

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
                        <button onClick={() => handleAdd(clothingItem)}>Add To Basket</button>
                        {/* {showMessage && <p>{showMessage}</p>} */}
                    </div>
                );
            })}     

        </div>
    )
}

export default YourNeighbourhoodWardrobe;