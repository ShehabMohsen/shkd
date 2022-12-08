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
  return (
    <TableContainer>
      <Table variant="striped" colorScheme="orange">
        <TableCaption>Imperial to metric conversion factors</TableCaption>
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
            return (
              <Tr>
                <Td>{listing.listing_name}</Td>
                <Td>{listing.size}</Td>
                <Td isNumeric>${listing.price*listing.quantity} </Td>
              </Tr>
            );
          })}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th isNumeric>multiply by</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
}
