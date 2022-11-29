import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import Navigation from './components/Navigation';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Navigation/>
    </ChakraProvider>
  );
}

export default App;
