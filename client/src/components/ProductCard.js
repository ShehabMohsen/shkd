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
  const [isEditActive, setIsEditActive] = useState(false);

  return (
    <Card maxW="sm">
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
                  {' '}
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
            <ButtonGroup spacing="2">
              {isEditActive ? (
                <EditModal
                  itemData={itemData}
                  setIsEditActive={setIsEditActive}
                />
              ) : (
                <WrapItem>
                  <Button
                    colorScheme={'blue'}
                    onClick={setIsEditActive(!isEditActive)}
                    rightIcon={<EditIcon />}
                  >
                    Edit
                  </Button>
                </WrapItem>
              )}
              <WrapItem>
                <DeleteListingButton listingId={itemData.id} />{' '}
              </WrapItem>
            </ButtonGroup>
          </Wrap>
        )}
      </CardFooter>
    </Card>
  );
}
