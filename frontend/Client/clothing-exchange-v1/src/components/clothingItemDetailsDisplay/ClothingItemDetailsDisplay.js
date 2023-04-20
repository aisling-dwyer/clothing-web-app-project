import React from "react";
import api from '../../api/axiosConfig';
const API_REST_URL = "http://localhost:8090"

const ClothingItemDetailsDisplay = ({ yourClothingItems }) => {
    
    
    const removeItem = async (clothingItem) => {
        try {
            const userIdString = "6436b250a869e1350b08d4cd";
          const itemIdString = "643e3ced02b3fd291a383cb3";
          const response = await api.delete(`${API_REST_URL}/clothingitems/user/${userIdString}/delete-item/${itemIdString}`, {
            headers: {
              // headers: { Authorization : `Basic ${token}` }
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "http://localhost:3000",
              "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH",
              "Access-Control-Allow-Headers": "*",
              "Access-Control-Allow-Credentials": "true"
            }
            
          })
          // console.log(token);
          console.log(response.data);
     
    
        } catch(err) {
            console.log(err);
    
        }
      }
    return (
        <div>
            
            {yourClothingItems && yourClothingItems.map((clothingItem, index) => {
                const itemIdString2 = JSON.stringify(clothingItem.id.timestamp);

                return (
                    <div key={index}>
                        <p>Clothing Item {index+1}:</p>
                        <p>Item Id: {itemIdString2}</p>
                        <p>Type: {clothingItem.type}</p>
                        <p>Size: {clothingItem.size}</p>
                        <p>Colour: {clothingItem.colour}</p>
                        <p>Available to lend: {clothingItem.available}</p>
                        <img src={clothingItem.url} alt={clothingItem.type}></img>
                        {/* <button onClick = {() => editItem(clothingItem)}>Edit Item Details</button> */}
                        <button onClick = {() => removeItem(clothingItem)}>Remove Item</button>
                    </div>
                );
            })}            
        </div>
    );
};

export default ClothingItemDetailsDisplay;