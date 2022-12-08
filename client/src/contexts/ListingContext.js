import * as React from "react";
import { useState, useEffect, createContext } from "react";

export const ListingContext = createContext();

export function useListingContext() {
  return React.useContext(ListingContext);
}

export const ListingContextProvider = ({children}) => {
    const [listings, setListings] = useState([])

    useEffect(()=>{

    },[listings])


    const listingVariables = {listings, setListings}
    return (
        <ListingContext.Provider value={{listingVariables}}>
            {children}
        </ListingContext.Provider>
    )
}