import React from 'react';
import ClothingItemDetailsDisplay from '../clothingItemDetailsDisplay/ClothingItemDetailsDisplay.js';
import NewClothingItem from '../newClothingItem/NewClothingItem.js';
import OrderDetailsDisplay from '../orderDetailsDisplay/OrderDetailsDisplay.js';
import UserDetailsDisplay from '../userDetailsDisplay/UserDetailsDisplay.js';


const YourAccount = ({yourClothingItems, userDetails, orderDetails, editItem, removeItem, addClothingItem}) => {

    return (
        <div className="account-style">
            <h1>Your Account</h1>

                <UserDetailsDisplay userDetails = { userDetails }/>

                <h2>Your Uploaded Clothing Items</h2>
                <ClothingItemDetailsDisplay yourClothingItems = { yourClothingItems} /> 
    
                <NewClothingItem addClothingItem={ addClothingItem }/>
            
                <h2>Your Order History</h2>
                <OrderDetailsDisplay orderDetails = { orderDetails }/>
        </div>
        
    );
};

export default YourAccount;