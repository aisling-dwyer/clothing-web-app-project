import React from 'react';
import ClothingItemDetailsDisplay from '../clothingItemDetailsDisplay/ClothingItemDetailsDisplay.js';
import NewClothingItem from '../newClothingItem/NewClothingItem.js';
import OrderDetailsDisplay from '../orderDetailsDisplay/OrderDetailsDisplay.js';
import UserDetailsDisplay from '../userDetailsDisplay/UserDetailsDisplay.js';
import "./YourAccount.css";


const YourAccount = ({yourClothingItems, userDetails, orderDetails, addClothingItem}) => {

    const storedToken = localStorage.getItem('token');

    if (!storedToken) {
        return (
          <div className = "reroute4">
            <p>Please <a className = "reroute" href="/login">log in</a> to access your account.</p>
            <br />
            <p>New user? Create an account <a className = "reroute" href="/register">here.</a></p>
          </div>
        );
    }

    return (
        <div className="account-style">
                <h2 className = "page-titles">Your Account</h2>

                <UserDetailsDisplay userDetails = { userDetails }/>

                <h4 className="component-titles-your-items">Your Uploaded Clothing Items</h4>
                <ClothingItemDetailsDisplay yourClothingItems = { yourClothingItems} /> 
    
                <NewClothingItem addClothingItem={ addClothingItem }/>
            
                <h3 className="component-titles-orders">Your Order History</h3>
                <OrderDetailsDisplay orderDetails = { orderDetails }/>
        </div>
        
    );
};

export default YourAccount;