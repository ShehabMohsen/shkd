import {
  Box,
  chakra,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  VisuallyHidden,
  Input,
  IconButton,
  useColorModeValue,
  Image,
  HStack,
  VStack,
  Spacer,
  Center,
} from '@chakra-ui/react';
import React from 'react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { BiMailSend } from 'react-icons/bi';
import Logo from '../Assets/Logo.png';
import githubLogo from '../Assets/githubLogo.png';
import OrangeGitHubLogo from '../Assets/OrangeGitHubLogo.png';

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  );
};

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue('gray.100', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      mt={'auto'}
    >
      <Container as={Stack} maxW={'6xl'} py={10}>
        <SimpleGrid
          templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 2fr' }}
          spacing={8}
        >
          {/* SECTION 1 */}
          <Stack spacing={6}>
            <Box>
              <HStack>
                <Image src={Logo} width={'36px'} />
                <Text textColor={'orange.400'} fontWeight={'semibold'}>
                  FASHION 4 YOU!
                </Text>
              </HStack>
            </Box>
            <Text fontSize={'sm'}>© 2022 SHKD. All rights reserved</Text>
            {/* <Stack direction={'row'} spacing={6}>
              <SocialButton label={'Twitter'} href={'#'}>
                <FaTwitter />
              </SocialButton>
              <SocialButton label={'YouTube'} href={'#'}>
                <FaYoutube />
              </SocialButton>
              <SocialButton label={'Instagram'} href={'#'}>
                <FaInstagram />
              </SocialButton>
            </Stack> */}
            {/* SECTION 2 */}
          </Stack>

          <Stack align={'flex-start'}>
            <ListHeader>Our team</ListHeader>
            <Link href={'#'}>Shehab Mohsen</Link>
            <Link href={'#'}>David Wang</Link>
            
          </Stack>
          <Stack align={'flex-start'} mt={6}>
            <ListHeader>{''}</ListHeader>
            <Link href={'#'}>Hyemin</Link>
            <Link href={'#'}>Kiane</Link>
          </Stack>

          {/* SECTION 3 */}
          <Stack align={'center'}>
            <ListHeader>Check us out on GitHub!</ListHeader>
            <Link href={'https://github.com/ShehabMohsen/shkd'}>
              <Image src={OrangeGitHubLogo} width={10} /> 
              </Link>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
