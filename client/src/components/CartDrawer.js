import React, { useEffect } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input,
  Button,
  Icon,
  Spacer,
  Text,
  Center,
  VStack,
  Checkbox,
  Box,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { useCartContext } from '../contexts/CartContext';
import { useState } from 'react';
import CartTable from './CartTable';
import Headline from './Headline';
import { Head } from 'react-axios';
export default function CartDrawer() {
  // Required to make drawer work
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  // CartContext
  const { cartVariables } = useCartContext();
  const shoppingCart = cartVariables.shoppingCart;

  const [checkoutForm, setCheckoutForm] = useState({});

  useEffect(() => {
    // this will prepare checkout form
    let totalPrice = 0;
    if (shoppingCart.length > 0) {
      for (let i = 0; i < shoppingCart.length; i++) {
        totalPrice += shoppingCart[i].price;
      }
      setCheckoutForm({
        ...shoppingCart,
        totalPrice,
      });
    }
  }, []);

  console.log('checkoutForm', checkoutForm);
  return (
    <>
      <Button
        ref={btnRef}
        colorScheme="orange"
        onClick={onOpen}
        bg={'orange.400'}
        _hover={{
          bg: 'orange.500',
        }}
        rightIcon={
          <Icon as={FiShoppingCart} h={5} w={5} alignSelf={'center'} />
        }
      >
        Cart
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={'lg'}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          {shoppingCart.length > 0 ? (
            <CartContent shoppingCart={shoppingCart} onClose={onClose} />
          ) : (
            // display headline when there's nothing in cart
            <>
              <Center height={'100%'}>
                <VStack>
                  <Headline />
                  <Link to="/listings">
                    <Button
                      size={'lg'}
                      fontWeight={'normal'}
                      px={6}
                      colorScheme={'orange'}
                      bg={'orange.400'}
                      _hover={{ bg: 'orange.500' }}
                      onClick={onClose}
                    >
                      Start Browsing
                    </Button>
                  </Link>
                </VStack>
              </Center>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}

export function CartContent({ shoppingCart, onClose }) {
  return (
    <React.Fragment>
      <DrawerHeader>Your Shopping Cart</DrawerHeader>
      <DrawerBody>
        <CartTable shoppingCart={shoppingCart} />
      </DrawerBody>  
          <Checkbox ml={6} defaultChecked>
            By checking this box, you are confirming to Checkout
          </Checkbox>
      <DrawerFooter>
          <Button colorScheme="blue">Checkout</Button>
        <Spacer />
        <Button variant="outline" ml={3} onClick={onClose}>
          Cancel
        </Button>
      </DrawerFooter>
    </React.Fragment>
  );
}
