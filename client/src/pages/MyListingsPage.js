import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { useListingContext } from '../contexts/ListingContext';
import LoadingSpinner from '../components/LoadingSpinner';
import {
  Box,
  useColorModeValue,
  Grid,
  GridItem,
  Input,
  Stack,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';
export default function ListingsPage() {
  const { listingVariables } = useListingContext();
  const listings = listingVariables.listings;
  const setListings = listingVariables.setListings;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getListingData() {
      try {
        let response = await fetch(`/api/listing/myListings`);

        if (!response.ok) throw new Error('Unable to get listings');

        let fetchedListings = await response.json();

        setListings(fetchedListings);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    getListingData();
  }, []);

  return (
    <React.Fragment>
      <Box bg={useColorModeValue('gray.50', 'gray.800')} h={'90vh'} px={90} py={30}>
        {!isLoading ? (
          <>
            <Grid
              h="300px"
              templateColumns="repeat(4, 1fr)"
              gap="7"
              fontWeight="bold"
            >
              <GridItem colSpan={'4'} h="40px">
                <Stack spacing={4}>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<Search2Icon color="gray.300" />}
                    />
                    <Input type="search" placeholder="Search for item" />
                  </InputGroup>
                </Stack>
              </GridItem>

              {listings.map(itemData => {
                return (
                  <GridItem colSpan={1}>
                    <ProductCard
                      key={itemData.id}
                      imageURL={itemData.image}
                      name={itemData.listing_name}
                      price={itemData.price}
                      gender={itemData.gender}
                      size={itemData.size}
                      itemData={itemData}
                    />
                  </GridItem>
                );
              })}
            </Grid>
          </>
        ) : (
          <LoadingSpinner />
        )}
      </Box>
    </React.Fragment>
  );
}
