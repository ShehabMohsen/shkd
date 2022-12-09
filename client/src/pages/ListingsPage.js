import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { useListingContext } from '../contexts/ListingContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { Box, useColorModeValue } from '@chakra-ui/react';
export default function ListingsPage() {
  const { listingVariables } = useListingContext();
  const listings = listingVariables.listings;
  const setListings = listingVariables.setListings;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getListingData() {
      try {
        let response = await fetch(`/api/listing`);

        if (!response.ok) throw new Error('Unable to get listings');

        let fetchedListings = await response.json();

        setListings(fetchedListings);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    getListingData();
  }, []);
return (
    <React.Fragment>
       <Box bg={useColorModeValue('gray.50', 'gray.800')}>
      {!isLoading ?
        listings.map(itemData => {
          return (
            <ProductCard
              key={itemData.id}
              imageURL={itemData.image}
              name={itemData.listing_name}
              price={itemData.price}
              gender={itemData.gender}
              size={itemData.size}
              itemData={itemData}
            />
          );
        })
      :<LoadingSpinner/>}
      </Box>
    </React.Fragment>
  );
}
