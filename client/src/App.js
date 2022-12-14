import React from 'react';
import "./App.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  ChakraProvider,
  theme,
  Flex,
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
import Footer from './components/Footer';
function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthContextProvider>
        <CartContextProvider>
          <ListingContextProvider>
            <BrowserRouter>
            <Flex flexDirection={'column'} minH={'100vh'}>
              <Navigation />
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/listings" element={<ListingsPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/user/orders" element={<OrderHistoryPage />} />
                <Route path="/user/listings" element={<MyListingsPage />} />
              </Routes>
              <Footer/>
              </Flex>
            </BrowserRouter>
          </ListingContextProvider>
        </CartContextProvider>
      </AuthContextProvider>
    </ChakraProvider>
  );
}

export default App;
