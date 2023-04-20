import React from "react";


const UserDetailsDisplay = ({ userDetails }) => {

    return(
        <div>
            <h2>Your Account Details</h2>
            {userDetails ? (
                <>
                    <p>Name: {userDetails.firstName} {userDetails.lastName}</p>
                    <p>Username: {userDetails.userName}</p>
                    {/* <p>Password: {userDetails.password}</p> */}
                    <p>Email: {userDetails.email}</p>
                    <p>Address: {userDetails.address}</p>
                    <p>Phone: {userDetails.phone}</p>
                    <p>User ID: {userDetails.id}</p>
                    
                    {/* <button onClick={editUserDetails}>
                        Edit User Details
                    </button> */}
                </>
            ) : (
                <p>Loading user details...</p>
            )}
        </div>
    );
};

export default UserDetailsDisplay;