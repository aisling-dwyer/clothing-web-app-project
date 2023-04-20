import React, { useEffect, useState } from "react";
import "./Basket.css";
import { useNavigate } from "react-router-dom";

const Basket = () => {

    const userIdString = "6436b250a869e1350b08d4cd";
    
    const navigate = useNavigate();

    const getBasketItemsFromLocalStorage = () => {
        try {
          const items = localStorage.getItem("basketItems");
          if (items) {
            return JSON.parse(items);
          }
          return [];
        } catch (error) {
          console.error(error);
          return [];
        }
      };
      

    const [basketItems, setBasketItems] = useState(getBasketItemsFromLocalStorage());

    const saveBasketItemsToLocalStorage = (items) => {
        localStorage.setItem('basketItems', JSON.stringify(items));
    }
     
    const handleRemove = (clothingItem) => {
        const clothingItem1 = JSON.stringify(clothingItem);
        setBasketItems(basketItems.filter((x) => JSON.stringify(x) !== clothingItem1));
        
    };

    const handlePlaceOrder = () => {
        saveBasketItemsToLocalStorage(basketItems);
        navigate(`/newOrder`, { state: { basketItems } });
    }

    const totalPrice = basketItems.length * 10;
  
    useEffect(() => {
        saveBasketItemsToLocalStorage(basketItems);
    }, [basketItems]);

    return (
        <div>
            <h1>Your Basket</h1>
            <div>
                {basketItems.length === 0 && <div>Basket is empty</div>}
                {basketItems.map((item, index) => (
                <div key={item.id} className="row">
                    {/* <div className="col-2">{JSON.stringify(item.id)}</div> */}
                    <div className="col-2">Item {index+1}</div>
                    <div className="col-2">{item.colour} {item.type}</div>
        
                        
                        <div className="col-2 text-center">€10</div>
                        <button onClick={() => handleRemove(item)} className="col-2 remove">Remove Item</button>{' '}     
                </div>
                ))}

                {basketItems.length !== 0 && (
                <>
                    <hr></hr>
                    <div className="row">
                        <div className="col-2">
                            <strong>Total Price</strong>
                        </div>
                        <div className="col-1 text-right">
                            <strong>€{totalPrice.toFixed(2)}</strong>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                    <button onClick={handlePlaceOrder}>
                        Place Order
                    </button>
                    </div>
                </>
                )}
            </div>
        </div>
    );
};

export default Basket;