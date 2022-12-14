import React from 'react';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box
} from '@chakra-ui/react';
export default function AlertBox({ status, title, description }) {
  return (
    <React.Fragment>
      <Box textAlign="center" rounded={'full'} py={10} px={6}>
      <Alert
        status={status}
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="300px"
        width="100%"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          {title}
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          {description}
        </AlertDescription>
      </Alert>
      </Box>
    </React.Fragment>
  );
}

// for after checkout
{/* <AlertBox
status={'success'}
title={'Checkout Successful'}
description={
  'Your order has been successfully processed. Thank you for shopping at SHKD :)'
}
/> */}



