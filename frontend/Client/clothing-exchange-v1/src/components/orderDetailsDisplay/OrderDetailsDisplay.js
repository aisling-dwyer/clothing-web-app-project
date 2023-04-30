import React from "react";
import "./OrderDetailsDisplay.css"
import api from "../../api/axiosConfig"

const API_REST_URL = "http://localhost:8090";


const OrderDetailsDisplay = ({ orderDetails }) => {
   

    return (
        <div className = "orders">
          {orderDetails && orderDetails.map((order, index) => {
                 const timestamp = order.orderDate;
                 const parts = timestamp.split(" ");
                 parts.splice(0,1);
                 parts.splice(2,2);
                 const formattedDate = parts.join(" ");
                
            return (
                <div key={index} className="order-divider">
                    <ul className = "order-list">
                        <li><strong>Date:</strong> {formattedDate}</li>
                        <li><strong>Number of Items Ordered:</strong> {order.numItemsOrdered}</li>
                        <li><strong>Item(s) Borrowed by ID: </strong>{order.clothingItemsBorrowed === null? "" : order.clothingItemsBorrowed.toString()}</li>
                        <li><strong>Total cost: </strong>€{order.amount}</li>
                    </ul>
                </div>
            )
        })}
    </div>
    )
};

export default OrderDetailsDisplay;