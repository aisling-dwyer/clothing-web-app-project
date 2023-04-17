import React, { useState } from "react";
import './NewClothingItem.css';
import axios from "axios";

const client = axios.create({
    baseURL: " http://localhost:8090"
});


export const NewClothingItem = (props) => {

    const [type, setType] = useState('');
    const [size, setSize] = useState('');
    const [colour, setColour] = useState('');
    const [available, setAvailable] = useState('');
    const [url, setUrl] = useState('');
    const [clothingItems, setClothingItems] = useState([]);

    //Post with Axios
    const addClothingItem = async(type, size, colour, available, url) => {
        let response = await client.post('/clothingItems/addclothingitem', {
           type: type,
           size: size,
           colour: colour,
           available: available,
           url: url
        });
        setClothingItems((clothingItem) => [response.data, ...clothingItems]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addClothingItem(type, size, colour, available, url);
    };

    return(
        <div className="new-item-form-container">
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
    );

    
};

export default NewClothingItem;
