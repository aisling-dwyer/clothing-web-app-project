import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./NewOrder.css";
import api from "../../api/axiosConfig"

const API_REST_URL = "http://localhost:8090"

const NewOrder = ({ userDetails }) => {

  const navigate = useNavigate();

  const location = useLocation();
  const basketItems = location.state?.basketItems || [];


  const numItems = basketItems.length;
  const borrowedItems = basketItems.map((item) => ({
    id: item.id,
    colour: item.colour, 
    type: item.type
  }))

  const sendingItems = basketItems.map(item=>item.id)
  console.log(sendingItems);


  const today = new Date();
  const date = today.toLocaleDateString();
  const totalCost = numItems * 10;
  const userIdStr = localStorage.getItem('userId');

  const handleCompleteOrder = async () => {
  
    
    try {      
      const response = await api.post(`${API_REST_URL}/orders/${userIdStr}/create-order`, {
        clothingItemsBorrowed: sendingItems,
        numItemsOrdered: numItems
        
      },{
        headers: {
          "Authorization" : `Bearer ${localStorage.getItem('token')}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Credentials": "true"
        }}
      );
      if(response.status === 201) {
        localStorage.removeItem('basketItems');
        navigate(`/completedOrder`);
      } 
    } catch(error) {
      alert("Error : Order could not be placed, please try again")
    }
    
  }
    

  return (
    <div className="order-placed">
      <h2 className="order-title">Your Order Details</h2>
    
        <div className = "order-contents">
          <p><strong>Order Date: </strong>{date}</p>
          <p><strong>Number of Items: </strong>{numItems} </p>
          <p className="header"><strong>Item Details </strong></p>
          <ul>
            {borrowedItems.map((item, index) => (
              <li key={index}>
                <strong>Item {index + 1}: </strong>{item.id} {item.colour} {item.type}
              </li>
            ))}
          </ul>
          <p className="header"><strong>Delivery Details</strong></p>
          <p><strong>Name: </strong>{userDetails.firstName} {userDetails.lastName}</p>
          <p><strong>Address: </strong>{userDetails.address}</p>
          <p><strong>Email: </strong>{userDetails.email}</p>
          <p><strong>Phone Number: </strong>{userDetails.phone}</p>
          <br />
          <p><strong>Total Cost: </strong>€{totalCost.toFixed(2)}</p>
          <br />
          <div className = "button-box">
            <button onClick={handleCompleteOrder} className="complete-order">Complete Order</button>
          </div>
          <br />
          <br />
        </div>
      
    </div>
  );

};

export default NewOrder;
