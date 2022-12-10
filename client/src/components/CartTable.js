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
} from '@chakra-ui/react';

export default function CartTable({ shoppingCart }) {
  let totalPrice = 0
  return (
    <TableContainer>
      <Table variant="striped" colorScheme="blue">
        <Thead>
          <Tr>
            <Th>Listing Name</Th>
            <Th>Size</Th>
            <Th isNumeric>Price</Th>
          </Tr>
        </Thead>
        {/* map over shoppingCart in Tbody */}
        <Tbody>
          {shoppingCart.map((listing) => {
            totalPrice += listing.price*listing.quantity
            return (
              <Tr>
                <Td>{listing.listing_name}</Td>
                <Td>{listing.size}</Td>
                <Td isNumeric>${listing.price*listing.quantity} </Td>
              </Tr>
            );
          })}
        </Tbody>
        <Tfoot >
          <Tr>
            <Th fontSize={'md'}>Total Price</Th>
            <Th></Th>
            <Th isNumeric  fontSize={'md'}>${totalPrice}</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
}
