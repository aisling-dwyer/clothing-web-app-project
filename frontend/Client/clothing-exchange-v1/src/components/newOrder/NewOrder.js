import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./NewOrder.css";

const NewOrder = ({ userDetails }) => {
  const location = useLocation();
  const basketItems = location.state?.basketItems || [];
  const [orderDetails, setOrderDetails] = useState({
    orderDate: new Date(),
    numItems: basketItems.length,
    borrowedItems: basketItems.map((item) => ({
      colour: item.colour,
      type: item.type,
    })),
  });

  const getNewOrderItemsFromLocalStorage = () => {
    try {
      const items = localStorage.getItem("newOrderItems");
      if (items) {
        return JSON.parse(items);
      }
      return [];
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const [newOrderItems, setNewOrderItems] = useState(getNewOrderItemsFromLocalStorage());

  const saveNewOrderItemsToLocalStorage = (newOrderItems) => {
    localStorage.setItem('newOrderItems', JSON.stringify(newOrderItems));
  };

  useEffect(() => {
    saveNewOrderItemsToLocalStorage(newOrderItems);
  }, [newOrderItems]);

  const totalCost = orderDetails.numItems * 10;

  const navigate = useNavigate();

  const handleCompleteOrder = () => {
    saveNewOrderItemsToLocalStorage(newOrderItems);
    navigate(`/completedOrder`);
  }

  return (
    <div>
      <h1 className="title">Your Order Details</h1>
      {orderDetails ? (
        <>
          <p>Order Date: {orderDetails.orderDate.toString()}</p>
          <p>Number of Items: {orderDetails.numItems} </p>
          <p className="header">Item Details </p>
          <ul>
            {orderDetails.borrowedItems.map((item, index) => (
              <li key={index}>
                Item {index + 1}: {item.colour} {item.type}
              </li>
            ))}
          </ul>
          <p className="header">Delivery Details</p>
          <p>Name: {userDetails.firstName} {userDetails.lastName}</p>
          <p>Address: {userDetails.address}</p>
          <p>Email: {userDetails.email}</p>
          <p>Phone Number: {userDetails.phone}</p>
          <br />
          <p>Total Cost: €{totalCost.toFixed(2)}</p>
          <br />
          <button onClick={handleCompleteOrder}>Complete Order</button>
          <br />
          <br />
        </>
      ) : (
        <p>Loading Your Order Details...</p>
      )}
    </div>
  );
};

export default NewOrder;
