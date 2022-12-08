import * as React from "react";
import { useState, useEffect, createContext } from "react";

export const CartContext = createContext();

export function useCartContext() {
  return React.useContext(CartContext);
}

export const CartContextProvider = ({children}) => {
    const [cart, setCart] = useState([]);

    useEffect(()=>{

    },[cart])


    const cartVariables = {cart, setCart}
    return (
        <CartContext.Provider value={{cartVariables}}>
            {children}
        </CartContext.Provider>
    )
}