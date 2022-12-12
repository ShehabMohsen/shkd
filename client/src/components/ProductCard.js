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
          <Accordion defaultIndex={[0]} allowMultiple>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <Heading size="md">{itemData.listing_name}</Heading>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>{itemData.description}</AccordionPanel>
            </AccordionItem>
          </Accordion>

          <Text color="blue.400" fontSize="2xl">
            ${itemData.price}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        {itemData.UserId != authVariables.user.id ? (
          <ButtonGroup spacing="2">
            <Button
              variant="solid"
              colorScheme="blue"
              onClick={() => {
                cartVariables.addToCart(itemData);
              }}
            >
              Add to Card
            </Button>
            <Button
              variant="outline"
              colorScheme="blue"
              onClick={() => {
                cartVariables.removeFromCart(itemData);
              }}
            >
              Remove from Cart
            </Button>
          </ButtonGroup>
        ) : (
          <>
            <ButtonGroup spacing="2">
              {isEditActive ? (
                <EditModal
                  itemData={itemData}
                  setIsEditActive={setIsEditActive}
                />
              ) : (
                <Button
                  colorScheme={'blue'}
                  onClick={setIsEditActive(true)}
                  rightIcon={<EditIcon />}
                >
                  Edit
                </Button>
              )}
              <DeleteListingButton listingId={itemData.id} />{' '}
            </ButtonGroup>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
