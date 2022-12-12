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
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi';
import { useCartContext } from '../contexts/CartContext';
import { MoonIcon } from '@chakra-ui/icons';


function ProductCard({itemData }) {
  const { cartVariables } = useCartContext();

  return (
    <Card maxW="sm">
      <CardBody>
        <Image src={itemData.image} borderRadius="lg" />
        <Stack mt="6" spacing="3">
          <Accordion defaultIndex={[1]} allowMultiple>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex='1' textAlign='left'>
                    <Heading size="md">{itemData.listing_name}</Heading>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Text fontSize="md">Category: {itemData.category}</Text>
                <Text fontSize="sm" as='i'>{itemData.description}</Text>
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
        <Wrap>
          <ButtonGroup spacing="2">
            <WrapItem>
              <Button variant="solid" colorScheme="blue" onClick={()=>{cartVariables.addToCart(itemData)}}>
                Add to Card
              </Button>
            </WrapItem>
            <WrapItem>
              <Button variant="outline" colorScheme="blue" onClick={()=>{cartVariables.removeFromCart(itemData)}}>
                Remove from Cart
              </Button>
            </WrapItem>
          </ButtonGroup>
        </Wrap>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
