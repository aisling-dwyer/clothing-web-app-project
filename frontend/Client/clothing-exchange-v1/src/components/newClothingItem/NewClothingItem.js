import React, { useState } from "react";
import './NewClothingItem.css';
// import Uploader from "../uploader/Uploader";

const NewClothingItem = ({ addClothingItem }) => {
    const [type, setType] = useState('');
    const [size, setSize] = useState('');
    const [colour, setColour] = useState('');
    const [available, setAvailable] = useState(true);
    // const [jpeg, setJpeg] = useState('');
    const [image, setImage] = useState('');
    // const [file, setFile] = useState(null);
    // const [uploadURL, setUploadURL] = useState(null);
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false); 
    const [isChecked, setIsChecked] = useState(false);
    const [isJumpsuit, setIsJumpsuit] = useState(false);
    const [isDress, setIsDress] = useState(false);

    let filename = "";
    let uploadURL = "";

    const handleAvailableCheckboxChange = () => {
        setIsChecked(!isChecked);
        setAvailable(true)
        console.log(available);
    }

    const handleDressChange = () => {
        
        setIsDress(!isDress);
        if(!isDress) {
            setType("")
        } else {
            setIsJumpsuit(false);
            setType("dress")
        }

        console.log(type.toString())

    }

    const handleJumpsuitChange = () => {
        
        setIsJumpsuit(!isJumpsuit);
        if(!isJumpsuit) {
            setType("")
        } else {    
            setIsDress(false);
            setType("jumpsuit")
        }
        console.log(type.toString())
    }





        //get the response of the API endpoint - first part, "uploadURL" this is the url where to upload the image, second part is the key for the image on S3 "filename"
    const API_ENDPOINT_getS3 = "https://2d2w7dvrf4.execute-api.eu-west-1.amazonaws.com/default/GetPresignedURL-1";

    const getUploadURL = async() => {
        const response = await fetch(API_ENDPOINT_getS3);
        const responseData = await response.json();
        uploadURL = responseData.uploadURL;
        filename = responseData.filename;
        // console.log(uploadURL)
        // console.log(filename)
     
    }

    

    const handleImageUpload = async (e) => {
        await getUploadURL();
        //console.log(e)
        const selectedFile = e.target.files[0];
        console.log(selectedFile);
            //https://new-clothing-item-bucket.s3.eu-west-1.amazonaws.com/5008626?AWSAccessKeyId=ASIAX66ZJIZIVQXFY3UR&Content-Type=image%2Fjpeg&Expires=1682483941&Signature=%2BmpuG7JEDTQ6%2FyCHFdCQze2YMh0%3D&X-Amzn-Trace-Id=Root%3D1-644835b5-5047f3882bb50e0721c53580%3BParent%3D226318485c5d3537%3BSampled%3D0%3BLineage%3D1dac54cc%3A0&x-amz-security-token=IQoJb3JpZ2luX2VjEBUaCWV1LXdlc3QtMSJGMEQCIDT6gC1p%2FWOzjOf9uYtP1BZYynx1mL3MoqY%2Bw%2FFoxGh3AiAtOddFP4kA5UfeaeU9k%2BUK5CbyKjdt1SCheQbd7iT0eir2AggdEAAaDDU0NzUyNzE0OTEzNyIMVy5Ofcd74O2qQl0sKtMC9tMJiMy4XFspucdGua15T8YpbB%2F0pbX3hpPU7ht1mJhhcJmpEqzb%2FvMpFuJUCf1e7M0gFClYJKESKbjUwIwHsYtb73YsGyi7pMSEpVImt0RYB%2Bu5T0EFz0mZ4ew5fmWBKInTgR9gpGo5EQNygV3kObFN4C9%2BRRJc%2BvfEfxSW%2FwyKN0y3kL4l%2Fr%2FZQNpYdf6HVjnLrQ7Nop%2FofpDWQQwGkC3fEBnfpXc1IaY4T1gx2IVWB568CfJWXC%2BSUciYjn7J01IdYljY2%2BRfgAMlI1t9bZuGjyrZ2pHAT1s8ZtCVkTs4Lrb8rT9bmoOTdx9DH8WD1xcD%2FaZDC4SRMN9Y2rss7tdSu6N9YsM%2BDEAjJV7R8YfrmOiSS%2BVoaWmtSw0F603m3ZzRisC5wQTxnSoa%2B9H9kPa5lzfHa3qejDh6j4K5zCrYcxtWYGnIx4FeGejfzum9WKM2MLnpoKIGOp8BN1TGpV6aosSiSibdMWVWp4CI%2Fn%2Bm4bIp1%2BMPTp9quRJlK8RG87OECNlhGOZuuYLHGx3XZaBGS0DIJ5P26M6NLKk9IQySZZlW4bLBzEkvVO1hf%2FgE4yPJ7%2B5QTvVgOyPzkKMUDEJ1BMPBFBci83RGizlDyJFh3pYcg9blqJUxO2K1vFkp00BKFYNBDenMtv5KiVB1dI034K655ybp%2Br91
        
        const jpegFile = await selectedFile.slice(0, selectedFile.size, 'image/jpeg');
        console.log(jpegFile)

        const uploadResponse = await fetch(uploadURL, {
            method: "PUT",
            body: jpegFile 
            }, 
            { 
              headers: {
                "Authorization" : `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Access-Control-Allow-Methods": "GET, PUT",
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Credentials": "true"
                }
            }
        );
        const uploadUrlNoParam = (uploadResponse.url.split('?'))[0]
        console.log(uploadUrlNoParam)


        setImage(uploadUrlNoParam);
        console.log(image)
        
      }

      const handleSubmit = (e) => {
        e.preventDefault();
        try {
            addClothingItem(type, size, colour, available, image);
            setSuccess(true);  
            window.location.reload()     
        } catch(error) {
            setErrMsg("Item could not be added to your account, please try again");
        }
    };
    

    return(
        <div className="new-item-form-container">
            {success ? (
                <div>
                    <h3>Your Clothing Item has been successfully added to your account</h3>
                    <br />
                </div>
            ) : (
                <div>
                    {errMsg && (<p className="error">{errMsg}</p>
                    )}
                    <h4 className="component-titles">Add New Clothing Item To Your Wardrobe</h4>
                    <form className="new-item-form" onSubmit={handleSubmit}>
                            
                            <label htmlFor="type"><strong>Item Type: </strong></label>
                            <input value={type} onChange={(e) => setType(e.target.value)} type="text" id="type" name="type"/>
                        
                        {/* <label htmlFor="dress">
                            Dress
                            <input 
                                value={type} 
                                checked = {isDress}
                                onChange={handleDressChange} 
                                type="checkbox" 
                                id="type-dress" 
                                name="type-dress"
                            />
                        </label>
                        <label htmlFor="jumpsuit">
                            Jumpsuit
                            <input 
                                value={type} 
                                checked = {isJumpsuit}
                                onChange={handleJumpsuitChange} 
                                type="checkbox" 
                                id="type-jumpsuit" 
                                name="type-jumpsuit"
                                />
                           
                        </label>
                        <br /> */}
                        <br />
                        <label htmlFor="size"><strong>Item Size: </strong></label>
                        <input value={size} onChange={(e) => setSize(e.target.value)} type="text" id="size" name="size"/>
                        <br />
                        <label htmlFor="colour"><strong>Item Colour: </strong></label>
                        <input value={colour} onChange={(e) => setColour(e.target.value)} type="text" id="colour" name="colour"/>
                        <br />
                        <label htmlFor="available"><strong>Available to lend: </strong></label>
                        <input value={available} onChange={handleAvailableCheckboxChange} type="checkbox" checked={isChecked} id="available" name="available"/>
                        {/* <input value={available} onChange={(e) => setAvailable(e.target.value)} type="text" id="available" name="available"/> */}
                        <br />
                        <label htmlFor="image"><strong>Image (.jpeg/.jpg format): </strong></label>
                        <input onChange={handleImageUpload} type="file" id="imageForUpload" name="image"/>
                        <br />
                        {/* <Uploader onUpload = {handleImageUpload} /> */}
               
                        <button className = "submit-btn" type="submit">Add Item</button>
 
                     </form>  
                </div>
            )}
            
             
        </div> 
    );

    
};

export default NewClothingItem;
