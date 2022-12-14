import {
  Box,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  Image,
  HStack,
  Spacer,
} from '@chakra-ui/react';
import React from 'react';
import Logo from '../Assets/Logo.png';
import githubLogo from '../Assets/githubLogo.png';
import OrangeGitHubLogo from '../Assets/OrangeGitHubLogo.png';

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
          templateColumns={{ sm: '1fr', md: '2fr 2fr 2fr' }}
          spacing={8}
        >
          {/* SECTION 1 */}
          <Stack spacing={6} align="center">
            <Box>
              <HStack>
                <Image src={Logo} width={'36px'} />
                <Text
                  textColor={useColorModeValue('orange.500', 'orange.400')}
                  fontWeight={'semibold'}
                >
                  FASHION 4 YOU!
                </Text>
              </HStack>
            </Box>
            <Text fontSize={'sm'}>© 2022 SHKD. All rights reserved</Text>
          </Stack>

          <Stack align={'center'}>
            <ListHeader>Our Team</ListHeader>
            <HStack>
              <Link href={'https://github.com/ShehabMohsen'}>
                Shehab Mohsen
              </Link>
              <Spacer />
              <Link href={'https://github.com/dwang312'}>David Wang</Link>
            </HStack>
            <HStack>
              <Link href={'https://github.com/Kianeefondo'}>Kiane Efondo</Link>
              <Spacer /> <Spacer />
              <Link href={'https://github.com/HyeminShin'}>Hyemin Shin</Link>
            </HStack>
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
