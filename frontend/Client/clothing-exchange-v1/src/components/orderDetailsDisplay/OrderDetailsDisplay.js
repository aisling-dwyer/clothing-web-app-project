import React from "react";

const OrderDetailsDisplay = ({ order }) => {
    return (
        <div>
            <h2>Your Order History</h2>
            <p>Date: {order.orderDate}</p>
            <p>Number of Items Ordered: {order.numItemsOrdered}</p>
            <p>Items Borrowed by ID: {order.clothingItemsBorrowed}</p>
            <p>Total cost: {order.amount}</p>
        </div>
    );
};

export default OrderDetailsDisplay;