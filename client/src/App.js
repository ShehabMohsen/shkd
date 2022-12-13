import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  ChakraProvider,
  Box,
  theme,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import Navigation from './components/Navigation';
import LandingPage from './pages/LandingPage';
import ListingsPage from './pages/ListingsPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { AuthContextProvider } from './contexts/AuthContext';
import { ListingContextProvider } from './contexts/ListingContext';
import { CartContextProvider } from './contexts/CartContext';
import OrderHistoryPage from './pages/OrderHistoryPage';
import MyListingsPage from './pages/MyListingsPage';
function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthContextProvider>
        <CartContextProvider>
          <ListingContextProvider>
            <BrowserRouter>
              <Navigation />
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/listings" element={<ListingsPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/user/orders" element={<OrderHistoryPage />} />
                <Route path="/user/listings" element={<MyListingsPage />} />
              </Routes>
            </BrowserRouter>
          </ListingContextProvider>
        </CartContextProvider>
      </AuthContextProvider>
    </ChakraProvider>
  );
}

export default App;
