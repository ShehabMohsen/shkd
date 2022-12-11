import * as React from 'react';
import { useState, useEffect, createContext, useContext } from 'react';

// will be used as key for storing/fetching data from browser local storage
const SHOPPING_CART_STORAGE_KEY = 'listing-shopping-cart';

export const CartContext = createContext();

export function useCartContext() {
  return useContext(CartContext);
}

export const CartContextProvider = ({ children }) => {
  const [shoppingCart, setShoppingCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  /* Upon mounting the component this context is wrapped around, the program will look to see if 
  there's a shopping cart stored in browser local storage and sets the shoppingCart state to it */
  useEffect(() => {
    // gets data from local storage with the key of SHOPPING_CART_STORAGE_KEY
    const storageCart = JSON.parse(
      localStorage.getItem(SHOPPING_CART_STORAGE_KEY)
    );
    // sets shoppingCart state to whats parsed from storage (if the array is not empty)
    if (storageCart) setShoppingCart(storageCart);

    setIsLoading(false);
  }, []);

  // Update browser local storage whenever a new item is added/removed from cart
  useEffect(() => {
    if (!isLoading)
      //makes sure this doesn't run before fetching data from local storage upon refresh
      localStorage.setItem(
        SHOPPING_CART_STORAGE_KEY,
        JSON.stringify(shoppingCart)
      );
  }, [shoppingCart]);

  //adding items to cart
  function addToCart(listing) {
    let newShoppingCart = [...shoppingCart];
    let temp = {
      ...listing,
      quantity: 1,
    };
    let isInArray = false;

    // search shopping cart array to increment quantity of listing object if its already in the array
    for (let i = 0; i < shoppingCart.length; i++) {
      if (newShoppingCart[i].id == listing.id) {
        newShoppingCart[i].quantity += 1;
        isInArray = true;
      }
    }
    // executes when the listing have never been added to cart
    if (isInArray == false) {
      setShoppingCart([...shoppingCart, temp]); // set shopping cart to itself pushing a new listing object to the array as an element
    } else setShoppingCart(newShoppingCart); // executes if listing is already in cart then we set it to the new array with the updated quantity
  }

  // removing items to cart
  function removeFromCart(listing) {
    let newShoppingCart = [];
    for (let i = 0; i < shoppingCart.length; i++) {
      if (shoppingCart[i].id == listing.id) {
        /* if item exists and its quantity more than one: create new object but subtract quantity
            then push to new array*/
        // to completely remove: simply don't push to the new array if quantity is less than 1
        if (shoppingCart[i].quantity > 1) {
          let temp = {
            ...listing,
            quantity: shoppingCart[i].quantity - 1,
          };
          newShoppingCart.push(temp);
        }
      } else newShoppingCart.push(shoppingCart[i]); // copy the rest of the elements into the cart
    }
    setShoppingCart(newShoppingCart);
  }

  // this function will take checkout form and send it to the backend once user "purchases" the items. it'll probably be better to puth this in the CartDrawer Component
  async function checkout(checkoutForm) {

  }

  const cartVariables = {
    shoppingCart,
    setShoppingCart,
    addToCart,
    removeFromCart,
    checkout,
  };

  return (
    <CartContext.Provider value={{ cartVariables }}>
      {children}
    </CartContext.Provider>
  );
};
