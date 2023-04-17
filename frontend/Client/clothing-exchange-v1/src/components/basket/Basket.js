import React from "react";
import NewOrder from "../newOrder/NewOrder";

const Basket = (props) => {
    const { basketItems, onAdd, onRemove } = props;
    const totalPrice = basketItems.length * 10;

    const handlePlaceOrder = () => {
        return <NewOrder />;
    }

    return (
        <div>
            <h1>Your Basket</h1>
            {/* option to remove each individual item from the basket
            place order button = newOrder
            this will update the order reference in user also */}
            <div>
                {basketItems.length === 0 && <div>Basket is empty</div>}
                {basketItems.map((item) => (
                <div key={item.id} className="row">
                    <div className="col-2">{item.id}</div>
                    <div className="col-2">
                    <button onClick={() => onRemove(item)} className="remove">
                        -
                    </button>{' '}
                    <button onClick={() => onAdd(item)} className="add">
                        +
                    </button>
                    </div>

                    <div className="col-2 text-right">
                     €{totalPrice}
                    </div>
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
                        {/* how to create order on clicking this button from NewOrder component */}
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