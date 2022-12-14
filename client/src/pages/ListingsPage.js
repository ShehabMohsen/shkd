import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { useListingContext } from '../contexts/ListingContext';
import LoadingSpinner from '../components/LoadingSpinner';
import {
  Box,
  useColorModeValue,
  Grid,
  SimpleGrid,
  GridItem,
  Input,
  Stack,
  InputGroup,
  InputLeftElement,
  Center,
} from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';
export default function ListingsPage() {
  const { listingVariables } = useListingContext();
  const listings = listingVariables.listings;
  const setListings = listingVariables.setListings;

  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [searchedListings, setSearchedListings] = useState([]);

  useEffect(() => {
    async function getListingsData() {
      try {
        let response = await fetch(`/api/listing`);

        if (!response.ok) throw new Error('Unable to get listings');

        let fetchedListings = await response.json();

        setListings(fetchedListings);
        setSearchedListings(fetchedListings);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    getListingsData();
  }, []);

  useEffect(() => {
    setSearchedListings(listings);
  }, [listings]);

  async function handleOnSearchChange(event) {
    setIsLoading(true);

    let value = event.target.value;
    setSearchValue(value);

    setSearchedListings(
      listings.filter(
        element =>
          element.listing_name.toLowerCase().includes(value.toLowerCase()) ||
          element.category.toLowerCase() == value.toLowerCase() ||
          element.gender.toLowerCase() == value.toLowerCase()
      )
    );

    setIsLoading(false);
  }

  return (
    <React.Fragment>
      <Box
        bg={useColorModeValue('gray.50', 'gray.800')}
        minH={'100vh'}
        px={90}
        py={30}
      >
        {!isLoading ? (
          <>
            <Grid w="auto" gap="7" fontWeight="bold" mb={10} mx={60}>
              <GridItem h="40px">
                <Stack spacing={4}>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<Search2Icon color="gray.300" />}
                    />
                    <Input
                      variant={'filled'}
                      type="search"
                      placeholder="Search for item"
                      value={searchValue}
                      onChange={handleOnSearchChange}
                    />
                  </InputGroup>
                </Stack>
              </GridItem>
            </Grid>
            <SimpleGrid columns={[1, 2, 3, 4]} spacing="40px" mx={60}>
              {searchedListings.map(itemData => {
                return (
                  <Box key={itemData.id}>
                    <Center key={itemData.id}>
                      <ProductCard key={itemData.id} itemData={itemData} />
                    </Center>
                  </Box>
                );
              })}
            </SimpleGrid>
          </>
        ) : (
          <LoadingSpinner />
        )}
      </Box>
    </React.Fragment>
  );
}
