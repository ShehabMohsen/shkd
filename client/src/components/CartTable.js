import React from 'react';
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
  VStack,
  HStack,
  Text,
  IconButton,
  Spacer,
  Box,
} from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { useCartContext } from '../contexts/CartContext';


export default function CartTable({ shoppingCart }) {

  //contains states/functions relating to cart such as shoppingCart, setShoppingCart, addToCart, removeFromCart, etc
  const { cartVariables } = useCartContext();
  
  // handler for decrementing item quantity from within cart table
  function onClickRemove(listing){
    cartVariables.removeFromCart(listing)
  }

  // handler for incrementing item quantity from within cart table
  function onClickAdd(listing){
    cartVariables.addToCart(listing)    
  }

  let totalPrice = 0;
  return (
    <TableContainer>
      <Table variant="striped" colorScheme="blue">
        <Thead>
          <Tr>
            <Th>Listing Name</Th>
            <Th>Quantity</Th>
            <Th>Size</Th>
            <Th isNumeric>Price</Th>
          </Tr>
        </Thead>
        {/* map over shoppingCart in Tbody */}
        <Tbody>
          {shoppingCart.map(listing => {
            totalPrice += listing.price * listing.quantity;
            return (
              <Tr>
                <Td>
                  <Text mb={3}>{listing.listing_name}</Text>
                </Td>
                <Td>
                  {/* display quantity of item as well as buttons to add/subtract quantity */}
                  <HStack spacing={3}>
                    <IconButton size={'sm'} icon={<MinusIcon />} onClick={()=>{onClickRemove(listing)}} />{' '}
                    <Text fontSize={18}>{listing.quantity}</Text>
                    <IconButton size={'sm'} icon={<AddIcon/>} onClick={()=>{onClickAdd(listing)}} />
                  </HStack>
                </Td>
                <Td>{listing.size}</Td>
                <Td isNumeric>${listing.price * listing.quantity} </Td>
              </Tr>
            );
          })}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th fontSize={'md'}>Total Price</Th>
            <Th></Th>
            <Th></Th>
            <Th isNumeric fontSize={'md'}>
              ${totalPrice}
            </Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
}
