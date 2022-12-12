import { Box, Center, Heading, Text } from '@chakra-ui/react';
import { InfoIcon, WarningIcon } from '@chakra-ui/icons';

export default function Headline({headlineHeader, headlineText, headlineIcon}) {
  return (
    
      <Box textAlign="center" py={10} px={6}>

        {headlineIcon == 'info icon' ? <InfoIcon boxSize={'50px'} color={'blue.400'} /> : null}
        
        <Heading as="h2" size="xl" mt={6} mb={2}>
          {headlineHeader}
        </Heading>
        <Text color={'gray.500'}>
          {headlineText}
        </Text>
      </Box>
    
  );
}
