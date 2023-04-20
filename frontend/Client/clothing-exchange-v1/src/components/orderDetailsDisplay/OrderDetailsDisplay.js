import React from "react";

const OrderDetailsDisplay = ({ orderDetails }) => {
    return (
        <div>
            {orderDetails && orderDetails.map((order, index) => {
            return (
                <div key={index}>
                    <p>Date: {order.orderDate}</p>
                    <p>Number of Items Ordered: {order.numItemsOrdered}</p>
                    {/* <p>Items Borrowed by ID: {order.clothingItemsBorrowed}</p> */}
                    <p>Total cost: €{order.amount}</p>
                </div>
            )
        })}
    </div>
    )
};

export default OrderDetailsDisplay;