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
} from '@chakra-ui/react'
import React, { useState, useEffect } from 'react';
import CartTable from '../components/CartTable';
export default function OrderHistoryPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState({});

    //Fetches Order Data
    useEffect(() => {
        async function getOrderHistory() {
            try {
                let response = await fetch(`/api/order/myOrders`)

                if (!response.ok) throw new Error('Unable to get orders');

                let fetchedOrders = await response.json();
                setOrders(fetchedOrders);

                setIsLoading(false);
            } catch (err) {
                console.log(err);
            }
        }
        getOrderHistory();
    }, []);
    console.log(orders) // ############ DELETE BEFORE PULL REQUEST
    //Generate Order History Page
    return (
        <React.Fragment>
            <Spacer h='30px' />
            <Heading textAlign="center">Your Order History</Heading>
            <Spacer h='30px' />
            {isLoading ? null : orders.map((order, index) => {
                return (
                    <Flex justify="center" >
                        <Box width='xl' mb='20' >
                            <HStack>
                                <Heading size="md">Order #{order.id}</Heading>
                                <Spacer h ='30px'/>
                                <Heading size = "xs"> {order.createdAt}</Heading>
                            </HStack>
                            <CartTable key={index} shoppingCart={order.listings} isPrevOrder={true} />
                        </Box>
                    </Flex>
                );
            })}
        </React.Fragment>
    )

}