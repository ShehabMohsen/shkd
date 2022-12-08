import * as React from "react";
import { useState, useEffect, createContext } from "react";

export const CartContext = createContext();

export function useCartContext() {
  return React.useContext(CartContext);
}

export const CartContextProvider = ({children}) => {
    const [shoppingCart, setShoppingCart] = useState([]);

    useEffect(()=>{

    },[cart])

    //adding items to cart
  const addToCart= (listing) => {
    // setReceipt(null)
    let newShoppingCart = [...shoppingCart];
    let temp = {
      itemId: listingId,
      quantity: 1,
    };
    let isInArray = false;

    for (let i = 0; i < shoppingCart.length; i++) {
      if (newShoppingCart[i].itemId == listingId) {
        newShoppingCart[i].quantity += 1;
        isInArray = true;
      }
    }
    if (isInArray == false) {
      setShoppingCart([...shoppingCart, temp]);
    } else setShoppingCart(newShoppingCart);
  };


    // removing items to cart
    const removeFromCart = (listingId) => {
        let newShoppingCart = [];
        for (let i = 0; i < shoppingCart.length; i++) {
          if (shoppingCart[i].id == listingId) {
            /* if item exists and its quantity more than one: create new object but subtract quantity
            then push to new array*/
            // to completely remove: simply don't push to the new array if quantity is less than 1
            if (shoppingCart[i].quantity > 1) {
              let temp = {
                id: shoppingCart[i].itemId,
                quantity: shoppingCart[i].quantity - 1,
              };
              newShoppingCart.push(temp);
            }
          } else newShoppingCart.push(shoppingCart[i]); //copy the rest of the elements into the cart
        }
        setShoppingCart(newShoppingCart);
      };
    const cartVariables = {shoppingCart, setShoppingCart}
    return (
        <CartContext.Provider value={{cartVariables}}>
            {children}
        </CartContext.Provider>
    )
}