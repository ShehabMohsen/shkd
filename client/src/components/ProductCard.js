import React from 'react';
import {
  Box,
  Image,
  Divider,
  Card,
  CardBody,
  Stack,
  Heading,
  Text,
  CardFooter,
  Button,
  ButtonGroup,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Wrap,
  WrapItem,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useCartContext } from '../contexts/CartContext';
import { useAuthContext } from '../contexts/AuthContext';
import { useState } from 'react';
import DeleteListingButton from './DeleteListingButton';
import EditModal from './EditModal';

export default function ProductCard({ itemData }) {
  const { cartVariables } = useCartContext();
  const { authVariables } = useAuthContext();
  // to be passed to child components for opening/closing the modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Card
      bgColor={useColorModeValue('white', 'gray.700')}
      minW="250px"
      maxW="sm"
    >
      <CardBody>
        <Image src={itemData.image} borderRadius="lg" />
        <Stack mt="6" spacing="3">
          <Accordion defaultIndex={[1]} allowMultiple>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <Heading size="md">{itemData.listing_name}</Heading>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Text fontSize="md">Category: {itemData.category}</Text>
                <Text fontSize="sm" as="i">
                  {itemData.description}
                </Text>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          <Text color="blue.400" fontSize="2xl">
            ${itemData.price}
          </Text>
          <Text color="blue.400" fontSize="lg">
            Size: {itemData.size}, {itemData.gender}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        {itemData.UserId != authVariables.user.id ? (
          <Wrap>
            <ButtonGroup spacing="2">
              {!cartVariables.isInCart(itemData) ? (
                <WrapItem>
                  <Button
                    variant="solid"
                    colorScheme="blue"
                    onClick={() => {
                      cartVariables.addToCart(itemData);
                    }}
                  >
                    Add to Card
                  </Button>
                </WrapItem>
              ) : (
                <WrapItem>
                  <Button
                    variant="outline"
                    colorScheme="red"
                    onClick={() => {
                      cartVariables.removeFromCart(itemData);
                    }}
                  >
                    Remove from Cart
                  </Button>
                </WrapItem>
              )}
            </ButtonGroup>
          </Wrap>
        ) : (
          <Wrap>
            <EditModal
              itemData={itemData}
              isOpen={isOpen}
              onOpen={onOpen}
              onClose={onClose}
            />
            <ButtonGroup spacing="2">
              <WrapItem>
                <Button
                  colorScheme={'blue'}
                  rightIcon={<EditIcon />}
                  onClick={onOpen}
                >
                  Edit
                </Button>
              </WrapItem>

              <WrapItem>
                <DeleteListingButton
                  listingId={itemData.id}
                  isOpen={isOpen}
                  onOpen={onOpen}
                  onClose={onClose}
                />{' '}
              </WrapItem>
            </ButtonGroup>
          </Wrap>
        )}
      </CardFooter>
    </Card>
  );
}
