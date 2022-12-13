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

    /*Reference Used for DateTime:
    https://stackoverflow.com/questions/68121540/how-can-i-access-my-json-datetime-value-from-my-react-component
    https://isotropic.co/how-to-format-a-date-as-dd-mm-yyyy-in-javascript/
    https://stackoverflow.com/questions/27939773/tolocaledatestring-short-format
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options*/
    const getFormattedDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString(); //Returns in local time of machine
      }

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

    //Generate Order History Page
    //Converting ISO8601 to timestamp
    //https://linuxhint.com/date-toisostring-method-javascript/#:~:text=The%20Date%20toISOString()%20method%20is%20used%20to%20format%20the,string%20value%20to%20the%20caller.
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
                                <Heading size = "xs"> {getFormattedDate(order.createdAt)}</Heading>
                            </HStack>
                            <CartTable key={index} shoppingCart={order.listings} isPrevOrder={true} />
                        </Box>
                    </Flex>
                );
            })}
        </React.Fragment>
    )

}