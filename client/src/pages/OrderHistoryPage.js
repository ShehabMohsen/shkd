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
    Divider,
  } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react';
import CartTable from '../components/CartTable';
export default function OrderHistoryPage(){
    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState({});

    //Fetches Order Data
    useEffect(() =>{
        async function getOrderHistory(){
            try{
                let response = await fetch(`/api/order/myOrders`)

                if (!response.ok) throw new Error('Unable to get orders');

                let fetchedOrders = await response.json();

                setOrders(fetchedOrders);
                setIsLoading(false);
            } catch (err){
                console.log(err);
            }
        }
        getOrderHistory();
    }, []);
    console.log(orders)
    //Generate Order History Page

    return (
        <React.Fragment>
            {/* <CartTable shoppingCart={ shoppingCart } isPrevOrder = { true }/> */}
            <Heading textAlign = "center">Your Order History</Heading>
            <Divider orientation='horizontal' h='30px' />
            <TableContainer>
                <Table variant = 'simple'>
                    <Thead>
                        <Th>Order ID</Th>
                        <Th>Items Bought</Th>
                        <Th>Total</Th>
                    </Thead>
                    <Tbody>
                        
                    </Tbody>
                </Table>
            </TableContainer>
        </React.Fragment>
    )
    
}