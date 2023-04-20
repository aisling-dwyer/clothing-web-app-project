import React, { useState } from "react";
import { useLocation } from "react-router-dom";


const CompletedOrder = ({ userDetails }) => {

    const location = useLocation();
    const newOrderItems = location.state?.newOrderItems || [];
    const [completedOrderDetails, setcompletedOrderDetails] = useState({
        orderDate: new Date(),
        numItems: newOrderItems.length,
        borrowedItems: newOrderItems.map((item) => ({
        colour: item.colour,
        type: item.type,
        })),
    });

    console.log(JSON.stringify(completedOrderDetails));

  return (
    <div>
      <h1 className = "title" >Your Order has been Successful!</h1>
      <h2>Your Order Summary</h2>
      {completedOrderDetails ? (
        <>
          <p>Order Date: {completedOrderDetails.orderDate.toString()}</p>
          <p>Number of Items: {completedOrderDetails.numItems} </p>
          <p className="header">Item Details </p>
          <ul>
            {completedOrderDetails.borrowedItems.map((item, index) => (
              <li key={index}>
                Item {index+1}: {item.colour} {item.type}
              </li>
            ))}
          </ul>
          <p className="header">Delivery Details</p>
          <p>Name: {userDetails.firstName} {userDetails.lastName}</p>
          <p>Address: {userDetails.address}</p>
          <p>Email: {userDetails.email}</p>
          <p>Phone Number: {userDetails.phone}</p>
          <br/>
          <p>Total Amount Paid: €{(completedOrderDetails.numItems*10).toFixed(2)}</p>
          <h3>You can expect your order to be delivered within 5 to 10 working days</h3>
        </>
      ) : (
        <p>Loading Your Order Details...</p>
      )}
    </div>
  );
};

export default CompletedOrder;
