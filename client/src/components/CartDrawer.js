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
  HStack,
  Image,
  useColorModeValue,
  useToast
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { useCartContext } from '../contexts/CartContext';
import { useState } from 'react';
import CartTable from './CartTable';
import Headline from './Headline';
import Logo from '../Assets/Logo.png';


const headlineHeader = 'Your Cart is Empty!'
const headlineText = 'You have nothing in your Cart! Feel free to check out our listings page and pick whatever you like 🙂'

export default function CartDrawer() {
  // Required to make drawer work
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  // CartContext
  const { cartVariables } = useCartContext();
  const shoppingCart = cartVariables.shoppingCart;
  const setShoppingCart = cartVariables.setShoppingCart;
  const checkout = cartVariables.checkout;

  const [checkoutForm, setCheckoutForm] = useState({});
  // Drawer background color:  useColorModeValue('lightModeColor', 'darkModeColor')
  const bg = useColorModeValue('gray.100', 'gray.800');

  useEffect(() => {
    // this will prepare checkout form
    let totalPrice = 0;
    if (shoppingCart.length > 0) {
      for (let i = 0; i < shoppingCart.length; i++) {
        totalPrice += shoppingCart[i].price;
      }
      setCheckoutForm({
        shoppingCart: shoppingCart,
        totalPrice,
      });
    }
  }, [shoppingCart]);

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
        <DrawerContent bgColor={bg}>
          <DrawerCloseButton />
          {shoppingCart.length > 0 ? (
            <CartContent
              shoppingCart={shoppingCart}
              onClose={onClose}
              checkoutForm={checkoutForm}
              checkout={checkout}
              setCheckoutForm={setCheckoutForm}
              setShoppingCart={setShoppingCart}
            />
          ) : (
            // display headline when there's nothing in cart
            <>
              <Center height={'100%'}>
                <VStack>
                  <Headline headlineHeader={headlineHeader} headlineText={headlineText}/>
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

export function CartContent({
  shoppingCart,
  onClose,
  checkoutForm,
  setCheckoutForm,
  checkout,
  setShoppingCart,
}) {
  const [isChecked, setIsChecked] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const toast = useToast()

  async function checkoutCart() {
    if (!isChecked) return;
    setIsButtonLoading(true);
    // call to chechkout function
    await checkout(checkoutForm);
    // after checkout is done, disable loading button

    setCheckoutForm({});
    setShoppingCart([]);
    setIsButtonLoading(false);
    onClose();

    toast({
      position: 'top',
      title: 'Checkout Success.',
      description: "Your order has been processed, thank you for using SHKD :)",
      status: 'success',
      duration: 8000,
      isClosable: true,
    });
  }

  return (
    <React.Fragment>
      <DrawerHeader textColor={'orange.400'}>
        <HStack>
          <Image src={Logo} width="45px" marginLeft="2px" />
          <Text>Your Shopping Cart</Text>
        </HStack>
      </DrawerHeader>

      <DrawerBody>
        <CartTable shoppingCart={shoppingCart} />
      </DrawerBody>
      <HStack>
        <Checkbox
          ml={6}
          required
          onChange={() => {
            setIsChecked(!isChecked);
          }}
        >
          <Text>By checking this box, you are confirming to Checkout</Text>
        </Checkbox>
      </HStack>
      <DrawerFooter>
        <Button
          size={'md'}
          colorScheme="blue"
          isLoading={isButtonLoading}
          onClick={() => {
            checkoutCart()
          }}
        >
          Checkout
        </Button>
        <Spacer />
        <Button size={'md'} variant="outline" ml={3} onClick={onClose}>
          Cancel
        </Button>
      </DrawerFooter>
    </React.Fragment>
  );
}
