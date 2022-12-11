import { Box, Center, Heading, Text } from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';

export default function Headline() {
  return (
    
      <Box textAlign="center" py={10} px={6}>
        <InfoIcon boxSize={'50px'} color={'blue.400'} />
        <Heading as="h2" size="xl" mt={6} mb={2}>
          Your Cart is Empty!
        </Heading>
        <Text color={'gray.500'}>
          You have nothing in your Cart! Feel free to check out our listings
          page and pick whatever you like 🙂
        </Text>
      </Box>
    
  );
}
