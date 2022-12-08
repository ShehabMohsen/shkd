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
} from '@chakra-ui/react';
import { IconShoppingCart } from '@tabler/icons';
import { FiShoppingCart } from 'react-icons/fi';


export default function CartDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

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
        rightIcon={<IconShoppingCart height={20} width={20} stroke-width={1.75} alignSelf={'center'} />}
        // rightIcon={
        //   <Icon as={FiShoppingCart} h={5} w={5} alignSelf={'center'} />
        // }
      >
        Cart
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <Input placeholder="Type here..." />
          </DrawerBody>

          <DrawerFooter>
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
