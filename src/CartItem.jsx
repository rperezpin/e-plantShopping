import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const [checkout, setCheckout] = useState(false);

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    var totalItemsCost = 0;
    cart.forEach((item) => {
      totalItemsCost += item.quantity * encodeCost(item.cost);
    })

    return totalItemsCost;
  };

  const handleContinueShopping = (e) => {
   onContinueShopping(e);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity(item));
  };

  const handleDecrement = (item) => {
    dispatch(removeItem(item))
  };

  const handleRemove = (item) => {
    dispatch(removeItem({...item, delete: true}));
  };

  const encodeCost = (cost)=> {
    return Number(cost.substring(1));
  }

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    return item.quantity * encodeCost(item.cost);
  };

  const handleCheckOut = ()=> {
    setCheckout(true);
  }

  const returnFromCheckout = ()=> {
    setCheckout(false);
  }

  return (
    <div className="cart-container">
      {checkout? <>
        <h1 style={{ paddingTop: "20px" }}>Coming Soon!</h1>
        <button onClick={returnFromCheckout} className='get-started-button' style={{ margin: "0px" }}>Go back</button>
      </> : <>
        <h2 style={{ color: 'black' }}>Amount: ${calculateTotalAmount()}</h2>
        <div>
          {cart.map(item => (
            // <h1>
            //   {item.name}
            // </h1>
            <div className="cart-item" key={item.name}>
              <img className="cart-item-image" src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-cost">{item.cost}</div>
                <div className="cart-item-quantity">
                  <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                  <span className="cart-item-quantity-value">{item.quantity}</span>
                  <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
                </div>
                <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
                <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
        <div className="continue_shopping_btn">
          <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
          <br />
          <button className="get-started-button1" onClick={handleCheckOut}>Checkout</button>
        </div>
      </>}
    </div>
  );
};

export default CartItem;

