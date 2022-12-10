import React from "react";
import { Spinner, Center, Box, Flex, useColorModeValue } from "@chakra-ui/react";

function LoadingSpinner() {
  return (
    <Flex
    minH={'100vh'}
    align={'center'}
    justify={'center'}
    bg={useColorModeValue('gray.50', 'gray.800')}
    >
    <Center>
      <Box>
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.400"
      size="xl"
    />
    </Box>
    </Center>
    </Flex>
  );
}

export default LoadingSpinner;
