import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    quantity: 0, 
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push({...action.payload, quantity: 1});
      state.quantity++;
    },
    removeItem: (state, action) => {
      const productIndexInCartIndex = state.items.findIndex((item)=> item.name === action.payload.name);

      var quantityToRemove = 0;

      function deleteItem() {
        quantityToRemove = state.items[productIndexInCartIndex].quantity;
        state.items.splice(productIndexInCartIndex, 1);
      }

      if (productIndexInCartIndex !== -1) {
        if (action.payload.delete === true) {
          deleteItem();
        } else {
          if (state.items[productIndexInCartIndex].quantity>1) {
            state.items[productIndexInCartIndex].quantity--;

            quantityToRemove = 1;
          } else {
            deleteItem();
          }
        }

        state.quantity -= quantityToRemove;
      }
    },
    updateQuantity: (state, action) => {
      // .findIndex returns -1 if the target element not found in array 
      const productIndexInCart = state.items.findIndex((item)=> item.name === action.payload.name);
      if (productIndexInCart !== -1) {
        const productExistingState = state.items[productIndexInCart];

        const productQuantity = productExistingState.quantity+1;

        state.items[productIndexInCart] = {
          ...productExistingState,
          quantity: productQuantity
        };

        state.quantity++;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
