import React, { useState } from 'react';
import "./YourNeighbourhoodWardrobe.css";

const YourNeighbourhoodWardrobe = (props) => {

    const storedToken = localStorage.getItem('token');
    console.log(storedToken);

    if (!storedToken) {
        return (
            <div className = "reroute5">
                <p>Please <a className = "reroute" href="/login">log in</a> to access your account.</p>
                <br />
                <p>New user? Create an account <a className = "reroute" href="/register">here.</a></p>
          </div>
        );
    }

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
        <div className = "external-container">
            <h2 className="page-titles">Your Neighbourhood Wardrobe</h2>
            <h3 className = "component-titles2">Clothes Available to Borrow</h3>
            <div className = "inside-container">
                {clothingItems && clothingItems.map((clothingItem, index) => {
                    let isMatching = false;
                    if(clothingItem.userId === localStorage.getItem('userId')) {
                        isMatching = true;
                    }; 
                    console.log(clothingItem.userId)
                    console.log(localStorage.getItem('userId'))
                    return (
                        <div key={index} className = "item-container" style={{display: isMatching ? 'none' : 'block'}}>
                            
                            <div className = "item-image">
                                <img src={clothingItem.image} alt={clothingItem.type}></img>
                            </div>
                            <div className = "item-adjuncts">
                                <div className = "item-description">
                                    <p>Type: {clothingItem.type}</p>
                                    <p>Size: {clothingItem.size}</p>
                                    <p>Colour: {clothingItem.colour}</p>
                                    {/* <p>Available: {clothingItem.available}</p> */}
                                </div>
                                <div className="basket-button">
                                    <button onClick={() => handleAdd(clothingItem)}>Add To Basket</button>
                                </div>
                            </div>
                        </div>
                    );
                })}     
            </div>
        </div>
    )
}

export default YourNeighbourhoodWardrobe;