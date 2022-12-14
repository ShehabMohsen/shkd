import * as React from 'react';
import { useState, useEffect, createContext, useContext } from 'react';
export const ListingContext = createContext();

export function useListingContext() {
  return useContext(ListingContext);
}

export const ListingContextProvider = ({ children }) => {
  const [listings, setListings] = useState([]);
  const [userListings, setUserListings] = useState([]);
  const [listingForm, setListingForm] = useState({
    listing_name: '',
    description: '',
    gender: '',
    category: '',
    size: '',
    price: '',
    image: '',
  });
  
  useEffect(() => {}, [listings]);

  const getListingsData = async () => {
    try {
      let response = await fetch(`/api/listing`);

      if (!response.ok) throw new Error('Unable to get listings');

      let fetchedListings = await response.json();
      setListings(fetchedListings);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserListingsData = async () => {
    try {
      let response = await fetch(`/api/listing/myListings`);

      if (!response.ok) throw new Error('Unable to get listings');

      let fetchedListings = await response.json();
      setUserListings(fetchedListings);
    } catch (error) {
      console.log(error);
    }
  };

  const createListing = async (listingForm, pathname) => {
    try {
      let response = await fetch('/api/listing/createListing', {
        method: 'POST',
        body: JSON.stringify(listingForm),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // if listing is created from within listings page
      if (pathname == '/listings') getListingsData();
      // if listing is created from within user listings page
      else if (pathname == '/user/listings') getUserListingsData();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteListing = async (listingId, pathname="/") => {
    try {
      // remove from backend
      await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // if listing is created from within listings page
      if (pathname == '/listings') getListingsData();
      // if listing is created from within user listings page
      else if (pathname == '/user/listings') getUserListingsData();

    } catch (error) {
      console.log(error);
    }
  };

  const updateListing = async (listingData, pathname="/") => {
    try {
      await fetch(`/api/listing/update/${listingData.id}`, {
        method: 'PUT',
        body: JSON.stringify(listingData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // if listing is created from within listings page
      if (pathname == '/listings') getListingsData();
      // if listing is created from within user listings page
      else if (pathname == '/user/listings') getUserListingsData();

    } catch (error) {
      console.log(error);
    }
  };

  const listingVariables = {
    listings,
    setListings,
    listingForm,
    setListingForm,
    createListing,
    deleteListing,
    updateListing,
    getListingsData,
    userListings,
    setUserListings,
    getUserListingsData,
  };
  return (
    <ListingContext.Provider value={{ listingVariables }}>
      {children}
    </ListingContext.Provider>
  );
};
