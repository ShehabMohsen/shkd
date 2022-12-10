import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  Select,
  Radio,
  RadioGroup,
  HStack,
  Textarea,
  Spacer,
} from '@chakra-ui/react';

import React from 'react';
import { AddIcon } from '@chakra-ui/icons';

export default function AddModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'free'];
  const sizes_shose = ['5', '6', '7', '8', '9', '10', '11', '12'];
  const categories = ['tops', 'bottoms', 'coat&jacket', 'shoes'];

  return (
    <>
      <Button onClick={onOpen} rightIcon={<AddIcon />}>
        Add
      </Button>

      <Modal  initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Listing</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel>Item name</FormLabel>
              <Input ref={initialRef} placeholder="What are you selling?" />
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>Item description</FormLabel>
              <Textarea placeholder='Here is a sample placeholder' />
              {/* <Input height="20" placeholder="Describe your selling item" /> */}
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel as="legend">Gender</FormLabel>
              <RadioGroup defaultValue="unisex">
                <HStack spacing="24px">
                  <Radio value="men">Men's</Radio>
                  <Radio value="women">Women's</Radio>
                  <Radio value="unisex">Unisex</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>

            <FormControl isRequired mt={4}>
              <HStack >
                <FormLabel width="120px">Category</FormLabel>
                {/* <Spacer/> */}
                  
                <Select placeholder="Select category">
                  <option value="option1">Top</option>
                  <option value="option2">Bottom</option>
                  <option value="option3">Coat&Jacket</option>
                  <option value="option4">Shoes</option>
                  <option value="option5">Accessories</option>
                </Select>
              </HStack>
            </FormControl>

            <FormControl isRequired mt={4}>
              <HStack >
                <FormLabel width="120px">Size</FormLabel>
                {/* <Spacer/> */}
                <Select placeholder="Select size">
                  <option value="option1">XSmall</option>
                  <option value="option2">Small</option>
                  <option value="option3">Medium</option>
                  <option value="option4">Large</option>
                  <option value="option5">XLarge</option>
                  <option value="option6">Free</option>
                </Select>
              </HStack>
            </FormControl>

            {/* <FormControl mt={4}>
              <FormLabel>Price</FormLabel>
              <InputGroup>
                <InputLeftAddon children="$" />
                <Input type="price" placeholder="Price of item" />
              </InputGroup>
            </FormControl> */}

            <FormControl isRequired mt={4}>
              <HStack  >
                <FormLabel width="120px">Price</FormLabel>
                {/* <Spacer/> */}
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    fontSize="1.2em"
                    children="$"
                  />
                  <Input type ='number' placeholder="Enter amount" />
                </InputGroup>
              </HStack>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Image</FormLabel>
              <InputGroup>
                <InputLeftAddon children="URL" />
                <Input type="url" placeholder="url of image" />
              </InputGroup>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
