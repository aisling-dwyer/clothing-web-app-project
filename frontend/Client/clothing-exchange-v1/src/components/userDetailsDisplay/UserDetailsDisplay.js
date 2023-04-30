import React from "react";
import "./UserDetailsDisplay.css";

const UserDetailsDisplay = ({ userDetails }) => {

    return(
        <div className = "form-container">
            <h4 className="component-titles-user">Your Account Details</h4>
            {userDetails ? (
                <ul className = "list"> 
                    <li><strong>Name: </strong>{userDetails.firstName} {userDetails.lastName}</li>
                    <li><strong>Username: </strong>{userDetails.userName}</li>
                    {/* <p>Password: {userDetails.password}</p> */}
                    <li><strong>Email: </strong>{userDetails.email}</li>
                    <li><strong>Address: </strong>{userDetails.address}</li>
                    <li><strong>Phone: </strong>{userDetails.phone}</li>
                    <li><strong>User ID: </strong>{userDetails.id}</li>
                    
                    {/* <button onClick={editUserDetails}>
                        Edit User Details
                    </button> */}
                </ul>
            ) : (
                <p>Loading user details...</p>
            )}
        </div>
    );
};

export default UserDetailsDisplay;
