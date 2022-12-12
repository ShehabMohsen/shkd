import React from 'react';
import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip,
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
  Spacer,
  HStack,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { useCartContext } from '../contexts/CartContext';
import { useAuthContext } from '../contexts/AuthContext';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import DeleteListingButton from './DeleteListingButton';

export default function ProductCard({
  imageURL,
  name,
  price,
  gender,
  size,
  itemData,
}) {
  const { cartVariables } = useCartContext();
  const { authVariables } = useAuthContext();
  console.log(itemData);
  return (
    <Card maxW="sm">
      <CardBody>
        <Image src={imageURL} borderRadius="lg" />
        <Stack mt="6" spacing="3">
          <Accordion defaultIndex={[0]} allowMultiple>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <Heading size="md">{name}</Heading>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>{itemData.description}</AccordionPanel>
            </AccordionItem>
          </Accordion>

          <Text color="blue.400" fontSize="2xl">
            ${price}
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
              <Button
                variant="solid"
                colorScheme="blue"
                rightIcon={<EditIcon />}
              >
                Edit
              </Button>
              <DeleteListingButton listingId={itemData.id}/> {/* popup alert modal */}
            </ButtonGroup>
          </>
        )}
      </CardFooter>
    </Card>
  );
}

