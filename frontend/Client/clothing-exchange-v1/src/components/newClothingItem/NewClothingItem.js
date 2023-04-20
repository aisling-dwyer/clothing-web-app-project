import React, { useState } from "react";
import './NewClothingItem.css';

const NewClothingItem = ({ addClothingItem }) => {
    const [type, setType] = useState('');
    const [size, setSize] = useState('');
    const [colour, setColour] = useState('');
    const [available, setAvailable] = useState('');
    const [url, setUrl] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false); 

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            addClothingItem(type, size, colour, available, url);
            setSuccess(true);
        } catch(error) {
            setErrMsg("Item could not be added to your account, please try again");
        }
        
        
    };

    return(
        <div className="new-item-form-container">
            {success ? (
                <div>
                    <h1>Your Clothing Item has been successfully added to your account</h1>
                    <br />
                </div>
            ) : (
                <div>
                    {errMsg && (<p className="error">{errMsg}</p>
                    )}
                    <h2>Add New Clothing Item To Your Wardrobe</h2>
                    <form className="new-item-form" onSubmit={handleSubmit}>
                        <label htmlFor="type">Item Type: </label>
                        <input value={type} onChange={(e) => setType(e.target.value)} type="text" id="type" name="type"/>

                        <label htmlFor="size">Item Size: </label>
                        <input value={size} onChange={(e) => setSize(e.target.value)} type="text" id="size" name="size"/>

                        <label htmlFor="colour">Item Colour: </label>
                        <input value={colour} onChange={(e) => setColour(e.target.value)} type="text" id="colour" name="colour"/>

                        <label htmlFor="available">Available: </label>
                        <input value={available} onChange={(e) => setAvailable(e.target.value)} type="text" id="available" name="available"/>

                        <label htmlFor="image-url">Image url: </label>
                        <input value={url} onChange={(e) => setUrl(e.target.value)} type="url" id="url" name="url"/>

                        <button className = "submit-btn" type="submit">Add Item</button>

                     </form>  
                </div>
            )}
            
             
        </div> 
    );

    
};

export default NewClothingItem;
