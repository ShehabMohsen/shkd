import * as React from "react";
import { useState, useEffect, createContext } from "react";

export const ListingContext = createContext();

export function useListingContext() {
  return React.useContext(ListingContext);
}

export const ListingContextProvider = ({children}) => {
    const [listings, setListings] = useState()
    const [userListings, setUserListings] = useState();
    const [listingForm, setListingForm] = useState({
        listing_name:'',
        description: '',
        gender: '',
        category: '',
        size: '',
        price: '',
        image: ''
    });
    useEffect(()=>{
    },[listings])


    

    const listingVariables = {listings, setListings, listingForm, setListingForm}
    return (
        <ListingContext.Provider value={{listingVariables}}>
            {children}
        </ListingContext.Provider>
    )
}