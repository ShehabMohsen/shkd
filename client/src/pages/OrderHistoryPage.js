import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Heading,
  HStack,
  Divider,
  Flex,
  Spacer,
  Box,
  Center,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import CartTable from '../components/CartTable';
import Headline from '../components/Headline';
const headlineHeader = 'You have no transactions...';
const headlineText =
  'You have yet to make any transactions on our website!' +
  ' Feel free to add listings to your cart and checkout when ready 🙂';

export default function OrderHistoryPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState({});

  /*Reference Used for DateTime:
    https://stackoverflow.com/questions/68121540/how-can-i-access-my-json-datetime-value-from-my-react-component
    https://isotropic.co/how-to-format-a-date-as-dd-mm-yyyy-in-javascript/
    https://stackoverflow.com/questions/27939773/tolocaledatestring-short-format
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options*/
    
  const getFormattedDate = dateStr => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(); //Returns in local time of machine
  };

  //Fetches Order Data
  useEffect(() => {
    async function getOrderHistory() {
      try {
        let response = await fetch(`/api/order/myOrders`);

        if (!response.ok) throw new Error('Unable to get orders');

        let fetchedOrders = await response.json();
        setOrders(fetchedOrders);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    getOrderHistory();
  }, []);

  //useColorModeValue(light,dark) (each as string)
  const shadowColor = useColorModeValue('lg', 'dark-lg');

  //Generate Order History Page
  return (
    <React.Fragment>
      <Box bgColor={useColorModeValue('white', 'gray.800')} minH={'70vh'} mb = "10">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {orders.length == 0 ? (
              <Center>
                <Headline
                  headlineHeader={headlineHeader}
                  headlineText={headlineText}
                />
              </Center>
            ) : (
              <>
                <Spacer h="30px" />
                <Heading textAlign="center">Your Order History</Heading>
                <Spacer h="30px" />
                {orders.map((order, index) => {
                  return (
                    <Flex justify="center">
                      <Box
                        width="xl"
                        //mb="20"
                        margin="20px"
                        padding={10}
                        boxShadow={shadowColor}
                        rounded={'md'}
                      >
                        <HStack>
                          <Heading size="md" h="20px">
                            Order #{order.id}
                          </Heading>
                          <Spacer h={10} />
                          <Heading size="xs" h="10px">
                            {' '}
                            {getFormattedDate(order.createdAt)}
                          </Heading>
                        </HStack>
                        <CartTable
                          key={index}
                          shoppingCart={order.listings}
                          isPrevOrder={true}
                        />
                      </Box>
                    </Flex>
                  );
                })}
              </>
            )}
          </>
        )}
      </Box>
    </React.Fragment>
  );
}
