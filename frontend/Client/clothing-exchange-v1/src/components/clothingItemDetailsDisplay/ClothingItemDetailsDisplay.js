import React, { useState } from "react";
import api from '../../api/axiosConfig';
import "./ClothingItemDetailsDisplay.css";
const API_REST_URL = "http://localhost:8090"

const ClothingItemDetailsDisplay = ({ yourClothingItems }) => {

    let itemIdStr = "";
  
    const removeItem = async (clothingItem) => {
        try {
          const token = localStorage.getItem('token');
          const userIdStr = localStorage.getItem('userId');
          itemIdStr = clothingItem.id;
          console.log(itemIdStr)
          const response = await api.delete(`${API_REST_URL}/clothingitems/user/${userIdStr}/delete-item/${itemIdStr}`, 
          {
            headers: {
              Authorization : `Bearer ${token}`,
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "http://localhost:3000",
              "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH",
              "Access-Control-Allow-Headers": "*",
              "Access-Control-Allow-Credentials": "true"
            }
            
          });
          window.location.reload();
          alert("Your item has been successfully removed.")
    
        } catch(err) {
            console.log(err);
    
        }
      }
    return (
        <div>
            
            {yourClothingItems && yourClothingItems.map((clothingItem, index) => {
                const timestamp = clothingItem.dateAdded;
                const parts = timestamp.split(" ");
                parts.splice(0,1);
                parts.splice(2,2);
                const formattedDate = parts.join(" ")
                   
                return (
                  
                    <div key={index} className = "clothing-item">
                        <div className = "item-image2">
                          <img src={clothingItem.image} alt={clothingItem.type}></img>
                        </div>
                        <div className = "item-adjuncts2">
                          
                          
                          <p className = "item-title">Clothing Item {index+1}:</p>
                          <p><strong>Item Id: </strong>{clothingItem.id}</p>
                          <p><strong>Type: </strong>{clothingItem.type}</p>
                          <p><strong>Size: </strong>{clothingItem.size}</p>
                          <p><strong>Colour: </strong>{clothingItem.colour}</p>
                          <p><strong>Date Uploaded: </strong>{formattedDate}</p>
                          {/* <button onClick = {() => editItem(clothingItem)}>Edit Item Details</button> */}
                          <button onClick = {() => removeItem(clothingItem)}>Remove Item</button>
                        </div>
                      
                   
                  </div>
                );
            })}            
        </div>
    );
};

export default ClothingItemDetailsDisplay;