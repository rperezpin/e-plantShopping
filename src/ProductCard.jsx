import React, { useState } from "react";
import './ProductList.css'

const ProductCard = ({ product, dispatchAddItemCallback, initialButtonState }) => {

    const [buttonEnabled, setButtonEnabled] = useState(initialButtonState);

    function handleButtonState(newState) {
        setButtonEnabled(newState);
    }

    function handleButtonClick() {
        if (buttonEnabled) {
            dispatchAddItemCallback(product);
            handleButtonState(false);
        }
    }

    return <div className='product-card'>
        <h4 className='product-title'>{product.name}</h4>
        <img src={product.image} className='product-image'/>
        <p className='product-price'>{product.cost}</p>
        <p>{product.description}</p>
        <button className={`product-button ${!buttonEnabled? 'added-to-cart' : ''}`} onClick={handleButtonClick}>
            {buttonEnabled? "Add to Cart" : "Added to Cart"}
        </button>
    </div>; 
}

export default ProductCard;
