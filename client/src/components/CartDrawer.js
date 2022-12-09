import React from 'react';
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
  Text
} from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi';
import { useCartContext } from '../contexts/CartContext';
import { useState } from 'react';
import CartTable from './CartTable';

export default function CartDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const {cartVariables} = useCartContext()
  const [checkoutForm, setCheckoutForm] = useState({
    ...cartVariables.shoppingCart,
  });

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
        // rightIcon={<IconShoppingCart height={20} width={20} strokeWidth={1.75}/>}
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
        size={"lg"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Your Shopping Cart</DrawerHeader>

          <DrawerBody>
            <CartTable shoppingCart={cartVariables.shoppingCart}/>
          </DrawerBody>

          <DrawerFooter>
            <Text>Drawer Footer</Text>
            <Spacer/>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

