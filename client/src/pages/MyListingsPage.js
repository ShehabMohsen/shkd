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
  Center,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';
import Headline from '../components/Headline';

const headlineHeader = 'You have no listings...';
const headlineText =
  'You have yet to create any listings on our website!' +
  'Feel free to add to our collection of listings by clicking the add button in the navigation bar 🙂';

export default function ListingsPage() {
  const { listingVariables } = useListingContext();
  const listings = listingVariables.userListings;
  const setListings = listingVariables.setUserListings;

  //used for loading spinner logic and making we're not using array.map before fetching the data
  const [isLoading, setIsLoading] = useState(true);
  // store searchbar value
  const [searchValue, setSearchValue] = useState('');
  // listings we get based on the searchbar input
  const [searchedListings, setSearchedListings] = useState([]);

  useEffect(() => {
    async function getListingsData() {
      try {
        let response = await fetch(`/api/listing/myListings`);
        if (!response.ok) throw new Error('Unable to get listings');
        let fetchedListings = await response.json();
        setListings(fetchedListings);
        setSearchedListings(fetchedListings);
      } catch (error) {
        console.log(error);
      }
    }
    setIsLoading(false);
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
        minH={'80vh'}
        px={90}
        py={30}
      >
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {listings.length == 0 ? (
              <Center height={'100%'}>
                <VStack>
                  <Headline
                    headlineHeader={headlineHeader}
                    headlineText={headlineText}
                  />
                </VStack>
              </Center>
            ) : (
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
                          type="search"
                          borderWidth={2}
                          variant={'filled'}
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
            )}
          </>
        )}
      </Box>
    </React.Fragment>
  );
}
