import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { useListingContext } from '../contexts/ListingContext';

// will map through the two arrays to render the elements as html
const sizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', 'N/A'];
const categories = [
  'Shirts',
  'Pants',
  'Tops',
  'Bottoms',
  'Jackets',
  'Shoes',
  'Accessories',
];

export default function EditModal({ itemData, setIsEditActive }) {
  // needed for opening/closing the modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const toast = useToast();
  const [isValidImage, setIsValidImage] = useState(true);

  // listing context variables
  const { listingVariables } = useListingContext();
  const [listingForm, setListingForm] = useState({ ...itemData });
  //to pass pathname to update listing function
  const location = useLocation();

  function isImage(url) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  }

  const handleOnFormChange = event => {
    // image url validation
    if (event.target.name == 'image') {
     setIsValidImage(isImage(event.target.value))
    }

    if (event.target.name == 'category') {
      let listingFormCopy = listingForm;
      listingFormCopy.size = '';
      // reset size attribute in listingForm when changing category to shoes
      if (event.target.value == 'Shoes' && listingForm.category != 'Shoes') {
        setListingForm(listingFormCopy);
      }
      // reset size attribute inlistingForm when changing to any other category from shoes
      else if (
        event.target.value != 'Shoes' &&
        listingForm.category == 'Shoes'
      ) {
        setListingForm(listingFormCopy);
      }
    }
    // update listingForm with the value passed
    setListingForm({
      ...listingForm,
      [event.target.name]: event.target.value,
    });
  };
  // Do not save changes when closing modal
  const onCloseModal = () => {
    setListingForm(itemData);
    setIsEditActive(false);
    onClose();
  };

  // Save changes made to listing
  const handleSaveChanges = () => {
    for (const property in listingForm) {
      // iterate through object properties (keys)
      if (!listingForm[property] && property != 'description') {
        toast({
          position: 'top',
          title: 'Edit Error.',
          description: 'Please fill out all the required fields',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        return;
      }
    }

    // toast for failure
    if (!isValidImage) {
      toast({
        position: 'top',
        title: 'Edit Error.',
        description: 'Please make sure that image URL is Valid',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });

      return;
    }

    listingVariables.updateListing(listingForm, location.pathname);
    toast({
      position: 'top',
      title: 'Edit Success.',
      description: 'Your listing has been updated',
      status: 'info',
      duration: 5000,
      isClosable: true,
    });
    onClose();
    setIsEditActive(false);
  };

  return (
    <>
      <Button colorScheme={'blue'} onClick={onOpen} rightIcon={<EditIcon />}>
        Edit
      </Button>
      <Modal
        size={'xl'}
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onCloseModal}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Listing</ModalHeader>
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
                  {categories.map((category, index) => {
                    return (
                      <option value={category} key={index}>
                        {category}
                      </option>
                    );
                  })}
                </Select>
              </HStack>
            </FormControl>
            {listingForm.category == 'Shoes' ? (
              <FormControl isRequired mt={4}>
                <HStack>
                  <FormLabel width="120px">Size</FormLabel>
                  <NumberInput
                    width="100%"
                    precision={1}
                    step={0.5}
                    min={7}
                    max={18}
                    value={listingForm.size}
                    onChange={event => {
                      if (event % 0.5 != 0)
                        setListingForm({
                          ...listingForm,
                          size: Math.floor(event),
                        });
                      else setListingForm({ ...listingForm, size: event });
                    }}
                  >
                    <NumberInputField value={9} name="size" />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </HStack>
              </FormControl>
            ) : (
              <FormControl isRequired mt={4}>
                <HStack>
                  <FormLabel width="120px">Size</FormLabel>

                  <Select
                    value={listingForm.size}
                    onChange={event => handleOnFormChange(event)}
                    placeholder="Select size"
                    name="size"
                  >
                    {sizes.map((size, index) => {
                      return (
                        <option value={size} key={index}>
                          {size}
                        </option>
                      );
                    })}
                  </Select>
                </HStack>
              </FormControl>
            )}
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
                {listingForm.image}
              </InputGroup>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleSaveChanges} colorScheme="blue" mr={3}>
              Save Changes
            </Button>
            <Spacer />
            <Button onClick={onCloseModal} mr={3}>
              Discard Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
