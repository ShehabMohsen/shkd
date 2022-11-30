import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
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
import LandingPage from './pages/LandingPage';
import ListingsPage from './pages/ListingsPage';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
      <Navigation/>
      <Routes>
        <Route path="/" element = {<LandingPage/>} />
        <Route path="/listings" element = {<ListingsPage/>} />
      </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
