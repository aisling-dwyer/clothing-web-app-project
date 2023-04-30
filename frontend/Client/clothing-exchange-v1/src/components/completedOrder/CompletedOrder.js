import React, { useState } from "react";
import "./CompletedOrder.css"

const CompletedOrder = ({ userDetails }) => {



  return (
    <div>
      <h3 className = "title" >{userDetails.firstName}, your Order has been successful!</h3>

          <h3>You can expect your order to be delivered within 5 to 10 working days</h3>
          <p>
              <a className = "reroute2" href="./YourAccount/yourAccount">Go Back To Your Account</a>
          </p>
    
    </div>
  );
};

export default CompletedOrder;
