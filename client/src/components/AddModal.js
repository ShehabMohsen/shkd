import React, { useState } from 'react';
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
import { AddIcon } from '@chakra-ui/icons';
import { useListingContext } from '../contexts/ListingContext';

export default function AddModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'free'];
  const sizes_shose = ['5', '6', '7', '8', '9', '10', '11', '12'];
  const categories = ['tops', 'bottoms', 'coat&jacket', 'shoes'];

  const { listingVariables } = useListingContext();
  const listingForm = listingVariables.listingForm;
  const setListingForm = listingVariables.setListingForm;
  const [genderValue, setGenderValue] = useState('');

  const handleOnFormChange = event => {
    setListingForm({
      ...listingForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleDiscardDraft = () => {
    setListingForm({
      listing_name: '',
      description: '',
      gender: '',
      category: '',
      size: '',
      price: '',
      image: '',
    });
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen} rightIcon={<AddIcon />}>
        Add
      </Button>
      <Modal
        size={'xl'}
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Listing</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel>Item name</FormLabel>
              <Input
                ref={initialRef}
                placeholder="What are you selling?"
                onChange={handleOnFormChange}
                value={listingForm.listing_name}
                name="listing_name"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Item description</FormLabel>
              <Textarea
                placeholder="Feel free to describe what you're selling in more detail 🙂"
                onChange={handleOnFormChange}
                value={listingForm.description}
                name="description"
              />
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel as="legend">Gender</FormLabel>
              <RadioGroup
                value={listingForm.gender}
                defaultValue="unisex"
                name="gender"
                // chakra ui radio group gives us the value of whatever is selected by default
                onChange={event =>
                  setListingForm({ ...listingForm, gender: event })
                }
              >
                <HStack spacing="24px">
                  <Radio value="Male">Men's</Radio>
                  <Radio value="Women">Women's</Radio>
                  <Radio value="Unisex">Unisex</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>

            <FormControl isRequired mt={4}>
              <HStack>
                <FormLabel width="120px">Category</FormLabel>
                <Select
                  value={listingForm.category}
                  id="category-select"
                  onChange={event => handleOnFormChange(event)}
                  placeholder="Select category"
                  name="category"
                >
                  <option value="Top">Top</option>
                  <option value="Bottom">Bottom</option>
                  <option value="Coat&Jacket">Coat&Jacket</option>
                  <option value="Shoes">Shoes</option>
                  <option value="Accessories">Accessories</option>
                </Select>
              </HStack>
            </FormControl>

            <FormControl isRequired mt={4}>
              <HStack>
                <FormLabel width="120px">Size</FormLabel>

                <Select
                  value={listingForm.size}
                  onChange={event => handleOnFormChange(event)}
                  placeholder="Select size"
                  name="size"
                >
                  <option value="XSmall">XSmall</option>
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                  <option value="XLarge">XLarge</option>
                  <option value="N/A">N/A</option>
                </Select>
              </HStack>
            </FormControl>

            <FormControl isRequired mt={4}>
              <HStack>
                <FormLabel width="120px">Price</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    fontSize="1.2em"
                    children="$"
                  />
                  <Input
                    onChange={handleOnFormChange}
                    type="number"
                    placeholder="Enter amount"
                    name="price"
                    value={listingForm.price}
                  />
                </InputGroup>
              </HStack>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Image</FormLabel>
              <InputGroup>
                <InputLeftAddon children="URL" />
                <Input
                  onChange={handleOnFormChange}
                  type="url"
                  placeholder="url of image"
                  name="image"
                  value={listingForm.image}
                />
              </InputGroup>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Add Listing
            </Button>
            <Button onClick = {onClose}>Save Draft </Button>
            <Spacer />
            <Button onClick={handleDiscardDraft} mr={3}>
              Discard draft
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
