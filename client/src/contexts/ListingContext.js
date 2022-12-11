import * as React from "react";
import { useState, useEffect, createContext, useContext } from "react";

export const ListingContext = createContext();

export function useListingContext() {
  return useContext(ListingContext);
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

    
    const createListing = async (listingForm) => {
        try {
            let response = await fetch("/api/listing/createListing", {
                method: "POST",
                body: JSON.stringify(listingForm),
                headers: {
                    "Content-Type":"application/json"
                }
            })
        } catch (error){
            console.log(error)
        }
    }
    

    const listingVariables = {listings, setListings, listingForm, setListingForm, createListing}
    return (
        <ListingContext.Provider value={{listingVariables}}>
            {children}
        </ListingContext.Provider>
    )
}