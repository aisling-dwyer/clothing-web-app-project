import React from 'react';
import './Info.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShirt } from "@fortawesome/free-solid-svg-icons";

const Info = () => {
    return (
            <div className = "info-title">
                <div className = "Brand-Style">
                    <h1>Your Friendly Neighbourhood Wardrobe</h1>
                    <FontAwesomeIcon icon={faShirt} style={{ color: "#F01D7F", fontSize: "3rem" }}/>
                </div>
                <div className = "Info-Style">
                    <div className = "text">
                        <h4 className = "strong">Welcome to YFNW</h4>
                        <h4 className="normal">We are an online marketplace where people can borrow and lend women’s occasion wear.</h4>
                        <br />
                        <h5>You may like to create an account with us if you:</h5>
                        <br />
                        <ul>
                            <li className="info"><FontAwesomeIcon icon={faShirt} style={{ color: "#F01D7F", fontSize: "1rem" }}/>  &nbsp; Love fashion</li>
                            <li className="info"><FontAwesomeIcon icon={faShirt} style={{ color: "#F01D7F", fontSize: "1rem" }}/>  &nbsp; Have a calendar full of weddings and occasions</li>
                            <li className="info"><FontAwesomeIcon icon={faShirt} style={{ color: "#F01D7F", fontSize: "1rem" }}/>  &nbsp; Don't like purchasing a new outfit every time</li>
                            <li className="info"><FontAwesomeIcon icon={faShirt} style={{ color: "#F01D7F", fontSize: "1rem" }}/>  &nbsp; Want to move away from supporting the 'fast fashion' industry</li>
                        </ul>
                    </div>
                </div>
            </div>
    
    );
};

export default Info;