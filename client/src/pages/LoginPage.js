import React from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { useAuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
export default function SimpleCard() {
  // from AuthContext, contains user, signin, signout, signup, etc
  const { authVariables } = useAuthContext();
  // this object will update to the values the user types into the input form
  const [form, setForm] = React.useState({
    email: '',
    password: '',
  });
  const [errorMsg, setErrorMsg] = React.useState('');

  // for redirecting our page to landing page after logging in
  const navigate = useNavigate();

  // boolean state variable to have a loading button
  const [isButtonLoading, setIsButtonLoading] = React.useState(false);

  const handleOnFormChange = event => {
    setErrorMsg("")
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleOnSubmit = async event => {
    event.preventDefault();
    setIsButtonLoading(true); //turns button icon into an animated spinner
    try {
      await authVariables.login(form.email, form.password);
      // redirect to landing page after logging in
      navigate('/');

    } catch (error) {
      console.log(error);
      // set an alertmessage to display to the user when login fails
      setErrorMsg('Email or password is incorrect');
    }
    // stops the animated spinner after the request is done
    setIsButtonLoading(false);
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            Please enter your email address and password ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                onChange={handleOnFormChange}
                name="email"
                value={form.email}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                onChange={handleOnFormChange}
                name="password"
                value={form.password}
              />
            </FormControl>
            {errorMsg ? (
              <Alert status="error" variant={'subtle'}> 
                <AlertIcon />
                <AlertTitle>Error 401</AlertTitle>
                <AlertDescription>{errorMsg}</AlertDescription>
              </Alert>
            ) : null}
            <Stack spacing={10}>
              <Stack pt={6}>
                <Text align={'center'}>
                  Don't have an account?{' '}
                  <Link href="/register" color={'blue.400'}>
                    Register
                  </Link>
                </Text>
              </Stack>
              <Button
                isLoading={isButtonLoading}
                bg={'blue.400'}
                color={'white'}
                onClick={handleOnSubmit}
                _hover={{
                  bg: 'blue.500',
                }}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
