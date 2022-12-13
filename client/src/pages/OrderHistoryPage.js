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
  useColorModeValue
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

  //Generate Order History Page
  return (
    <React.Fragment>
      <Box bgColor={useColorModeValue('gray.50', 'gray.800')} minH={'70vh'}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {orders.length == 0 ?<Center><Headline headlineHeader={headlineHeader} headlineText={headlineText}/></Center>: (
              <>
              <Spacer h="30px" />
              <Heading textAlign="center">Your Order History</Heading>
              <Spacer h="30px" />
              {orders.map((order, index) => {
                return (
                  <Flex justify="center">
                    <Box width="xl" mb="20">
                      <HStack>
                        <Heading size="md">Order #{order.id}</Heading>
                        <Spacer h="30px" />
                        <Heading size="xs"> {order.createdAt}</Heading>
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
