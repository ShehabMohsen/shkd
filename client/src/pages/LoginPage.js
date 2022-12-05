import React from 'react';
import { useAuthContext } from '../contexts/AuthContext';
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
  } from '@chakra-ui/react';
  
  export default function SimpleCard() {
    const {authVariables} = useAuthContext()
    const [form, setForm] = React.useState({
      email: "",
      password: "",
    })
    const [error, setError] = React.useState(null)

    const handleOnFormChange = (event) => {
      setForm({...form, [event.target.name]:event.target.value})
    }

    const handleOnSubmit = async (event) => {
      event.preventDefault()
      try {
        await authVariables.authenticate(form.email, form.password)
      } catch (error) {
        setError(true)
        console.log(error)
      }
    }

    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
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
            p={8}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" onChange = {handleOnFormChange} name = "email" value = {form.email}/>
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" onChange = {handleOnFormChange} name = "password" value = {form.password}/>
              </FormControl>
              <Stack spacing={10}>
                <Stack pt={6}>
                <Text align={'center'}>
                  Don't have an account? <Link href="/register" color={'blue.400'}>Register</Link>
                </Text>
              </Stack>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  onClick={handleOnSubmit}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }