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
} from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi';
import { useCartContext } from '../contexts/CartContext';
import { MoonIcon } from '@chakra-ui/icons';


function ProductCard({ imageURL, name, price, gender, size, itemData }) {
  const { cartVariables } = useCartContext();

  return (
    <Card maxW="sm">
      <CardBody>
        <Image src={imageURL} borderRadius="lg" />
        <Stack mt="6" spacing="3">

        <Accordion defaultIndex={[0]} allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex='1' textAlign='left'>
                <Heading size="md">{name}</Heading>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
            {itemData.description}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

          <Text color="blue.400" fontSize="2xl">
            ${price}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button variant="solid" colorScheme="blue" onClick={()=>{cartVariables.addToCart(itemData)}}>
            Add to Card
          </Button>
          <Button variant="ghost" colorScheme="blue" onClick={()=>{cartVariables.removeFromCart(itemData)}}>
            Remove from Cart
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
